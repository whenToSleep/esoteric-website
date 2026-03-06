import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except:
    // - /api (API routes)
    // - /admin (Payload admin)
    // - /_next (Next.js internals)
    // - /favicon.ico, /sitemap.xml, /robots.txt (static files)
    // - files with extensions (e.g. .js, .css, .png)
    "/((?!api|admin|_next|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\..*).*)",
  ],
};
