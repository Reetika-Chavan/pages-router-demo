import { processRedirects } from "../lib/redirects.js";

export default async function handler(req) {
  const url = new URL(req.url);
  const fullUrl = url.pathname + url.search;

  // Process redirects
  const redirect = processRedirects(fullUrl);

  if (redirect) {
    return Response.redirect(
      new URL(redirect.destination, url.origin),
      redirect.statusCode
    );
  }

  // If no redirect matches, proceed with the request
  return fetch(req);
}
