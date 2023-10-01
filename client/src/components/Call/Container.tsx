


"use client"
import React, { useEffect, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { UseStateProvider } from '@/context/StateContext';
import { reducerCases } from '@/context/constants';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FcCancel } from 'react-icons/fc';
const Container = ({ data }: any) => {
  const router = useRouter()
  const [{ userInfo, socket }, dispatch] = UseStateProvider();
  const [callRejected, setCallRejected] = useState(false)
  const roomId = data.roomId;
  const appID = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
  const serverSecret = String(process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET);


  useEffect(() => {
    socket.current.on("accept-call", () => {
      toast(`Your ${data.callType.toUpperCase()} Mirror Is Accepted`, { position: "top-center", style: { backgroundColor: "green" }, duration: 3000 })
    })

    socket.current.on("voice-call-rejected", () => {
      setCallRejected(true)
      toast("Your Voice Mirror Is Rejected", { position: "top-center", icon: <FcCancel />, style: { backgroundColor: "gray" }, duration: 5000 })
    })

    socket.current.on("video-call-rejected", () => {
      setCallRejected(true)
      toast("Your Video Mirror Is Rejected", { position: "top-center", icon: <FcCancel />, style: { backgroundColor: "gray" }, duration: 5000 })
    })

    if (!callRejected) {
      socket.current.on("call-ended", () => {
        toast("Your Mirror Is Ended", { position: "top-center", icon: <FcCancel />, style: { backgroundColor: "gray" }, duration: 5000 })
      })
    }
  }, [socket.current])


  const createMeeting = (element: any) => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId.toString(), userInfo.id, userInfo.name)
    const zc: any = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      scanerio: {
        mode: ZegoUIKitPrebuilt.OneONoneCall
      },
      showPreJoinView: false,
      turnOnCameraWhenJoining: data.callType == "video",
      showMyCameraToggleButton: data.callType == "video",
      showAudioVideoSettingsButton: data.callType == "video",
      showScreenSharingButton: false,
      maxUsers: 2,
      onLeaveRoom: () => {
        if (!callRejected) {
          socket.current.emit("end-call", { id: data.id })
        }
        dispatch({ type: reducerCases.SET_END_CALL })
        location.reload()
      },

    })
  }
  return (
    <div className='h-screen w-screen bg-conversation-panel-background'>
      <div className='max-h-screen max-w-screen' ref={createMeeting} />
    </div>
  )
}

export default Container