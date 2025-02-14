import { create } from "zustand";

export const useContact = create((set, get)=>({
    contact:undefined,

    selectContact:(input)=> set((state)=>({
        contact:[input]
    })),

    clearContact:()=> set((state)=>({
        contact:undefined,
    }))
}))