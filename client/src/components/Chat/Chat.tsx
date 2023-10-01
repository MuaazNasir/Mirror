import React from "react";
import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import MessageBar from "./MessageBar";

function Chat() {
  return (
    <>
      <div className="w-full h-full border-conversation-border border-2 bg-conversation-panel-background flex flex-col items-center justify-between z-10">

        <ChatHeader />
        <ChatContainer />
        <MessageBar />

      </div>
    </>
  );
}

export default Chat;
