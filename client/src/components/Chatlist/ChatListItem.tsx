"use client";
import { UseStateProvider } from "@/context/StateContext";
import React, { useRef, useState } from "react";
import Avatar from "../common/Avatar";
import { reducerCases } from "@/context/constants";
import Tilt from 'react-parallax-tilt'

function ChatLIstItem({ messageData, isContactPage = false }: any) {

  const [{ current_chat_user, contacts_menu }, dispatch] = UseStateProvider()
  const data = useRef<any>(messageData).current;
  const onChatClick = () => {
    dispatch({
      type: reducerCases.SET_CURRENT_CHAT_USER,
      current_chat_user: { ...data }
    })
    dispatch({
      type: reducerCases.SET_CONTACTS_MENU,
      contacts_menu: false
    })
    data.unSeen = 0;
  }

  return (
    <>
      <div
        className=" w-full py-2 px-3 flex items-center gap-5 hover:bg-background-default-hover cursor-pointer transition-all border-conversation-border border-b-2 relative"
        onClick={onChatClick}
      >
        <Tilt
          className="w-full h-full absolute top-0 left-0"
          glareEnable
          tiltMaxAngleX={0}
          tiltMaxAngleY={0}
          glareColor="#ffff"
          glareMaxOpacity={0.3}
          glareReverse />

        <div className="flex flex-col items-center ">
          <Avatar image={data?.profilePicture} type="lg" />
        </div>
        <div className="flex flex-col items-start">
          <div className="text-lg text-primary-strong">{data?.name}</div>
          <div className="text-md text-secondary">{data?.about || "\u00A0"}</div>
        </div>
        {
          !isContactPage && data?.unSeen >= 1 && (
            <span className="bg-green-300 py-1 px-3 rounded-full text-center text-lg text-white font-semibold absolute top-[25%] right-5 bg-opacity-70">{data.unSeen}</span>
          )
        }
      </div>
    </>
  );
}

export default ChatLIstItem;
