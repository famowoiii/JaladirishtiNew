import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Konfigurasi variabel lingkungan untuk produksi
        // Ini akan menggantikan nilai variabel lingkungan saat aplikasi dibangun.
        globals: {
          "import.meta.env.VITE_REACT_APP_SUPABASE_KEY": JSON.stringify(
            process.env.VITE_REACT_APP_SUPABASE_KEY
          ),
        },
      },
    },
  },
});
