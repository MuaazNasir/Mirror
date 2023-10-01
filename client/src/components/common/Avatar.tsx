"use client"
import React, { ReactHTMLElement, useEffect, useState } from "react";
import Image from "next/image";
import { AiFillCamera } from 'react-icons/ai'
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
import PhotoLibrary from "./PhotoLibrary";
import CapturePhoto from "./CapturePhoto";

type props = {
  image: string,
  setImage?: any,
  type: 'sm' | 'lg' | 'xl'
}


function Avatar({ image, setImage, type }: props) {

  const [hover, setHover] = useState<boolean>(false)
  const [isContextMenuVisible, setIsContextMenuVisible] = useState<boolean>(false)
  const [contextMenuCords, setContextMenuCords] = useState<{ x: number, y: number }>({
    x: 0,
    y: 0
  })
  const [grabPhoto, setGrabPhoto] = useState<boolean>(false);
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [takePhoto, setTakePhoto] = useState(false)


  const contextMenuOptions = [
    {
      title: 'take photo', callback: () => {
        setTakePhoto(true)
      }
    },
    {
      title: 'choose from library', callback: () => {
        setShowGallery(true)
      }
    },
    {
      title: 'upload photo', callback: () => {
        setGrabPhoto(true)
      }
    },
    {
      title: 'delete photo', callback: () => {
        setImage('/default_avatar.png')
      }
    },
  ]


  const showContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    setIsContextMenuVisible(true);
    setContextMenuCords({
      x: Number(e.pageX),
      y: Number(e.pageY)
    })
    // console.log(isContextMenuVisible, contextMenuCords)
  }

  useEffect(() => {
    if (grabPhoto) {
      const data = document.getElementById('photo-picker');
      data?.click();
      document.body.onfocus = () => {
        setTimeout(() => setGrabPhoto(false), 1000)
      }
    }
  }, [grabPhoto])



  const photoPickerChange = (e: any) => {
    let reader: any = new FileReader();
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      setImage(reader.result)
      // console.log(reader.result)
    }
    reader.onerror = () => {
      setImage('/default_avatar.png');
      alert('failed to upload image... try to upload any other image')
    }
  }

  const setDefaultImage = (e:any) => {
    e.target.onerror = null;
    e.target.src = "/default_avatar.png"
  }

  return (
    <>


      {
        type == "sm" &&
        <div className="relative w-10 h-10">
          < Image priority onError={setDefaultImage} fill alt="avatar" className="rounded-full" src={image} />
        </div>
      }
      {
        type == "lg" &&
        <div className="relative w-14 h-14">
          < Image priority onError={setDefaultImage} fill alt="avatar" className="rounded-full " src={image} />
        </div>
      }
      {
        type == "xl" &&
        <div className="relative w-60 h-60 cursor-pointer"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          id="context-menu-opener"
        >
          <div className={`absolute bg-photopicker-overlay-background z-10 flex flex-col items-center justify-center ${hover ? 'visible' : 'hidden'} top-0 left-1/2 -translate-x-1/2 w-full h-full rounded-full transition-all select-none`}
            onClick={(e) => showContextMenu(e)}
          >
            <AiFillCamera className="text-white text-3xl" />
            <span className="text-white font-mono font-semibold">Change Profile Image</span>
          </div>
          < Image priority  fill sizes="" alt="avatar" className="rounded-full " src={image} />
          {
            isContextMenuVisible && (
              <ContextMenu contextMenu={isContextMenuVisible} setContextMenu={setIsContextMenuVisible} cordinates={contextMenuCords} options={contextMenuOptions} />
            )
          }
          {
            showGallery && <PhotoLibrary setImage={setImage} setShowGallery={setShowGallery} />
          }
          {
            takePhoto && <CapturePhoto setImage={setImage} setTakePhoto={setTakePhoto} />
          }
          {
            grabPhoto && <PhotoPicker onChange={photoPickerChange} />
          }
        </div>
      }


    </>
  );
}

export default Avatar;
