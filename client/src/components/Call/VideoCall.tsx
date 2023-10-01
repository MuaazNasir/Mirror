import { UseStateProvider } from "@/context/StateContext";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";

const Container = dynamic(() => import("./Container"), { ssr: false })


function VideoCall() {

  const [{ userInfo, videoCall, socket }, dispatch] = UseStateProvider()

  useEffect(() => {
    if (videoCall.type == "outgoing") {
      socket.current.emit("outgoing-voice-call", {
        to: videoCall.id,
        from: {
          id: userInfo.id,
          profilePicture: userInfo.image,
          name: userInfo.name
        },
        callType: videoCall.callType,
        roomId: videoCall.roomId
      })
    }
  }, [videoCall])

  return (<Container data={videoCall} />);
}

export default VideoCall;
