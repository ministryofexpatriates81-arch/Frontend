import React from 'react';
import TraingleIcon from "../../../svg/triangle";

const Message = ({ message, me }) => {
    return (
        <div className={`w-full flex mt-2 space-x-3 max-w-xs z-10 ${me ? "ml-auto justify-end " : ""}`}>
            <div className="relative">
                <div className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg shadow-sm
                    ${me ? "bg-green_3" : "dark:bg-dark_bg_2"}
                `}>
                    
                    {/* If message is deleted */}
                    {message.isDeleted ? (
                        <p className="italic text-gray-500 text-sm pb-4 pr-8">🚫 This message was deleted</p>
                    ) : (
                        <>
                            {/* Check if there is an image or video URL */}
                            {message.fileUrl && message.fileType?.includes('image') && (
                                <img src={message.fileUrl} alt="attachment" className="max-w-[200px] rounded-lg mb-2" />
                            )}
                            {message.fileUrl && message.fileType?.includes('video') && (
                                <video src={message.fileUrl} controls className="max-w-[200px] rounded-lg mb-2" />
                            )}
                            {message.fileUrl && !message.fileType?.includes('image') && !message.fileType?.includes('video') && (
                                <a href={message.fileUrl} target="_blank" rel="noreferrer" className="text-blue-500 underline block mb-2">Download File</a>
                            )}

                            {/* Message Text */}
                            {message.text && message.text !== 'Photo' && message.text !== 'Video' && (
                                <p className="float-left h-full text-sm pb-4 pr-8">
                                    {message.text}
                                </p>
                            )}
                        </>
                    )}

                    {/* Timestamp */}
                    <span className="absolute right-1.5 bottom-1.5 text-[10px] text-dark_text_5 leading-none">
                        {message.time} {message.isEdited ? "(Edited)" : ""}
                    </span>

                    {/* Triangle Indicator */}
                    {!me ? (
                        <span><TraingleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5" /></span>
                    ) : (
                        <span><TraingleIcon className="fill-green_3 rotate-[60deg] absolute top-[-5px] -right-2" /></span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Message;
