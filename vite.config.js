import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'
import path from 'path'

import { DATA } from './src/data'

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://www.vdtm.cl',
      dynamicRoutes: DATA.blog.map(post => `/blog/${post.id}`)
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
