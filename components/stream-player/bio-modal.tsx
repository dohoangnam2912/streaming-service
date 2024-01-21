"use client";

import { Dialog, DialogClose, DialogContent, DialogHeader,DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { Hint } from "../hint";
import { Textarea } from "../ui/textarea";
import { useState , useTransition, useRef, ElementRef } from "react";
import { updateUser } from "@/actions/users";
import { toast } from "sonner";

interface BioModalProps {
    initialValue: string | null;
}

export const BioModal = ({initialValue}:BioModalProps) => {
    const closeRef = useRef<ElementRef<"button">>(null);
    const [isPending, startTransition] = useTransition();
    const [value, setValue] = useState(initialValue || "")

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(() => {
            updateUser({bio: value})
                .then(() => {
                    toast.success("User bio updated");
                    closeRef.current?.click();
                })
                .catch(() => toast.error("Something went wrong"))
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size="sm" className="ml-auto">
                    編集    
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        バイオを編集する
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Textarea placeholder="User bio" onChange={(e) => setValue(e.target.value)} value={value} disabled={isPending} className="resize-none"/>
                    <div className="flex justify-between">
                        <DialogClose ref={closeRef} asChild>
                            <Button type="button" variant="ghost">
                                キャンセル
                            </Button>
                        </DialogClose>
                        <Button disabled={false} type="submit" variant="primary">
                            保存
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
        
    )
}