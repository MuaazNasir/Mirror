"use client"
import { UseStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { auth } from "@/utils/FirebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function logout() {

  const [{ userInfo, socket }, dispatch] = UseStateProvider();
  const router = useRouter()

  useEffect(() => {
    socket.current.emit("signout", userInfo.id)
    dispatch({
      type: reducerCases.SET_USER_INFO,
      userInfo: undefined
    })
    dispatch({
      type: reducerCases.SET_CURRENT_CHAT_USER,
      current_chat_user: undefined,
    })
    dispatch({
      type: reducerCases.SET_SETTINGS_MENU,
      current_chat_user: false,
    })
    signOut(auth)
    router.push("/login")
  }, [])


  return <div className="bg-conversation-panel-background"></div>;
}

export default logout;
