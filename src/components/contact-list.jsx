import React from 'react'
import { useChatStore } from '@/store/slices/chat-slice';
import { useContact } from '@/store/slices/chat-slice';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { getColor } from '@/lib/utils';

function ContactList({ contacts, isChannel = false }) {

    const { contact, selectContact } = useContact()
    const { directMessagesContacts, selectedChatType, setSelectedChatType, selectedChatMessages, setSelectedChatMessages } = useChatStore();

    const handleClick = (contact) => {
        if (isChannel) setSelectedChatType('channel');
        else setSelectedChatType('contact');
        selectContact(contact);
        if (selectContact && selectContact._id !== contact._id) {
            setSelectedChatMessages([])
        }

    }

    console.log("contactlist :", directMessagesContacts)

    return (
        <div className='mt-5'>
            {directMessagesContacts.map((contact) => (
                <div key={contact._id} className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${selectContact & (selectContact._id === contact._id) ? 'bg-[#8417ff] hover:bg-[#8417ff]' : ' hover:bg-[#f1f1f111]'}`} onClick={() => handleClick(contact)}>
                    <div className=" flex gap-5 items-center justify-start text-neutral-300">
                        {
                            !isChannel && (
                                <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                                    {contact.image ? (
                                        <AvatarImage
                                            src={contact.image}
                                            alt="Profile"
                                            className="object-cover w-full h-full bg-black rounded-full"
                                        />
                                    ) : (
                                        <div
                                            className={`uppercase h-10 w-10 text-xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                                                contact.color
                                            )}`}
                                        >
                                            {contact.firstName
                                                ? contact.firstName.split('').shift()
                                                : contact.email.split('').shift()}
                                        </div>
                                    )}
                                </Avatar>
                            )
                        }
                        {isChannel && <div className=' bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full'>#</div>}
                        {
                            isChannel ? <span>{contact.name}</span> : <span>{`${contact.firstName} ${contact.lastName}`}</span>
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ContactList;