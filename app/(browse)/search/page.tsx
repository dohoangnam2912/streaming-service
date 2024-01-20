import { redirect } from "next/navigation";
import { Results, ResultsSkeleton } from "./_components/results";
import { Suspense } from "react";

interface SearchPageProps {
    searchParams: {
        term?: string;
    };
};

const SearchPage = ({
    searchParams,
}:SearchPageProps) => {
  return (
    <div className="h-full p-88 max-w-screen-2xl auto">
        <Suspense fallback={<ResultsSkeleton/>}>
            <Results term={searchParams.term}/>
        </Suspense>
    </div>
  )
};

export default SearchPage;
