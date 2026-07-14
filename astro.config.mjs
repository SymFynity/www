// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://symfynity.com",
  // Static output. Nothing on this site needs a server.
  output: "static",
  build: {
    // Emit /about/index.html rather than /about.html, so the custom-domain
    // URLs have no extensions and no trailing-slash redirect on Pages.
    format: "directory",
  },
});
