"use client"
import React, { useEffect, useState } from "react";
import Avatar from "../common/Avatar";
import { UseStateProvider } from "@/context/StateContext";
import { BsChatRightText, BsThreeDotsVertical } from 'react-icons/bs'
import { reducerCases } from "@/context/constants";

function ChatListHeader() {

  const [{ userInfo }, dispatch] = UseStateProvider();

  const handleContactClick = () => {
    dispatch({
      type: reducerCases.SET_CONTACTS_MENU,
      contacts_menu: true
    })

  }

  const handleSettingsClick = () => {
    dispatch({
      type: reducerCases.SET_SETTINGS_MENU,
      settingsMenu: true,
    })
  }


  return (
    <>
      <div className="h-16 px-4 py-3 flex flex-row items-center justify-between">
        <Avatar type="sm" image={userInfo.image} />
        <div className="flex flex-row gap-5">
          <BsChatRightText className="text-white font-extrabold text-xl cursor-pointer " onClick={handleContactClick} />
          <BsThreeDotsVertical className="text-white font-extrabold text-xl cursor-pointer " onClick={handleSettingsClick}/>
        </div>
      </div>
    </>
  );
}

export default ChatListHeader;
