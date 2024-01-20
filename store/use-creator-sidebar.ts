import { create } from "zustand";
//What is zustand?, reread with create
interface CreatorSidebarStore {
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void;
};
//reread set -> set
export const useCreatorSidebar = create<CreatorSidebarStore>((set) => ({
    collapsed: false,
    onExpand: () => set(() => ({collapsed: false})),
    onCollapse: () => set(()=> ({collapsed: true})),
}));