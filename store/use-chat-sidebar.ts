import { create } from "zustand";
//What is zustand?, reread with create
export enum ChatVariant { //reread enum
    CHAT = "CHAT",
    COMMUNITY = "COMMUNITY",
}
interface ChatSidebarStore {
    collapsed: boolean;
    variant: ChatVariant;
    onExpand: () => void;
    onCollapse: () => void;
    onChangeVariant: (variant: ChatVariant) => void
};
//reread set -> set
export const useChatSidebar = create<ChatSidebarStore>((set) => ({
    collapsed: false,
    variant: ChatVariant.CHAT,
    onExpand: () => set(() => ({collapsed: false})),
    onCollapse: () => set(()=> ({collapsed: true})),
    onChangeVariant: (variant: ChatVariant) => set(() => ({variant})) // ({})
}));