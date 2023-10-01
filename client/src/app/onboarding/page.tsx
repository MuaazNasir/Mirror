"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UseStateProvider } from "@/context/StateContext";
import Input from "@/components/common/Input";
import Avatar from "@/components/common/Avatar";
import axios from "axios";
import { ON_BOARD_ROUTE } from "@/utils/ApiRoutes.ts";
import { reducerCases } from "@/context/constants";
import { useRouter } from "next/navigation";
import MirrorIcon from "@/components/common/MirrorIcon";
import EpicBg from "@/components/common/EpicBg";
import toast from "react-hot-toast";
import Loading from "@/components/common/Loading";

function OnBoarding() {

  const router = useRouter();
  const [{ userInfo, newUser }, dispatch] = UseStateProvider();
  const [name, setName] = useState<string>(userInfo?.name || '')
  const [about, setAbout] = useState('I Love Kazaloops')
  const [image, setImage] = useState(userInfo?.profilePicture || "/default_avatar.png");
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false)
  const email = userInfo.email;



  useEffect(() => {
    if (!email) router.push('/login')
  }, [userInfo, router, newUser])

  const onBoardCreateProfile = async () => {
    if (validateUserInfo()) {
      try {
        if (name.trim().length !== 0 && about.trim().length !== 0) {
          setLoading(true)

          const { data } = await axios.post(ON_BOARD_ROUTE, { name, email, profilePicture: image, about, isPrivate });
          if (data.status) {
            dispatch({
              type: reducerCases.IS_NEW_USER,
              newUser: false
            })
            dispatch({
              type: reducerCases.SET_USER_INFO,
              userInfo: {
                id: data.data.id, name, email, profilePicture: image, about
              }
            })

            setLoading(false)

            router.push('/')
          }
        } else {
          toast("Invalid Name or About")
        }
      } catch (err) {
        setLoading(false)
        toast("Failed To Create Account!! Try Again")
        console.log(err)
      }
    }
  }

  const validateUserInfo = () => {
    if (userInfo.length < 3) return false;
    return true
  }

  return (
    <>

      <div className="flex flex-col items-center justify-center bg-panel-header-background gap-6 w-screen h-screen">
        <EpicBg />
        <div className="flex flex-row space-x-5 items-center z-[1]">
          {/* <Image src={'/whatsapp.gif'} alt="logo" width={300} height={300}></Image> */}
          <MirrorIcon />
          <span className="text-7xl text-white font-sans font-semibold uppercase tracking-widest">Mirror</span>
        </div>
        <div className="text-xl text-white font-sans tracking-wider capitalize z-[1]">create your profile</div>
        <div className="flex flex-row items-center justify-center space-x-5 z-[1]">
          <div className="flex flex-col space-y-3">
            <Input name="name" state={name} setState={setName} label />
            <Input name="about" state={about} setState={setAbout} label />
            <div className="text-white text-lg">
              Private
              <input type="checkbox" className='mx-2 bg-primary-strong p-3 rounded-full' onChange={(e) => setIsPrivate(!isPrivate)} checked={isPrivate} />
            </div>
          </div>
          <Avatar image={image} setImage={setImage} type="xl" />
        </div>
        <button className="text-white font-lg p-3 bg-gray-600 rounded-lg hover:bg-gray-700 transition-all z-0 disabled:text-white/90" onClick={onBoardCreateProfile} disabled={loading}>{loading ? <Loading /> : "Create Profile"}</button>
      </div>

    </>
  )
}

export default OnBoarding;
