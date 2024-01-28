import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: "/",
    plugins: [react(), viteTsconfigPaths()],
    server: {
      open: false,
      port: 3000,
    },
    define: {
      __API_SERVICE__: JSON.stringify(env.API_SERVICE),
      __MAPBOX_TOKEN__: JSON.stringify(env.MAPBOX_TOKEN),
    },
  };
});
