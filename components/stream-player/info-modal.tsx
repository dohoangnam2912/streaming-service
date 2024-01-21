"use client";

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState, useTransition ,useRef, ElementRef } from "react";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { Hint } from "../hint";
import { Trash } from "lucide-react";
import Image from "next/image";

interface InfoModalProps {
    initialName: string;
    initialThumbnailUrl: string | null;
}

export const InfoModal = ({initialName,initialThumbnailUrl}: InfoModalProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [name, setName] = useState(initialName);
    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
    const closeRef = useRef<ElementRef<"button">>(null);
    const onRemove = () => {
        startTransition(() => {
            updateStream({thumbnailUrl: null})
                .then(()=> {
                    toast.success("Thumbnail removed")
                    setThumbnailUrl("");
                    closeRef?.current?.click();
                })
                .catch(() => toast.error("Something went wrong"))
        })
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(name);
        e.preventDefault();
        startTransition(() => {
            updateStream({name:name})//object of name
                .then(() => {
                    toast.success("Stream updated")
                    closeRef?.current?.click();
                }
                    )
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
                        ストリーム情報を編集する
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-14">
                    <div className="space-y-2">
                        <Label>
                            名前
                        </Label>
                        <Input disabled={isPending} placeholder="Stream name" onChange={onChange} value={name}/>
                    </div>
                    <div className="space-y-2">
                        <Label>
                        サムネイル
                        </Label>
                        {thumbnailUrl ? (
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                                <div className="absolute top-2 right-2 z-[10]">
                                    <Hint label="Remove thumbnail" asChild side="left" >
                                        <Button type="button" disabled={isPending} onClick={onRemove} className="h-auto w-auto p-1.5">
                                            <Trash className="h-4 w-4"/>
                                        </Button>
                                    </Hint>
                                </div>
                                <Image alt="Thumbnail" src={thumbnailUrl} fill className="object-cover"/>
                            </div>
                        ): (
                        <div className="rounded-xl border outline-dashed outline-muted">
                            <UploadDropzone endpoint="thumbnailUploader" appearance={{
                                label: {
                                    color: "#ffffff"
                                },
                                allowedContent: {
                                    color: "#ffffff"
                                }
                            }}
                            onClientUploadComplete={(res) => {
                                setThumbnailUrl(res?.[0]?.url);
                                router.refresh();
                                // closeRef?.current?.click();
                            }}
                            />
                        </div>
                        )}
                    </div>
                    <div className="flex justify-between">
                        <DialogClose ref={closeRef} asChild>
                            <Button type="button" variant="ghost">
                                キャンセル
                            </Button>
                        </DialogClose>
                        <Button disabled={isPending} type="submit" variant="primary">
                            保存
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
