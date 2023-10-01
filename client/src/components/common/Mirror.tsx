"use client"
import React, { useEffect, useState } from 'react'
import Tilt from 'react-parallax-tilt'


const Mirror = () => {

    const [backgroundColor, setBackgroundColor] = useState("")

    function generateRandomString() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const stringLength = 10000;
        let randomString = '';
        for (let i = 0; i < stringLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }
        return randomString;
    }

    function changeBackground() {
        const newBackgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        setBackgroundColor(newBackgroundColor);
    }

    useEffect(() => {
        document.body.addEventListener('mousemove', changeBackground);

        return () => {
            document.body.removeEventListener('mousemove', changeBackground);
        };
    }, []);

    useEffect(() => {


    }, [])


    return (
        <Tilt
            className={`w-[10rem] h-[13rem] rounded-3xl border-4 shadow-sm shadow-gray-200 `}
            style={{
                borderColor: backgroundColor,
                opacity: 1,
                transition: "all",
                transitionDuration: "1.5s"
            }}
            tiltEnable
            tiltMaxAngleX={30}
            tiltMaxAngleY={30}
            glareColor="white"
            glareMaxOpacity={1}
            glareEnable
            glareReverse

        >

            <div className={` bg-opacity-5 w-full h-full text-center p-3 rounded-md flex flex-row items-center justify-center`}
                style={{
                    backgroundColor: backgroundColor,
                    opacity: 0.1,
                    transition: "all",
                    transitionDuration: "1s"
                }}
            >
            </div>
        </Tilt>
    )
}

export default Mirror