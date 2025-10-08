import { processRedirects } from "../lib/redirects.js";

export default async function handler(request) {
  const url = new URL(request.url);
  const fullUrl = url.pathname + url.search;

  // Process redirects
  const redirect = processRedirects(fullUrl);

  if (redirect) {
    return new Response(null, {
      status: redirect.statusCode,
      headers: {
        Location: redirect.destination,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  // If no redirect matches, return 404
  return new Response("Not Found", { status: 404 });
}
