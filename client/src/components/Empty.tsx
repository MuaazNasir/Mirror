import React from "react";
import Image from "next/image";
import MirrorIcon from "./common/MirrorIcon";
import Mirror from "./common/Mirror";

function Empty() {
  return (
    <>
      <div className="w-full border-conversation-border border-2 bg-panel-header-background flex flex-col items-center justify-center">
        {/* <Image src={'/whatsapp.gif'} alt="logo" width={300} height={300}></Image>
       */}
        <Mirror />
      </div>
    </>
  );
}

export default Empty;
