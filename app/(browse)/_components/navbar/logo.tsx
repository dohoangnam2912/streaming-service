import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300","400","500","600","700","800"],
});

export const Logo = () => {
    return (
        <Link href="/">
            <div className="flex items-center gap-x-4 hover:opacity-75 transition ">
                <div className="bg-white rounded-full p-1 gap-x-1 mr-12 shrink-0 lg:mr-0 lg:shrink">
                    <Image src="/kanji-character-svgrepo-com.svg" alt="Gaminghub" height="32" width="32"/>
                </div>
                <div 
                    className={cn
                    (font.className, "hidden lg:block")}>
                    <p className="text-lg font-semibold">
                        日本語ストリーム
                    </p>
                    <p className="text-xs text-muted-foreground">
                        日本語を勉強しましょう！
                    </p>
                </div>
            </div>
        </Link>
    )
}