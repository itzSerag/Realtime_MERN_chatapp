import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { MessageSkeleton } from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/timeUtlity";
import { useAuthStore } from "../store/user-auth.store";




export const ChatContainer = () => {

    const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unSubscribeFromMessages } = useChatStore()
    const { authUser } = useAuthStore()
    const messageEndRef = useRef(null);

    // remember useEffect should run without any conditions
    useEffect(() => {
        if (!selectedUser?._id) return;

        getMessages(String(selectedUser._id));
        subscribeToMessages();

        return () => {
            unSubscribeFromMessages();
        };
    }, [selectedUser?._id]);


    if (isMessagesLoading) {

        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );
    }


    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message._id}
                        className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                        ref={messageEndRef}
                    >
                        <div className=" chat-image avatar">
                            <div className="size-10 rounded-full border">
                                <img
                                    src={
                                        message.senderId === authUser._id
                                            ? authUser.imgUrl || "/avatar.png"
                                            : selectedUser.imgUrl || "/avatar.png"
                                    }
                                    alt="profile pic"
                                />
                            </div>
                        </div>
                        <div className="chat-header mb-1">
                            <time className="text-xs opacity-50 ml-1">
                                {formatMessageTime(message.createdAt)}
                            </time>
                        </div>
                        <div className="chat-bubble flex flex-col">
                            {message.image && (
                                <img
                                    src={message.image}
                                    alt="Attachment"
                                    className="sm:max-w-[200px] rounded-md mb-2"
                                />
                            )}
                            {message.text && <p>{message.text}</p>}
                        </div>
                    </div>
                ))}
            </div>


            <MessageInput />
        </div>

    );
};
