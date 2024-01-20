import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";
import { db } from "@/lib/db";



const receiver = new WebhookReceiver( //reread the new
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
)

//POST to database function
export async function POST(req: Request) {//this fetch api interface represents a resources request
    const body = await req.text(); //request for the body
    const headerPayload = headers(); 
    const authorization = headerPayload.get("Authorization"); //Check if the header or the header payload is authorized

    if (!authorization) {
        return new Response("No authorization header", {status: 400});
    }

    const event = receiver.receive(body, authorization); //receiver : WebhookReceiver

    if (event.event === "ingress_started") {
        await db.stream.update({
            where: {
                ingressId: event.ingressInfo?.ingressId,
            },
            data:{
                isLive: true,
            }
        })
    }

    if (event.event === "ingress_ended") {
        await db.stream.update({
            where: {
                ingressId: event.ingressInfo?.ingressId,
            },
            data:{
                isLive: false,
            }
        })
    }


}

