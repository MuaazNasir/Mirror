"use client"
import React, { useEffect, useRef, useState } from 'react'
import Tilt from 'react-parallax-tilt'

const MirrorIcon = ({ height, width }: any) => {

    const videoRef: any = useRef(null);
    const [onCamera, setOnCamera] = useState(false)

    useEffect(() => {
        let stream: any;
        const streamCamera = async () => {
            stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            });
            videoRef.current.srcObject = stream;
        }
        if (onCamera) {
            streamCamera()
            return () => {
                stream.getTracks().forEach((track: any) => track.stop())
            }
        }
    }, [onCamera])
    return (
        <>
            <Tilt
                className={`w-[${width ? width : "10rem"}] h-[${height ? height : "13rem"}] rounded-3xl border-4 border-gray-500 shadow-sm shadow-gray-200`}
                tiltEnable
                tiltMaxAngleX={20}
                tiltMaxAngleY={20}
                glareColor="#9e9090"
                glareMaxOpacity={1}
                glareEnable
                glareReverse
            >
                <div className="bg-gray-400 bg-opacity-5 w-full h-full text-center p-3 rounded-md flex flex-row items-center justify-center"
                    onClick={() => setOnCamera(!onCamera)}
                >
                    {
                        !onCamera && (
                            <div className="capitalize text-sm text-secondary">see the mirror</div>
                        )
                    }
                    {onCamera && <video id="video" className='object-cover w-full h-full scale-x-[-1]' autoPlay ref={videoRef}></video>}
                </div>
            </Tilt>
        </>
    )
}

export default MirrorIcon