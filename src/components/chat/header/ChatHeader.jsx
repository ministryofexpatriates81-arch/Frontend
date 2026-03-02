import React from 'react';
import { DotsIcon, SearchLargeIcon, CallIcon, VideoCallIcon } from '../../../svg';

const ChatHeader = ({ callUser }) => {
    return (
        <div className='h-[59px] dark:bg-dark_bg_2 flex items-center p16 select-none'>
            <div className="w-full flex items-center justify-between">
                {/* left */}
                <div className="flex items-center gap-x-4">
                    <button className="btn">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                            alt="Admin"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </button>
                    <div className="flex flex-col">
                        <h1 className="dark:text-white text-md font-bold">Support Admin</h1>
                        <span className="text-xs dark:text-dark_svg_2">online</span>
                    </div>
                </div>
                {/* right */}
                <ul className="flex items-center gap-x-2.5">
                    <li onClick={() => callUser && callUser()}><button className="btn"><VideoCallIcon /></button></li>
                    <li><button className="btn"><CallIcon /></button></li>
                    <li><button className="btn"><SearchLargeIcon className="dark:fill-dark_svg_1"/></button></li>
                    <li><button className="btn"><DotsIcon className="dark:fill-dark_svg_1"/></button></li>
                </ul>
            </div>
        </div>
    );
}

export default ChatHeader;
