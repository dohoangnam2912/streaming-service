import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

//api/webhooks(.*): every file in webhooks is public
export default authMiddleware({
    publicRoutes: [
      "/",
      "/api/webhooks(.*)",
      "/api/uploadthing",
      "/:username",
      "/search" //allow user to search
    ],
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};