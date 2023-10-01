"use client"
import { UseStateProvider } from "@/context/StateContext";
import { calculateTime } from "@/utils/CalculateTime";
import React, { useEffect, useRef, useState } from "react";
import MessageStatus from "../common/MessageStatus";
import Loading from "../common/Loading";
import Image from "next/image";
import ImageMessage from "./ImageMessage";
import Mirror from "../common/Mirror";

function ChatContainer() {

  const [{ messages, current_chat_user, userInfo }] = UseStateProvider()
  const [loading, setLoading] = useState(false);
  const boxRef = useRef<any>();

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
    if (messages?.length == 0) setLoading(true)
    else setTimeout(() => setLoading(false), 2000)
  }, [messages])

  return (
    <>
      <div className="h-[80vh] relative w-full flex flex-col gap-1 px-3 py-4 overflow-y-scroll bg-chat-background bg-fixed bg-opacity-5 " ref={boxRef}>

        {loading ? (
          <div className="absolute top-[25%] left-1/2 -translate-x-1/2 scale-[0.5] ">
            <Mirror />
          </div>
        ) : (
          messages?.map((message: any, index: number) => (
            <div className={`${message.senderId === userInfo?.id ? "justify-end" : "justify-start"} flex`} key={index}>
              <div className={`text-sm text-white flex items-end max-w-[45%] px-2 py-[5px] ${message.senderId === userInfo?.id ? "bg-incoming-background rounded-bl-none" : "bg-outgoing-background rounded-br-none"} rounded-md flex-col`}>
                {message.type === "text" && (
                  <span className="break-all text-left w-full">
                    {message.message}
                  </span>
                )}
                {
                  message.type == "image" && (
                    <ImageMessage public_id={message.message} />
                  )
                }
                <div className="flex flex-end gap-1">
                  <span className="text-bibble-meta min-w-fit text-[11px]">
                    {calculateTime(message.createdAt)}
                  </span>
                  {message.senderId === userInfo?.id && (
                    <span>
                      <MessageStatus messageStatus={message.messageStatus} />
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))
        )}
      </div>



    </>
  );
}

export default ChatContainer;
