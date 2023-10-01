"use client"
import React, { useEffect, useRef, useState } from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import { auth } from "@/utils/FirebaseConfig";
import { UseStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { CHECK_USER_ROUTE, GET_MESSAGE, SERVER_URL } from "@/utils/ApiRoutes";
import axios from "axios";
import { useRouter } from "next/navigation";
import Chat from "./Chat/Chat";
import { io } from "socket.io-client";
import VoiceCall from "./Call/VoiceCall";
import VideoCall from "./Call/VideoCall";
import IncomingVideoCall from "./common/IncomingVideoCall";
import IncomingVoiceCall from "./common/IncomingVoiceCall";
import toast from "react-hot-toast";
import { FcCancel } from "react-icons/fc";


function Main() {
  const router = useRouter();
  const [{ userInfo, current_chat_user, messages, voiceCall, videoCall, incomingVoiceCall, incomingVideoCall }, dispatch] = UseStateProvider();
  const [socketEvent, setSocketEvent] = useState(false);
  const [redirectLogin, setRedirectLogin] = useState(false);
  const socket = useRef<any>();

  useEffect(() => {
    if (redirectLogin) router.push('/login')
  }, [redirectLogin])

  useEffect(() => {

    auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser || !userInfo) setRedirectLogin(true);
      if (currentUser?.email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email: currentUser?.email })
        if (!data.status) {
          router.push('/login')
        } else {
          const { id, name, email, profilePicture, about, isPrivate } = data.data

          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id, name, email, image: profilePicture, about, isPrivate
            }
          })
        }
      }
    })
  }, [])


  useEffect(() => {
    socket.current = io(SERVER_URL);
    socket.current.emit("add-user", userInfo.id)
    dispatch({ type: reducerCases.SET_SOCKET, socket })
  }, [userInfo]);


  useEffect(() => {
    const getMessages = async () => {
      const { data: { messages } } = await axios.get(`${GET_MESSAGE}/${userInfo?.id}/${current_chat_user?.id}`);
      dispatch({
        type: reducerCases.SET_MESSAGES,
        messages: messages,
      })
    }
    if (current_chat_user?.id) getMessages()
  }, [current_chat_user])

  useEffect(() => {
    if (socket.current) {
      socket.current.on("receive-msg", (data: any) => {

        dispatch({ type: reducerCases.ADD_MESSAGE, newMessage: { ...data.message } })
      })
      // setSocketEvent(true)

      socket.current.on("incoming-voice-call", (data: any) => {

        if (!voiceCall) {

          dispatch({
            type: reducerCases.SET_INCOMING_VOICE_CALL,
            incomingVoiceCall: {
              ...data.from,
              roomId: data.roomId,
              callType: data.callType,
            }
          })
        }
      })


      socket.current.on("incoming-video-call", (data: any) => {
        if (!videoCall) {
          dispatch({
            type: reducerCases.SET_INCOMING_VIDEO_CALL,
            incomingVoiceCall: {
              ...data.from,
              roomId: data.roomId,
              callType: data.callType,
            }
          })
        }
      })


      socket.current.on("online-users", (onlineUsers: any) => {
        dispatch({
          type: reducerCases.SET_ONLINE_USERS,
          onlineUsers
        })
      })

    }
  }, [socket.current])

  useEffect(() => {
    window.onunload = () => {
      socket.current.emit("signout", userInfo.id)
    }
  })



  return (
    <>

      {
        voiceCall && (
          <div className="w-screen h-screen max-h-screen">
            <VoiceCall />
          </div>
        )
      }
      {
        videoCall && (
          <div className="w-screen h-screen max-h-screen">
            <VideoCall />
          </div>
        )
      }
      {
        incomingVideoCall && (
          <IncomingVideoCall />
        )
      }
      {
        incomingVoiceCall && (
          <IncomingVoiceCall />
        )
      }
      {(!videoCall && !voiceCall) && <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
        <ChatList />
        {
          !current_chat_user ? (
            <Empty />
          ) : (
            < Chat />
          )
        }
      </div>}
    </>
  );
}

export default Main;
