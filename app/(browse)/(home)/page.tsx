//route, page, layout
// (auth): clear the prefix (auth)/login/page.tsx -> /login/page.tsx
// server component: Page created inside app is automatically considered a server component
//Use "use client"


export default function Home() {
  return (
    <div className='flex flex-col gap-y-4'>
      <h1>Homepage</h1>
    </div>
  )
}
