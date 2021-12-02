<template>
  <div class="flex flex-row items-center p-2">
    <StrawberryIcon class="h-10 pr-2" />
    <div class="flex-1 text-lg">
      Strawberry GraphQL Playground
    </div>
    <div class="flex flex-col sm:flex-row items-end sm:items-center space-x-5">
      <a
        class="text-red-700 hover:opacity-70 no-underline cursor-pointer"
        @click.prevent="shareUrl"
        title="Share playground url"
      >
        <i-mdi-share-variant class="text-lg"/>
      </a>
      <a
        class="text-red-700 hover:opacity-70 no-underline"
        href="https://github.com/la4de/strawberry-playground"
        target="_blank"
        title="Go to github repository"
      >
        <i-mdi-github class="text-xl"/>
      </a>
      <a
        class="text-red-700 hover:opacity-70 no-underline"
        href="https://strawberry.rocks/"
        target="_blank"
        title="Go to Strawberry documentation"
      >
        <StrawberryIcon class="h-6 pr-.5" />
      </a>
    </div>
  </div>
</template>

<script setup>
import { useClipboard } from '../utils/clipboard.js'
const { writeText } = useClipboard()

const shareUrl = () => {
  writeText(window.location.href)
  alert('Playground url copied to clipboard')
}
</script>
