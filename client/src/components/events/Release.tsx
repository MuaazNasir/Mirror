"use client"
import React, { useEffect, useState } from "react";
import EpicBg from "@/components/common/EpicBg";
import MirrorIcon from "@/components/common/MirrorIcon";


function Release() {

    const targetDate = new Date('2023-10-01T00:00:00').getTime(); // October 1, 2023
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    function calculateTimeLeft() {
        const currentDate = new Date().getTime();
        const timeDifference = targetDate - currentDate;

        if (timeDifference <= 0) {
            // Target date has passed
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    }




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
                        comming soon after
                    </div>
                    <div className="text-3xl uppercase text-primary-strong font-bold tracking-widest">
                        <span className="text-cyan-300">{timeLeft.days}</span> days : <span className="text-cyan-300">{timeLeft.hours}</span> hours : <span className="text-cyan-300">{timeLeft.minutes}</span> minutes : <span className="text-cyan-300">{timeLeft.seconds}</span> seconds
                    </div>
                </div>
            </div>

        </>

    )
}


export default Release;
