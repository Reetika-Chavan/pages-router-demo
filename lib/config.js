// Configuration for redirects and rewrites
export const redirects = [
  {
    source:
      "/live-preview-demo/:postId\\?utm_source=:utm_source&utm_medium=:utm_medium&utm_campaign=:utm_campaign&utm_term=:utm_term&utm_content=:utm_content",
    destination:
      "/shuffle-products/:postId?utm_source=:utm_source&utm_medium=:utm_medium&utm_campaign=:utm_campaign&utm_term=:utm_term&utm_content=:utm_content",
    statusCode: 301,
  },
];

export const rewrites = [
  // Add any rewrites here if needed
];
