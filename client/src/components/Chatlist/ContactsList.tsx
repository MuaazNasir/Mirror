"use client"
import { UseStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import React, { useEffect, useState } from "react";
import { BiArrowBack } from 'react-icons/bi'
import SearchBar from "./SearchBar";
import axios from "axios";
import { GET_CONTACTS } from "@/utils/ApiRoutes";
import { validate } from "email-validator";
import ChatListItem from "./ChatListItem";
import { AiOutlineReload } from "react-icons/ai";
function ContactsList() {

  const [{ contacts_menu, userInfo }, dispatch] = UseStateProvider()
  const [searchInput, setSearchInput] = useState<string>('');
  const [manualData, setManualData] = useState<any>({ data: null, error: true });
  const [autoData, setAutoData] = useState<any>({ data: null, error: true });


  const handleContactClick = () => {
    dispatch({
      type: reducerCases.SET_CONTACTS_MENU,
      contacts_menu: false
    })
  }

  const getManualContacts = async () => {
    const correactEmail = validate(searchInput)
    if (correactEmail) {
      if (searchInput === userInfo.email) setSearchInput('');
      const { data } = await axios.post(GET_CONTACTS, { type: 'manual', email: searchInput });
      if (data.status) setManualData({ data: data.data, error: false })
      else setManualData({ data: null, error: true })
    } else {
      setManualData({ data: null, error: true })
    }
    setSearchInput('')
  }


  const getAutoData = async () => {
    const { data } = await axios.post(GET_CONTACTS, { type: 'auto', userId: userInfo.id });
    if (data.status) setAutoData({ data: data.data, error: false })
    else setAutoData({ data: null, error: true })
  }

  useEffect(() => {
    if (userInfo.id) {
      getAutoData()
    }

  }, [userInfo])




  return (
    <>
      <div className={`h-full w-full bg-conversation-panel-background flex flex-col absolute top-0 left-0 ${contacts_menu ? 'visible' : 'hidden'} transition-all py-3 px-5 gap-5 z-10`}>
        <BiArrowBack onClick={handleContactClick} className="text-2xl text-primary-strong cursor-pointer" />
        <SearchBar type="addContact" value={searchInput} setValue={setSearchInput} btnClick={getManualContacts} />

        {
          !manualData.error && <ChatListItem data={manualData.data} isContactPage={true} />
        }

        <div className="flex flex-col justify-center gap-1">
          <div className="text-primary-strong font-bold tracking-wider text-center">Discover More Friends</div>
          <div className="text-center flex flex-col items-center justify-center">
            <AiOutlineReload className="text-2xl text-center text-primary-strong cursor-pointer" onClick={() => getAutoData()} />
          </div>
          {
            !autoData.error && autoData.data.map((e: any, i: any) => {
              if (e.id != userInfo.id) {
                return (
                  <ChatListItem messageData={e} isContactPage={true} key={i} />
                )
              }
            })
          }
        </div>
      </div>
    </>
  );
}

export default ContactsList;
