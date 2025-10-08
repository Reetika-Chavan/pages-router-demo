import { redirects } from "./config.js";

export function processRedirects(url) {
  for (const redirect of redirects) {
    // Convert the source pattern to a regex
    const sourcePattern = redirect.source
      .replace(/\\([?])/g, "$1") // Unescape escaped characters
      .replace(/:([^\\?&]+)/g, "([^\\?&]+)") // Convert :param to capture group
      .replace(/\?/g, "\\?"); // Escape question marks for regex

    const regex = new RegExp(`^${sourcePattern}$`);
    const match = url.match(regex);

    if (match) {
      // Build destination URL by replacing parameters
      let destination = redirect.destination;

      // Replace :param with captured values
      const paramNames = redirect.source.match(/:([^\\?&]+)/g);
      if (paramNames) {
        paramNames.forEach((param, index) => {
          const paramName = param.substring(1); // Remove the :
          const value = match[index + 1];
          destination = destination.replace(
            new RegExp(`:${paramName}`, "g"),
            value
          );
        });
      }

      return {
        destination,
        statusCode: redirect.statusCode,
      };
    }
  }

  return null;
}
