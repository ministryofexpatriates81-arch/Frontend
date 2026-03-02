import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import { db } from '../../../firebase';
import { ref, onValue } from "firebase/database";

const ChatMessages = () => {
    const endRef = useRef();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const uid = localStorage.getItem('wa_client_uid');
        if (!uid) return;

        const msgsRef = ref(db, 'chats/' + uid + '/messages');
        onValue(msgsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const msgList = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setMessages(msgList);
            } else {
                setMessages([]);
            }
        });
    }, []);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="mb-[60px] bg-[url('/public/bg.jpg')] bg-cover bg-no-repeat">
            <div className='scrollbar overflow_scrollbar overflow-auto py-2 px-[6%]'>
                
                {/* End-to-end encryption text */}
                <div className="text-center my-4">
                    <span className="bg-[#ffeecd] text-[#54656f] text-xs px-3 py-1 rounded-lg shadow-sm">
                        Messages and calls are end-to-end encrypted.
                    </span>
                </div>

                {messages.map((msg) => (
                    <Message
                        key={msg.id}
                        message={msg}
                        me={msg.sender === 'client'} 
                    />
                ))}
                
                <div className='mb-2' ref={endRef}></div>
            </div>
        </div>
    );
}

export default ChatMessages;
