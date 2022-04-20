<template>
  <div class="bg-red-200 font-mono whitespace-pre p-2 max-h-1/3 overflow-scroll" v-show="errors">
    {{ errors }}
  </div>
</template>

<script setup>
const { errors } = defineProps(['errors'])
</script>
