import React, { useEffect, useState } from "react";
import Avatar from "../common/Avatar";
import { UseStateProvider } from "@/context/StateContext";
import { IoMdCall } from 'react-icons/io';
import { FaVideo } from 'react-icons/fa';
import { BiSearchAlt2 } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs'
import { reducerCases } from "@/context/constants";

function ChatHeader() {

  const [{ current_chat_user, onlineUsers }, dispatch] = UseStateProvider()
  const { profilePicture, name, id } = current_chat_user;
  const [isOnline, setIsOnline] = useState(false)

  const handleVoiceCall = () => {
    dispatch({
      type: reducerCases.SET_VOICE_CALL,
      voiceCall: {
        ...current_chat_user,
        type: "outgoing",
        callType: "voice",
        roomId: Date.now(),
      }
    })
  }

  const handleVideoCall = () => {
    dispatch({
      type: reducerCases.SET_VIDEO_CALL,
      videoCall: {
        ...current_chat_user,
        type: "outgoing",
        callType: "video",
        roomId: Date.now(),
      }
    })
  }

  useEffect(() => {
    if(onlineUsers?.onlineUsers.includes(id)){
      setIsOnline(true)
    }else{
      setIsOnline(false)
    }
  }, [onlineUsers, current_chat_user])





  return (
    <>
      <div className="w-full h-16 py-2 px-5 flex flex-row items-center justify-between bg-panel-header-background">
        <div className="flex flex-row gap-6 items-center">
          <Avatar type="sm" image={profilePicture} />
          <div className="flex flex-col items-start justify-start">
            <div className="text-lg font-bold  tracking-widest text-primary-strong">{name}</div>
            <div className={` ${isOnline ? "text-green-400 font-bold" : "text-secondary"}`}>
              {
                isOnline ? "online" : "offline"
              }
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-5">
          <IoMdCall className="text-xl text-panel-header-icon cursor-pointer" onClick={() => handleVoiceCall()} />
          <FaVideo className="text-xl text-panel-header-icon cursor-pointer" onClick={() => handleVideoCall()} />
          {/* <BiSearchAlt2 className="text-xl text-panel-header-icon"/> */}
          {/* <BsThreeDotsVertical className="text-xl text-panel-header-icon"/> */}
        </div>
      </div>
    </>
  );
}

export default ChatHeader;
