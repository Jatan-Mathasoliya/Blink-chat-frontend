import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      
    },
  },
  server:{
    allowedHosts:[
      'a1e4-2409-40c1-5004-8229-4c77-1b68-9cdd-b53c.ngrok-free.app',
    ]
  }
})
