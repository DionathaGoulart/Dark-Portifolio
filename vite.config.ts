import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { imagetools } from 'vite-imagetools'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    react(),

    // Plugin para transformações dinâmicas de imagens
    imagetools({
      // Configurações padrão para diferentes formatos
      defaultDirectives: (url) => {
        if (url.searchParams.has('responsive')) {
          return new URLSearchParams(
            'w=320;640;1024;1280;1920&format=webp;jpg&as=srcset'
          )
        }
        if (url.searchParams.has('thumbnail')) {
          return new URLSearchParams('w=150&h=150&fit=cover&format=webp')
        }
        if (url.searchParams.has('hero')) {
          return new URLSearchParams(
            'w=1920&h=1080&fit=cover&format=webp;jpg&quality=80'
          )
        }
        return new URLSearchParams()
      }
    }),

    // Plugin para compressão automática de imagens
    viteImagemin({
      // Configurações para diferentes formatos
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 80,
        progressive: true
      },
      pngquant: {
        quality: [0.65, 0.8],
        speed: 4
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      },
      // Configuração para WebP
      webp: {
        quality: 80
      }
    })
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@core': path.resolve(__dirname, './src/core'),
      '@features': path.resolve(__dirname, './src/features'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@test': path.resolve(__dirname, './src/test'),
      '@types': path.resolve(__dirname, './src/types')
    }
  },

  // Configurações de build para otimização adicional
  build: {
    rollupOptions: {
      output: {
        // Separar assets por tipo
        assetFileNames: (assetInfo) => {
          // Usar 'names' ao invés de 'name' (deprecated)
          const fileName = assetInfo.names?.[0] || 'unknown'
          const info = fileName.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        }
      }
    }
  }
})
