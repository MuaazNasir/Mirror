"use client"
import React, { useEffect, useState } from "react";
import EpicBg from "@/components/common/EpicBg";
import MirrorIcon from "@/components/common/MirrorIcon";


function Release() {




    return (

        <>

            <div className="flex flex-col items-center justify-center bg-panel-header-background gap-10 w-screen h-screen max-w-screen max-h-screen ">
                <EpicBg />


                <div className="flex flex-row space-x-5 items-center z-[1]">

                    <MirrorIcon />
                    <span className="text-7xl text-white font-sans font-semibold uppercase tracking-widest">Mirror</span>
                </div>
                <div className="flex flex-col gap-10 items-center justify-center">
                    <div className="text-4xl text-secondary font-extrabold font-sans tracking-widest capitalize">
                        comming soon on your device
                    </div>
                </div>
            </div>

        </>

    )
}


export default Release;
