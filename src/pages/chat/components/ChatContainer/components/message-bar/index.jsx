import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react"
import { GrAttachment } from 'react-icons/gr'
import { IoSend } from "react-icons/io5"
import { RiEmojiStickerLine } from "react-icons/ri"
import { createAuthSlice } from "@/store/slices/auth-slice";
import { useSocket } from "@/context/SocketContext";
import { useContact } from "@/store/slices/chat-slice";
import { useAppStore } from "@/store";
import apiClient from "@/lib/api-client";
import { UPLOAD_FILE_ROUTE } from "@/utils/constants";

function MessageBar() {

  const emojiRef = useRef();
  const fileInputRef = useRef();
  const [emojiPickerOpen, setemojiPickerOpen] = useState(false)
  const [message, setmessage] = useState("")
  const { selectedChatType } = createAuthSlice();
  const { contact } = useContact();
  const socket = useSocket();
  const { userInfo } = useAppStore();


  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setemojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef])

  const handleAddEmoij = (emoji) => {
    setmessage((msg) => msg + emoji.emoji)
  }

  const handleSendMessage = async () => {
    console.log("Socket instance in MessageBar:", socket);

    if (!socket || typeof socket.emit !== "function") {
      console.error("Socket is not initialized properly!");
      return;
    }

    const send_it = {
      sender: userInfo.id,
      content: message,
      recipient: contact._id,
      messageType: "text",
      fileUrl: undefined,
    };

    socket.emit("sendMessage", send_it, (ack) => {
      console.log("✅ Server acknowledged message:", ack);
    });
    setmessage("");
  };

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const handleAttachmentChange = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {

        const formData = new FormData();
        // formData.append("This is data")
        formData.append("file", file);

        console.log("formdata : ", formData);

        const response = await apiClient.post(UPLOAD_FILE_ROUTE, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

        if (response.status === 200 && response.data) {
          const { filePath } = response.data;
          socket.emit("sendMessage", {
            sender: userInfo.id,
            content: undefined,
            recipient: contact._id,
            messageType: "file",
            fileUrl: filePath,
          }, (ack) => {
            console.log("✅ Server acknowledged message:", ack);
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-[8vh] bg-[#1c1d25] flex items-center justify-center px-8 mb-6 gap-6 ">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center justify-between gap-5 pr-5">
        <input
          type="text"
          className="flex p-4 bg-transparent rounded-md focus:border-none focus:outline-none w-full"
          placeholder="Enter Message"
          value={message}
          onChange={e => setmessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevents unintended behavior (e.g., form submission)
              handleSendMessage();
            }
          }}
        />

        <div className=" flex gap-5 items-center justify-center">
          <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-500 transition-all" onClick={handleAttachmentClick}>
            <GrAttachment className="text-xl" />
          </button>
          <input type="file" className=" hidden" ref={fileInputRef} onChange={handleAttachmentChange} name="file" id="file" />
          <div className=" relative">
            <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-500 transition-all" onClick={() => setemojiPickerOpen(true)}>
              <RiEmojiStickerLine className="text-xl" />
            </button>
            <div className=" absolute bottom-16 right-16" ref={emojiRef}>
              <EmojiPicker
                theme="dark"
                open={emojiPickerOpen}
                onEmojiClick={handleAddEmoij}
                autoFocusSearch={false}
              />
            </div>
          </div>
        </div>
      </div>
      <button className="bg-[#8417ff] flex items-center justify-center p-4 rounded-md focus:border-none focus:outline-none focus:text-white hover:bg-[#741bda] focus:bg-[#741bda] duration-500 transition-all" onClick={handleSendMessage}>
        <IoSend className="text-xl" />
      </button>
    </div>
  )
}

export default MessageBar