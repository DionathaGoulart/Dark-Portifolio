import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    reporter: ['verbose', 'json'],
    outputFile: {
      json: './test-results.json'
    },
    // Increase memory limits and optimize for coverage
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: false,
        isolate: true
      }
    },
    maxConcurrency: 1,
    maxThreads: 1,
    minThreads: 1,
    // Force exit after tests complete
    forceRerunTriggers: ['**/package.json/**', '**/vitest.config.*/**', '**/vite.config.*/**'],
    // Memory optimization
    env: {
      NODE_ENV: 'test',
      NODE_OPTIONS: '--max-old-space-size=4096'
    },
    server: {
      deps: {
        inline: ['whatwg-url', 'webidl-conversions']
      }
    },
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
      '.eslintrc.test.js'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/vite-env.d.ts',
        'src/assets/',
        'src/styles/',
        'cypress/',
        '**/*.test.*',
        '**/*.spec.*'
      ],
      // Optimize coverage collection
      all: false,
      include: [
        'src/**/*.{ts,tsx}'
      ]
    },
    // Force process exit after tests complete
    testTimeout: 10000,
    hookTimeout: 10000,
    teardownTimeout: 10000,
    // Force exit after completion
    // bail: 1,
    // Disable watch mode completely
    watch: false
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@core': path.resolve(__dirname, './src/core'),
      '@features': path.resolve(__dirname, './src/features'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@test': path.resolve(__dirname, './src/test'),
      '@types': path.resolve(__dirname, './src/types')
    }
  }
})
