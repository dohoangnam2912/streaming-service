import { getSearch } from "@/lib/search-service";
import { ResultCard, ResultsCardSkeleton } from "./result-card";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultsProps {
    term?: string;
}

export const Results = async ({term}: ResultsProps) => {
    const data = await getSearch(term)
    return (
        <div className="h-full p-8 max-w-screen-2xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">
              Results for term "{term}"
            </h2>
            {data.length === 0 && (
                <div className="text-muted-foreground text-sm">
                    No results found. Try searching for something else.
                </div>
            )}
            <div className="flex flex-col gap-y-4">
                {data.map((result) => (
                    <ResultCard data={result} key={result.id}/>
                ))}
            </div>
        </div>
    )
}

export const ResultsSkeleton = () => {
    return (
        <div>
            <Skeleton className="h-8 w-[290px] mb-4"/>
            <div className="flex flex-col gap-y-4">
                {[...Array(4)].map((_,i) => ( //_ skip the first one
                    <ResultsCardSkeleton key={i}/>
                ))}
            </div>
        </div>
    )
}