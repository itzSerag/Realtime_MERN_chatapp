import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


interface IChatState {

    isUsersLoading: boolean,
    isMessagesLoading: boolean,

    selectedUser: null,
    messages: Array<unknown>;
    users: Array<unknown>

    sendMessage: (messageData: { text: string; imageBase64: any }) => Promise<void>;
    getUsers: () => void;
    getMessages: (userId: string) => void;
    setSelectedUser: (user: unknown) => void
}

export const useChatStore = create<IChatState>((set, get) => ({

    messages: [],
    users: [],

    isMessagesLoading: false,
    isUsersLoading: false,
    selectedUser: null,
    getUsers: async () => {

        set({ isUsersLoading: true })
        try {
            // return an array of users from db
            const resUsers = await axiosInstance.get('users');
            set({ users: resUsers.data })
        } catch (error) {
            toast.error('Something went wrong, Please try again later')
            console.log(error);

        } finally {
            set({ isUsersLoading: false })
        }


    },

    sendMessage: async ({ text, imageBase64 }) => {

        try {
            // get it from the curr global state im on 
            const { selectedUser, messages } = get();
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, { text, imageBase64 });
            // add this message to the messages

            set({ messages: [...messages, res.data] })

        } catch (err) {
            toast.error('Something went wrong, Please try again later')
            console.log(err);

        }
    },

    getMessages: async (userId: string) => {
        set({ isMessagesLoading: true })

        try {
            const resMessages = await axiosInstance.get(`message/messages/${userId}`)
            set({ messages: resMessages.data })
        } catch (error) {
            toast.error('Something went wrong, Please try again later')
            console.log(error);

        } finally {
            set({ isMessagesLoading: false })
        }
    },

    setSelectedUser: (user) => {
        set({ selectedUser: user })
    }



})) 