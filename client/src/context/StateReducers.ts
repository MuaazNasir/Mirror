import { reducerCases } from "./constants";

type initialStateType = any

export const initialState: initialStateType = {
    userInfo: {},
    isNewUser: null,
    contacts_menu: false,
    current_chat_user: null,
    messages: [],
    socket: undefined,
    videoCall: undefined,
    voiceCall: undefined,
    incomingVoiceCall: undefined,
    incomingVideoCall: undefined,
    endCall: undefined,
    settingsMenu: false,
}

export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case reducerCases.SET_USER_INFO:
            return {
                ...state,
                userInfo: action.userInfo
            }
        case reducerCases.IS_NEW_USER:
            return {
                ...state,
                newUser: action.newUser
            }
        case reducerCases.SET_CONTACTS_MENU:
            return {
                ...state,
                contacts_menu: action.contacts_menu
            }
        case reducerCases.SET_CURRENT_CHAT_USER:
            return {
                ...state,
                current_chat_user: action.current_chat_user
            }
        case reducerCases.SET_MESSAGES:
            return {
                ...state,
                messages: action.messages
            }
        case reducerCases.SET_SOCKET:
            return {
                ...state,
                socket: action.socket,
            }
        case reducerCases.ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.newMessage],
            }
        case reducerCases.SET_VOICE_CALL:
            return {
                ...state,
                voiceCall: action.voiceCall,
            }
        case reducerCases.SET_VIDEO_CALL:
            return {
                ...state,
                videoCall: action.videoCall,
            }
        case reducerCases.SET_INCOMING_VIDEO_CALL:
            return {
                ...state,
                incomingVideoCall: action.incomingVideoCall,
            }
        case reducerCases.SET_INCOMING_VOICE_CALL:
            return {
                ...state,
                incomingVoiceCall: action.incomingVoiceCall,
            }
        case reducerCases.SET_END_CALL:
            return {
                ...state,
                videoCall: undefined,
                voiceCall: undefined,
                incomingVoiceCall: undefined,
                incomingVideoCall: undefined,
            }
        case reducerCases.SET_SETTINGS_MENU:
            return {
                ...state,
                settingsMenu: action.settingsMenu
            }
        case reducerCases.SET_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: action.onlineUsers
            }



        default:
            return state;
    }
}