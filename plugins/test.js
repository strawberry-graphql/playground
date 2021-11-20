import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(nuxtApp => {
  if (process.client) {
    process.env = {} // codemirror workaround
  }
})
