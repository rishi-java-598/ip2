import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // ✅ Add this section:
//   build: {
//     cssCodeSplit: false, // 🔥 disables CSS splitting — all CSS in one file
//   },
})
