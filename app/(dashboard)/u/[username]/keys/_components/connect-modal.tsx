"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { IngressInput } from "livekit-server-sdk";
import { useState, useTransition , useRef, ElementRef } from "react"; //reread useRef and ElementRef
import { createIngress } from "@/actions/ingress";
import { toast } from "sonner";

// Add IngressInput
// Stringify
const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);
//Reread 
type IngressType = typeof RTMP | typeof WHIP;
//Dont get messed up with the typescript
export const ConnectModal = () => {
    const closeRef = useRef<ElementRef<"button">>(null);
    const [isPending, startTransition] = useTransition();
    const [ingressType, setIngressType] = useState<IngressType>(RTMP); //Give it the ingress type so it can accept both rtmp and whip
    
    const onSubmit = () => {
        startTransition(() => {
            createIngress(parseInt(ingressType)) //Reread parseInt
                .then(() => {
                    toast.success("Ingress created")
                    closeRef?.current?.click();
                })
                .catch(() => toast.error("Something went wrong"));
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="primary">
                    接続を生成する
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                     接続を生成する
                    </DialogTitle>
                </DialogHeader>
                <Select
                    disabled={isPending}
                    value={ingressType}
                    onValueChange={(value) => setIngressType(value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Ingress Type"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={RTMP}>RTMP</SelectItem>
                        <SelectItem value={WHIP}>WHIP</SelectItem>
                    </SelectContent>
                </Select>
                <Alert>
                    <AlertTriangle className="h-4 w-4"/>
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>This action will reset all active streams using the current connection</AlertDescription>
                </Alert>
                <div className="flex justify-between">
                    <DialogClose ref={closeRef} asChild>
                        <Button variant="ghost">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        disabled={isPending}
                        onClick={onSubmit}
                        variant="primary"   
                    >
                        Generate
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}