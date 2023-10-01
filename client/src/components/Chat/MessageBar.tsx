"use client"
import { UseStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { ADD_MESSAGE } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BsEmojiWinkFill } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { IoMdSend } from 'react-icons/io';
import EmojiPicker, { Theme } from "emoji-picker-react";
import Loading from "../common/Loading";
import PhotoPicker from "../common/PhotoPicker";
import { AiOutlineCloseCircle } from "react-icons/ai";
import toast from "react-hot-toast";


function MessageBar() {

  const [{ userInfo, current_chat_user, socket, messages }, dispatch] = UseStateProvider()
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>()
  const [showEmojiModal, setShowEmojiModal] = useState<boolean>(false);
  const image = useRef("")
  const [grabPhoto, setGrabPhoto] = useState<boolean>(false);
  const emojiRef: any = useRef()

  const handleEmojiModalClick = (e: any) => {
    e.stopPropagation();
    setShowEmojiModal(!showEmojiModal)
  }


  const handleEmojiItemClick = (e: any) => setMessage(prev => prev += e.emoji)



  const sendMessage = async (type: "text" | "image") => {

    if (!(message.trim() == "") || type == "image") {
      try {

        setLoading(true)


        const { data } = await axios.post(ADD_MESSAGE, {
          from: userInfo?.id,
          to: current_chat_user?.id,
          message: type == "text" ? message : image.current,
          type,
        });
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: {
            ...data.message
          },
          fromSelf: true,
        })
        socket.current.emit("send-msg", {
          to: current_chat_user?.id,
          from: userInfo?.id,
          message: data.message,
          type,
        });
        type == "text" && setMessage('');

      } catch (error) {
        console.log("error")
      } finally {
        setLoading(false)
      }
    }
  }

  const uploadImage = async (imageURL: string) => {
    setLoading(true)
    const cloudName: string = String(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const apiKey: string = String(process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);

    const data = {
      file: imageURL,
      upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      api_key: apiKey,
    };

    await axios
      .post(uploadUrl, data)
      .then(async (response) => {
        image.current = response.data.public_id
        await sendMessage("image")
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  }

  const photoPickerChange = (e: any) => {
    let reader: any = new FileReader();
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      image.current = reader.result
      // console.log(reader.result)
      uploadImage(reader.result)
    }
    reader.onerror = () => {
      toast('failed to upload image... try to upload any other image')
    }
  }


  useEffect(() => {
    const EnterPress = async (e: any) => {
      if (loading) return;
      if (!loading) {
        if (e.key == "Enter") {
          console.log('first')
          await sendMessage("text");
        }
      }
    }
    document.addEventListener('keypress', e => EnterPress(e))
  }, [loading]);

  useEffect(() => {
    if (grabPhoto) {
      const data = document.getElementById('photo-picker');
      data?.click();
      document.body.onfocus = () => {
        setTimeout(() => setGrabPhoto(false), 1000)
      }
    }
  }, [grabPhoto])


  return (
    <>
      <div className="flex flex-row px-5 py-2 h-20 items-center justify-between bg-panel-header-background w-full gap-5 relative">
        <div className="flex flex-row gap-3">
          {!showEmojiModal ? <BsEmojiWinkFill
            title="emoji"
            id="emoji-open"
            className="text-xl text-panel-header-icon cursor-pointer"
            onClick={handleEmojiModalClick}
          /> : <AiOutlineCloseCircle
            className="text-xl text-panel-header-icon cursor-pointer"
            onClick={handleEmojiModalClick}
          />}
          {
            showEmojiModal && (
              <div className="absolute bottom-10 left-10 z-40s" ref={emojiRef}>
                <EmojiPicker onEmojiClick={handleEmojiItemClick} theme={Theme.DARK} />
              </div>
            )
          }
          <ImAttachment
            title="attachment"
            className="text-xl text-panel-header-icon cursor-pointer"
            onClick={() => {
              setGrabPhoto(true)
            }}
          />
        </div>
        <div className="w-full ">
          <input type="text"
            placeholder="Enter Message"
            className="w-full outline-none border-none text-start text-lg placeholder:text-secondary text-primary-strong bg-input-background px-4 py-3 rounded-md disabled:text-transparent disabled:bg-opacity-30 transition-all disabled:cursor-wait"
            value={message}
            onChange={e => setMessage(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="cursor-pointer"
          onClick={() => {
            sendMessage("text")
          }}

        >
          {
            loading ? <Loading /> : (
              <IoMdSend
                title="send"
                className="text-xl text-panel-header-icon"
              />
            )
          }
          {/* <BsFillMicFill
            title="record"
            className="text-xl text-panel-header-icon"
          /> */}
        </div>
        {
          grabPhoto && <PhotoPicker onChange={(e: any) => { photoPickerChange(e) }} />
        }
      </div>
    </>
  );
}

export default MessageBar;
