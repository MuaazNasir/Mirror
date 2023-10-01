"use client";

import '../styles/globals.css'
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import { StateProvider } from '@/context/StateContext';
import { initialState, reducer } from '@/context/StateReducers'
import Head from 'next/head'
const inter = Inter({ subsets: ['latin'] })
import { Cloudinary } from "@cloudinary/url-gen";
import { Toaster } from 'react-hot-toast';
import Release from '@/components/events/Release';
import { useEffect, useState } from 'react';
import SmallDevice from '@/components/events/SmallDevice';

export const metadata = {
    title: 'MIRROR',
    description: 'JUST A MIRROR',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {


    const launchDate = String(process.env.NEXT_PUBLIC_LAUNCH_DATE)
    const targetDate = new Date(launchDate).getTime(); // October 1, 2023
    const [timeLeft, setTimeLeft] = useState({ days: Infinity, hours: Infinity, minutes: Infinity, seconds: Infinity });
    const [smallDevice, setSmallDevice] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const userAgent = window.navigator.userAgent;

        if (/Android/i.test(userAgent)) {
            setSmallDevice(true)
        } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
            setSmallDevice(true)
        } else if (window.innerWidth < 750) {
            setSmallDevice(true)
        } else {
            setSmallDevice(false)
        }

    }, [window.innerWidth])

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


    const cld = new Cloudinary();
    cld.setConfig({ cloud: { cloudName: 'dglukfjse' } })
    if (smallDevice) {
        return (
            <html>
                <head>
                    <title>{metadata.title}</title>
                    <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
                </head>
                <body>
                    <SmallDevice />
                </body>
            </html>
        )
    }
    return (
        <html lang="en">
            <head>
                <title>{metadata.title}</title>
                <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
            </head>
            <body className={inter.className}>
                {/* un-comment it when you want to add launch event ||*/}
                {/* {
                    ((timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds) <= 0 ) ? (
                        <StateProvider initialState={initialState} reducer={reducer}>
                            <Toaster />
                            {children}
                        </StateProvider>
                    ) : (
                        <Release />
                    )
                } */}

                {/* comment it if event is on */}
                <StateProvider initialState={initialState} reducer={reducer}>
                    <Toaster />
                    {children}
                </StateProvider>
            </body>

        </html>
    )
}
