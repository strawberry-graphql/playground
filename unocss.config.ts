import { defineConfig } from 'unocss'

export default defineConfig({
  rules: [
    ['flex-x', { flex: '1 1 0' }],
    ['flex-break', { 'flex-basis': '100%' }],
  ],
})
