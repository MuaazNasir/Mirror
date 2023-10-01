import React from "react";
import { BsCheck, BsCheckAll } from "react-icons/bs";

function MessageStatus({ messageStatus }: any) {
  return (
    <>
      {
        messageStatus == "sent" && <BsCheck className="text-lg text-icon-lighter"/> || 
        messageStatus == "delivered" && <BsCheckAll className="text-lg text-icon-lighter"/> ||
        messageStatus == "read" && <BsCheckAll className="text-lg text-icon-green"/>
      }
    </>
  )
}

export default MessageStatus;
