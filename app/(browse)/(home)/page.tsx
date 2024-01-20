//route, page, layout
// (auth): clear the prefix (auth)/login/page.tsx -> /login/page.tsx
// server component: Page created inside app is automatically considered a server component
//Use "use client"

import { Suspense } from "react";
import {Results, ResultsSkeleton} from "./_components/results";


export default function Home() {
  return (
    <div className='h-full p-8 max-w-screen-2xl mx-auto'>
      <Suspense fallback={<ResultsSkeleton/>}>
          <Results/>
      </Suspense>
    </div>
  )
}
