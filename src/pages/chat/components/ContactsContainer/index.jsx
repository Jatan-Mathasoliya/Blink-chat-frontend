import logo from '@/assets/logo.svg'
import ProfileInfo from './components/profile-info'
import NewDm from './components/new-dm'
import { useEffect } from 'react'
import apiClient from '@/lib/api-client'
import { GET_DM_CONTACTS_ROUTE } from '@/utils/constants'
import { useChatStore } from '@/store/slices/chat-slice'
import ContactList from '@/components/contact-list'

function ContactsContainer() {

  const {setDirectMessagesContact, directMessagesContacts} = useChatStore();

  useEffect(() => {
    const getContacts = async () => {
      const response = await apiClient.get(GET_DM_CONTACTS_ROUTE,{
        withCredentials:true
      });
      if (response.data.contacts) {
        setDirectMessagesContact(response.data.contacts)
      }
    };

    getContacts();
  },[])

  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className="ml-2">
        <img src={logo} alt="" />
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Message" />
          <NewDm />
        </div>
        <div className=" max-h-[38vh] overflow-y-auto scrollbar-hidden">
          <ContactList />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Groups" />
        </div>
      </div>
      <ProfileInfo />
    </div>
  )
}

const Title = ({ text }) => {

  return (
    <h6 className=' uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm'>{text}</h6>
  )
}

export default ContactsContainer