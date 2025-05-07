import path from "path";
import { defineConfig, loadEnv } from 'vite';
import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => ({
    plugins: [react(), viteTsconfigPaths()],
    resolve: {
       alias: {
          "@": path.resolve(__dirname, "src"),
       },
    },
    build: {
       sourcemap: mode === "development" ? true : "hidden",
       minify: mode !== "development",
    },
    server: {
       port: 3000,
       open: true,
       proxy: {
          "/v1": {
             target: "http://localhost:8080", // Backend server
             changeOrigin: true,
             secure: false,
          },
       },
    }
 }));