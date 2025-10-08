export default async function handler(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const searchParams = url.searchParams;

  // Handle redirect from live-preview-demo to shuffle-products
  // Match the exact pattern from the support query: /live-preview-demo/:postId\?utm_source=:utm_source&utm_medium=:utm_medium&utm_campaign=:utm_campaign&utm_term=:utm_term&utm_content=:utm_content
  // Check if the URL matches the pattern with UTM parameters
  const utmPattern =
    /^\/live-preview-demo\/([^?]+)\?utm_source=([^&]+)&utm_medium=([^&]+)&utm_campaign=([^&]+)&utm_term=([^&]+)&utm_content=([^&]+)/;
  const match = url.pathname + url.search;

  const utmMatch = match.match(utmPattern);
  if (utmMatch) {
    // Extract values from regex match groups (matching the escaped pattern)
    const postId = utmMatch[1]; // First capture group: postId
    const utmSource = utmMatch[2]; // Second capture group: utm_source
    const utmMedium = utmMatch[3]; // Third capture group: utm_medium
    const utmCampaign = utmMatch[4]; // Fourth capture group: utm_campaign
    const utmTerm = utmMatch[5]; // Fifth capture group: utm_term
    const utmContent = utmMatch[6]; // Sixth capture group: utm_content

    // Build the new destination URL with UTM parameters
    const newPath = postId
      ? `/shuffle-products/${postId}`
      : "/shuffle-products";

    // Construct query string with UTM parameters exactly as in the support query
    const utmParams = [];
    if (utmSource) utmParams.push(`utm_source=${utmSource}`);
    if (utmMedium) utmParams.push(`utm_medium=${utmMedium}`);
    if (utmCampaign) utmParams.push(`utm_campaign=${utmCampaign}`);
    if (utmTerm) utmParams.push(`utm_term=${utmTerm}`);
    if (utmContent) utmParams.push(`utm_content=${utmContent}`);

    const destination =
      utmParams.length > 0 ? `${newPath}?${utmParams.join("&")}` : newPath;

    return new Response(null, {
      status: 301,
      headers: {
        Location: destination,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  // If no redirect matches, return 404
  return new Response("Not Found", { status: 404 });
}
