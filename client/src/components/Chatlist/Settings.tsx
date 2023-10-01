"use client"
import { UseStateProvider } from '@/context/StateContext';
import { reducerCases } from '@/context/constants';
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import Avatar from '../common/Avatar';
import axios from 'axios';
import { UPDATE_USER } from '@/utils/ApiRoutes';
import Loading from '../common/Loading';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


const Settings = () => {

    const router = useRouter();

    const [{ settingsMenu, userInfo }, dispatch] = UseStateProvider();
    const [profilePicture, setProfilePicture] = useState(userInfo.image)
    const [name, setName] = useState<string>(userInfo.name)
    const [about, setAbout] = useState(userInfo.about)
    const [isPrivate, setIsPrivate] = useState(userInfo.isPrivate)
    const [loading, setLoading] = useState(false);

    const handleContactClick = () => {
        dispatch({
            type: reducerCases.SET_SETTINGS_MENU,
            settingsMenu: false
        })
    }

    const updateUser = async () => {
        try {
            if (name.trim().length !== 0 && about.trim().length !== 0) {
                setLoading(true)
                const { email, id } = userInfo;
                const { data } = await axios.post(UPDATE_USER, {
                    email, id, name, about, isPrivate, profilePicture
                })
                if (data) {
                    setLoading(false)
                    dispatch({
                        type: reducerCases.SET_USER_INFO,
                        userInfo: {
                            id, name: name.trim(), email, image: profilePicture, about: about.trim(), isPrivate
                        }
                    })
                }
                dispatch({
                    type: reducerCases.SET_SETTINGS_MENU,
                    settingsMenu: false
                })
            } else {
                toast("Invalid Name or About")
            }


        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        setName(userInfo.name.trim())
        setProfilePicture(userInfo.image)
        setAbout(userInfo.about.trim())
        setIsPrivate(userInfo.isPrivate)
    }, [userInfo])

    return (
        <div className={`h-full w-full bg-conversation-panel-background flex flex-col absolute top-0 left-0 ${settingsMenu ? 'visible' : 'hidden'} transition-all py-3 px-5 gap-10 z-10`}>
            <div className="flex flex-row justify-start gap-5 w-full">
                <BiArrowBack onClick={handleContactClick} className="text-2xl text-primary-strong cursor-pointer" />
                <div className="text-2xl text-primary-strong font-bold text-center">
                    Settings
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
                <Avatar image={profilePicture} type='xl' setImage={setProfilePicture} />
                <div className="text-white text-lg">
                    Name :
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='bg-search-input-container-background py-2 px-4 text-lg font-sans text-primary-strong border-0 outline-none mx-2' />
                </div>
                <div className="text-white text-lg">
                    About :
                    <input type="text" value={about} onChange={(e) => setAbout(e.target.value)} className='bg-search-input-container-background py-2 px-4 text-lg font-sans text-primary-strong border-0 outline-none mx-2' />
                </div>
                <div className="text-white text-lg">
                    Private
                    <input type="checkbox" className='mx-2 bg-primary-strong p-3 rounded-full' onChange={(e) => setIsPrivate(!isPrivate)} checked={isPrivate} />
                </div>
                <button className='bg-gray-500 my-5 text-lg text-primary-strong py-2 px-3 rounded-lg disabled:bg-gray-400 transition-all' onClick={() => updateUser()} disabled={loading}>{loading ? <Loading /> : "Save"}</button>
                <button className='bg-red-400  my-10 text-lg text-primary-strong py-2 px-3 rounded-lg transition-all' onClick={() => {
                    router.push('/logout')
                }} disabled={loading}>Logout</button>
            </div>
        </div>
    )
}

export default Settings