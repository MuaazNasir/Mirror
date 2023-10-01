"use client"
import { UseStateProvider } from "@/context/StateContext";
import { GET_LIST_CONTACTS } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import Tilt from "react-parallax-tilt";

type Props = {
  searchQuery: string;
}

function List({ searchQuery }: Props) {

  const [{ userInfo, current_chat_user, messages }] = UseStateProvider();
  const [listContacts, setListContacts] = useState([]);
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        if (userInfo?.id) {
          const { data } = await axios.get(`${GET_LIST_CONTACTS}/${userInfo?.id}`);
          setListContacts(data.list)
        }
      } catch (err) {
        console.log(err)
      }
    };
    getData();
  }, [userInfo, current_chat_user, messages]);

  useEffect(() => {
    setSearchResult(listContacts.filter((c: any) => c.name.toLowerCase().includes(searchQuery.toLowerCase())))
  }, [searchQuery])


  return (
    <div className="bg-search-input-container-background max-h-full flex-auto overflow-auto custom-scroll-bar text-center relative">
      {
        listContacts && !!!listContacts.length && (
          <>
            <Tilt className="w-full h-full flex flex-col items-center justify-center rounded-md"
              glareEnable
              tiltMaxAngleX={0}
              tiltMaxAngleY={0}
              glareColor="#ffff"
              glareMaxOpacity={0.2}
              glareReverse
            >
              <div className="capitalize text-primary-strong font-bold tracking-wide text-lg m-3 ">you have no mirror gateway</div>
              <div className="text-panel-header-icon font-semibold tracking-wide text-md m-3 capitalize">start chatting by adding a contact</div>
            </Tilt>
          </>
        )
      }
      {
        !searchQuery.length && listContacts && listContacts.map((elem, i) => {
          return (
            <>
              <ChatListItem messageData={elem} key={i} />
            </>
          )
        })
      }
      {
        !!searchQuery.length && searchResult.map((elem, i) => (
          <>
            <ChatListItem messageData={elem} key={i} />
          </>
        ))
      }
    </div>
  );
}

export default List;
