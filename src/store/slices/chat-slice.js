import { create } from "zustand";

export const useContact = create((set, get) => ({
    contact: undefined,

    selectContact: (input) => set({ contact: input }),

    clearContact: () => set({
        contact: undefined,
    })
}))

export const useChatStore = create((set, get) => ({
    selectedChatType: undefined,
    selectedChatMessages: [],

    setSelectedChatType: (selectedChatType) => set({ selectedChatType }),

    setSelectedChatMessages: (selectedChatMessages) =>
        set({ selectedChatMessages }),

    // Function to add a new message
    addMessage: (message) => {
        const selectedChatMessages = get().selectedChatMessages;
        const selectedChatType = get().selectedChatType;

        set({
            selectedChatMessages: [
                ...selectedChatMessages,
                {
                    ...message,
                    recipient:
                        selectedChatType === "channel"
                            ? message.recipient
                            : message.recipient?._id,
                    sender:
                        selectedChatType === "channel"
                            ? message.sender
                            : message.sender?._id,
                },
            ],
        });
    },

    // Function to clear the chat
    closeChat: () => {
        set({
            selectedChatType: undefined,
            selectedChatMessages: [],
        });
    },
}));
