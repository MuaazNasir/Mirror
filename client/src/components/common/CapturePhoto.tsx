"use client"
import React, { useEffect, useRef } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {TbCapture} from 'react-icons/tb'
function CapturePhoto({ setImage, setTakePhoto }: any) {

  const videoRef : any = useRef(null);

  useEffect(() => {
    let stream:any;
    const streamCamera = async () => {
      stream = await navigator.mediaDevices.getUserMedia( {
        video : true,
        audio : false
      } );
      videoRef.current.srcObject = stream;
    }
    streamCamera()
    return () => {
      stream.getTracks().forEach((track:any)=>track.stop())
    }
  },[])

  const capturePicture = (event: any) => {
    const canvas = document.createElement('canvas');
    canvas.getContext('2d')?.drawImage(videoRef.current,0,0,300,150);
    setImage(canvas.toDataURL('image/jpeg'));
    setTakePhoto(false)
  }

  return (
    <>
      <div className="fixed top-[10%] left-1/2 -translate-x-1/2 w-[70vw] h-[80%] flex flex-col items-center justify-around z-30 bg-gray-900 cursor-default p-5">

        <div className="w-full "
          onClick={() => setTakePhoto(false)}
        >
          <AiOutlineCloseCircle className="text-5xl text-start text-white rounded-full hover:text-gray-200 transition-all"

          />
        </div>

        <div className="">
          <video id="video" width={400} autoPlay ref={videoRef}></video>
        </div>
        <div className="">
          <button onClick={capturePicture} className="bg-gray-800 p-3 rounded-full items-center">
          <TbCapture className="text-5xl text-white "/>
          </button>
        </div>

      </div>
    </>
  )
}

export default CapturePhoto;
