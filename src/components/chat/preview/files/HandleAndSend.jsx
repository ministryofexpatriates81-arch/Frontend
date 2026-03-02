import { useDispatch, useSelector } from "react-redux";
import Add from "./Add";
import { CloseIcon, SendIcon } from "../../../../svg";
import { uploadFiles } from "../../../../utils/upload";
import { useState } from "react";
import { clearFiles, removeFileFromFiles } from "../../../../features/chatSlice";
import ClipLoader from "react-spinners/ClipLoader";
import VideoThumbnail from "react-video-thumbnail";
import { db } from '../../../../firebase';
import { ref, push, set, update, increment } from "firebase/database";

function HandleAndSend({ activeIndex, setActiveIndex, message }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { files } = useSelector((state) => state.chat);

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Upload files to Cloudinary
    const uploaded_files = await uploadFiles(files);
    
    const uid = localStorage.getItem('wa_client_uid');
    let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Send each file as a separate message to Firebase
    uploaded_files.forEach((fileData) => {
        let fileTypeStr = fileData.type === 'IMAGE' ? 'image/jpeg' : (fileData.type === 'VIDEO' ? 'video/mp4' : 'document');
        let msgText = fileData.type === 'IMAGE' ? 'Photo' : (fileData.type === 'VIDEO' ? 'Video' : 'Document');

        let tempMsgRef = push(ref(db, 'chats/' + uid + '/messages'));
        set(tempMsgRef, { 
            text: msgText, 
            sender: 'client', 
            time: time, 
            timestamp: Date.now(), 
            isEdited: false, 
            isDeleted: false,
            fileUrl: fileData.file.secure_url,
            fileType: fileTypeStr
        });
    });

    // Update Admin unread count
    update(ref(db, 'chats/' + uid + '/userInfo'), { 
        lastTime: time, 
        unreadCountAdmin: increment(uploaded_files.length) 
    });

    setLoading(false);
    dispatch(clearFiles());
  };

  const handleRemoveFile = (index) => {
    dispatch(removeFileFromFiles(index));
  };

  return (
    <div className="w-[97%] flex items-center justify-between mt-2 border-t dark:border-dark_border_2">
      <span></span>
      <div className="flex items-center gap-x-2">
        {files.map((file, i) => (
          <div key={i} className={`fileThumbnail relative w-14 h-14 border dark:border-white mt-2 rounded-md overflow-hidden cursor-pointer ${activeIndex === i ? "border-[3px] !border-green_1" : ""}`} onClick={() => setActiveIndex(i)}>
            {file.type === "IMAGE" ? (
              <img src={file.fileData} alt="" className="w-full h-full object-cover" />
            ) : file.type === "VIDEO" ? (
              <VideoThumbnail videoUrl={file.fileData} />
            ) : (
              <img src={require(`../../../../images/file/${file.type}.png`)} alt="" className="w-8 h-10 mt-1.5 ml-2.5" />
            )}
            <div className="removeFileIcon hidden" onClick={() => handleRemoveFile(i)}>
              <CloseIcon className="dark:fill-white absolute right-0 top-0 w-4 h-4" />
            </div>
          </div>
        ))}
        <Add />
      </div>
      <div className="bg-green_1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer" onClick={sendMessageHandler}>
        {loading ? <ClipLoader color="#E9EDEF" size={25} /> : <SendIcon className="fill-white" />}
      </div>
    </div>
  );
}

export default HandleAndSend;
