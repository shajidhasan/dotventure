import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    build: {
        minify: 'terser'
    },
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'apple-touch-icon-180x180.png'],
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,ogg,ttf}'],
                sourcemap: true
            },
            manifest: {
                name: "Dot's Adventure",
                short_name: "Dot's Adventure",
                description: "Dot is on an adventure. But how far can it go?",
                icons: [
                    {
                        "src": "pwa-64x64.png",
                        "sizes": "64x64",
                        "type": "image/png"
                    },
                    {
                        "src": "pwa-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png"
                    },
                    {
                        "src": "pwa-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png"
                    },
                    {
                        "src": "maskable-icon-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png",
                        "purpose": "maskable"
                    }
                ],
                theme_color: '#cceaf4',
                background_color: '#cceaf4',
                display: "standalone",
                scope: '/',
                start_url: "/",
                orientation: 'portrait'
            }
        })
    ]
})
