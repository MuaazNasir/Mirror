"use client"
import React, { useEffect, useState } from "react";
import Avatar from "../common/Avatar";
import { UseStateProvider } from "@/context/StateContext";
import { auth } from "@/utils/FirebaseConfig";
import firebase from "firebase/app";
import axios from "axios";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { useRouter } from "next/navigation";
import { reducerCases } from "@/context/constants";
import ChatListHeader from "./ChatListHeader";
import SearchBar from "./SearchBar";
import List from "./List";
import ContactsList from "./ContactsList";
import Settings from "./Settings";

function ChatList() {


  const [{ userInfo, settingsMenu }, dispatch] = UseStateProvider();
  const [searchQuery, setSearchQuery] = useState("");



  return (
    <>
      <div className="max-h-screen bg-panel-header-background flex flex-col relative">
        <ChatListHeader />
        {
          settingsMenu && (
            <Settings />
          )
        }
        <ContactsList />
        <SearchBar type="recentChat" value={searchQuery} setValue={setSearchQuery} />
        <List searchQuery={searchQuery} />
      </div>
    </>
  );
}

export default ChatList;
