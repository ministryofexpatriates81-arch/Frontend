import React, { useRef, useState } from 'react';
import { SendIcon } from '../../../svg';
import Input from './Input';
import EmojiPickerApp from './EmojiPicker';
import { Attachments } from './attachments';
import { db } from '../../../firebase';
import { ref, push, set, update, increment } from "firebase/database";

function ChatActions() {
    const [showPicker, setShowPicker] = useState(false);
    const [showAttachments, setShowAttachments] = useState(false);
    const textRef = useRef();
    const [message, setMessage] = useState("");

    const SendMessageHandler = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const uid = localStorage.getItem('wa_client_uid');
        if (!uid) return;

        let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Push message to Firebase
        let tempMsgRef = push(ref(db, 'chats/' + uid + '/messages'));
        set(tempMsgRef, { 
            text: message.trim(), 
            sender: 'client', 
            time: time, 
            timestamp: Date.now(), 
            isEdited: false, 
            isDeleted: false 
        });

        // Update Admin unread count
        update(ref(db, 'chats/' + uid + '/userInfo'), { 
            lastTime: time, 
            unreadCountAdmin: increment(1) 
        });

        setMessage("");
    }

    return (
        <form className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none"
            onSubmit={SendMessageHandler}
        >
            <div className='w-full flex items-center gap-x-2'>
                <ul className="flex gap-x-2">
                    <EmojiPickerApp textRef={textRef} message={message} setMessage={setMessage}
                        showPicker={showPicker} setShowPicker={setShowPicker} setShowAttachments={setShowAttachments} />
                    <Attachments showAttachments={showAttachments} setShowAttachments={setShowAttachments} setShowPicker={setShowPicker} />
                </ul>
                <Input message={message} setMessage={setMessage} textRef={textRef} />
                <button type="submit" className='btn'>
                    <SendIcon className="dark:fill-dark_svg_1" />
                </button>
            </div>
        </form>
    );
}

export default ChatActions;
