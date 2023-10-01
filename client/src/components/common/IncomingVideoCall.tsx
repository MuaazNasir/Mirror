import { UseStateProvider } from "@/context/StateContext";
import React from "react";
import Image from "next/image";
import { LuPhoneCall } from 'react-icons/lu';
import { HiPhoneMissedCall } from 'react-icons/hi'
import { reducerCases } from "@/context/constants";

function IncomingVideoCall() {

  const [{ incomingVideoCall, socket, VideoCall }, dispatch] = UseStateProvider()
  const acceptCall = () => {
    dispatch({
      type: reducerCases.SET_VIDEO_CALL,
      videoCall: {
        ...incomingVideoCall,
        type: "incoming"
      }
    })
    socket.current.emit("accept-incoming-call", { id: incomingVideoCall.id });
    dispatch({
      type: reducerCases.SET_INCOMING_VIDEO_CALL,
      incomingVideoCall: undefined
    })

  };
  const declineCall = () => {
    socket.current.emit("reject-video-call", { from: incomingVideoCall.id })
    dispatch({
      type: reducerCases.SET_END_CALL,
    })
  };


  return (
    <div className="fixed bottom-5 right-5 bg-conversation-panel-background border-2 border-green-400 py-3 px-5 m-2 rounded-xl flex flex-col gap-4 z-50">
      <div className="flex flex-row items-center justify-center gap-5">
        <Image src={incomingVideoCall.profilePicture} alt="avatar" width={100} height={100} className="rounded-full border-2 border-gray-400" />
        <div className="flex flex-col items-center justify-start gap-2">
          <div className="text-gray-200 font-bold font-sans text-lg">{incomingVideoCall.name}</div>
          <div className="text-secondary font-semibold text-md capitalize">incoming {incomingVideoCall.callType} call</div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-5">
        <button className="p-3 rounded-xl text-white bg-green-400 " onClick={() => acceptCall()}>
          <LuPhoneCall className="text-white text-3xl inline mx-2" />
          Accept
        </button>
        <button className="p-3 rounded-xl text-white bg-red-400" onClick={() => declineCall()}>
          <HiPhoneMissedCall className="text-white text-3xl inline mx-2" />
          Decline
        </button>
      </div>
    </div>
  );
}

export default IncomingVideoCall;
