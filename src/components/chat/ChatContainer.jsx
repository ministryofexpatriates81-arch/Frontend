import React, { useEffect, useState } from 'react';
import ChatHeader from './header/ChatHeader';
import ChatMessages from './messages/chatMessages';
import ChatActions from './actions/ChatActions';
import FilesPreview from './preview/files/FilesPreview';
import { db } from '../../firebase';
import { ref, set } from "firebase/database";
import { useSelector } from 'react-redux';

const ChatContainer = ({ callUser }) => {
    const { files } = useSelector((state) => state.chat);
    const [uid, setUid] = useState(null);

    useEffect(() => {
        // Generate Client UID and Save to Firebase
        let localUid = localStorage.getItem('wa_client_uid');
        let localName = localStorage.getItem('wa_client_name');
        let localAvatar = localStorage.getItem('wa_client_avatar');

        if (!localUid) {
            localUid = Math.floor(10000 + Math.random() * 90000).toString();
            localAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${localUid}`;
            localName = `User-${localUid}`;
            
            localStorage.setItem('wa_client_uid', localUid);
            localStorage.setItem('wa_client_avatar', localAvatar);
            localStorage.setItem('wa_client_name', localName);

            // Save to Firebase
            set(ref(db, 'chats/' + localUid + '/userInfo'), { 
                uid: localUid, 
                nickname: localName, 
                avatar: localAvatar, 
                lastTime: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), 
                unreadCountAdmin: 0, 
                isBlocked: false 
            });
        }
        setUid(localUid);
    }, []);

    if (!uid) return null;

    return (
        <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden">
            <div>
                <ChatHeader callUser={callUser} />
                {files && files.length > 0 ? (
                    <FilesPreview />
                ) : (
                    <>
                        <ChatMessages />
                        <ChatActions />
                    </>
                )}
            </div>
        </div>
    );
}

export default ChatContainer;
