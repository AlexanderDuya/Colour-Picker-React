import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Colour-Picker-React/", // <-- set this if deploying to GitHub Pages repo subpath
  plugins: [react()],
  // remove the entire build.rollupOptions.input part
});
