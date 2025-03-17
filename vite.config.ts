import { defineConfig } from "vite";

const BASE_URL = (process as never) && process.env["BASE_URL"];

// https://vitejs.dev/config/
export default defineConfig({
  base: BASE_URL || "/",
  plugins: [],
});
