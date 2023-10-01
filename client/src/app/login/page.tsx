"use client"
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { FcGoogle } from 'react-icons/fc';
import { signInWithGoogle } from "@/utils/FirebaseConfig";
import axios from "axios";
import { CHECK_USER_ROUTE } from '@/utils/ApiRoutes.ts';
import { useRouter } from "next/navigation";
import { UseStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import EpicBg from "@/components/common/EpicBg";
import Tilt from 'react-parallax-tilt'
import MirrorIcon from "@/components/common/MirrorIcon";


function Login() {

  const router = useRouter();
  const [{ userInfo, newUser }, dispatch] = UseStateProvider();

  useEffect(() => {
    if (userInfo?.id && !newUser) router.push('/');
  }, [newUser, userInfo]);


  const handleLogin = async () => {
    const { user } = await signInWithGoogle().then(data => data);
    const name = user?.displayName;
    const email = user?.email;
    const profilePicture = user?.photoURL;

    try {
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });
        if (!data.status) {
          dispatch({
            type: reducerCases.IS_NEW_USER,
            newUser: true
          })
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              name, email, profilePicture, about: 'I Love Kazaloops'
            }
          })
          router.push('/onboarding')
        } else {
          dispatch({
            type: reducerCases.IS_NEW_USER,
            newUser: false
          })
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              name, email, profilePicture, about: userInfo?.about
            }
          })

          router.push('/')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }



  return (

    <>

      <div className="flex flex-col items-center justify-center bg-panel-header-background gap-10 w-screen h-screen max-w-screen max-h-screen ">
        <EpicBg />


        <div className="flex flex-row space-x-5 items-center z-[1]">
          {/* <Image src={'/whatsapp.gif'} alt="logo" width={300} height={300} className="rounded-full"></Image> */}
          <MirrorIcon />
          <span className="text-7xl text-white font-sans font-semibold uppercase tracking-widest">Mirror</span>
        </div>
        <div className="z-[1]">
          <Tilt
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            tiltEnable
          >

            <button className="flex flex-row space-x-3 p-3 items-center justify-center bg-search-input-container-background" onClick={handleLogin}>
              <FcGoogle />
              <span className="text-white font-lg capitalize">Create A Mirror / Enter Mirror</span>
            </button>
          </Tilt>
        </div>
      </div>

    </>

  )
}

export default Login;
