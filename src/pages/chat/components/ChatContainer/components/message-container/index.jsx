import React, { useEffect, useRef } from "react"
import { useChatStore } from "@/store/slices/chat-slice"
import { useContact } from "@/store/slices/chat-slice"
import { useAppStore } from "@/store";
import moment from "moment";

function MessageContainer() {
  const { selectedChatMessages, selectedChatType } = useChatStore();
  const { contact } = useContact();
  const { userInfo } = useAppStore();
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [selectedChatMessages])

  const renderMessages = () => {
    let lastDate = null;
    console.log("chat :" ,selectedChatType)
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format('YYYY-MM-DD')
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={index}>
          {showDate && (
            <div className=" text-center text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === 'contact' && renderDMMessages(message)}
        </div>
      )
    })
  }

  const renderDMMessages = (message) => {

console.log(message)

    return <div className={`${message.sender === contact._id ? 'text-left' : 'text-right'
      }`}>
      {message.messageType === 'text' && (
        <div className={`${message.sender !== contact._id ? "bg-[#8417ff]/15 text-[#8417ff]/90 border-black"
          : "border-gray-600 bg-[#2a2b33]/75 text-white/80 "
          } inline-block p-4 rounded-md my-1 max-w-[50%] break-words`}>
          {message.content}
        </div>
      )}
      <div className=" text-xs text-gray-600">
        {moment(message.timestamp).format('LT')}
      </div>
    </div>

  }



  return (
    <div className="flex-1 overflow-y-hidden scrollbar-hidden p-4 px-8 md:w-[]65vw lg:w-[70vw xl:w-[80vw] w-full">
      {renderMessages()}
      <div className="" ref={scrollRef}></div>
    </div>
  )
}

export default MessageContainer