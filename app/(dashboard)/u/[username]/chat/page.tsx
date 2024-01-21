import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import { ToggleCard } from "./_components/toggle-card";

const ChatPage = async () => {
    const self = await getSelf();
    const stream = await getStreamByUserId(self.id);

    if (!stream) {
        throw new Error("Stream not found");
    }
    //Key is the reserved keyword in react
    return(
        <div className="p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">
                    チャット設定
                </h1>
            </div>
            <div className="space-y-4">
                <ToggleCard
                    field="isChatEnabled"
                    label="チャットを有効にする"
                    value={stream.isChatEnabled}
                />
                <ToggleCard
                    field="isChatDelayed"
                    label="チャットを遅延させる"
                    value={stream.isChatDelayed}
                />
                <ToggleCard
                    field="isChatFollowersOnly"
                    label="フォローする必要"
                    value={stream.isChatFollowersOnly}
                />
            </div>
        </div>
    )
}

export default ChatPage;