import { ref } from 'vue'

export const useClipboard = () => {
  const writeText = (text) => {
    navigator.clipboard.writeText(text)
  }
  return {
    writeText
  }
}
