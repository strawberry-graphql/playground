<template>
  <div v-if="loading" class="fixed z-99 bg-gray-900 text-gray-100 text-center p-10 bg-opacity-80 bottom-10 right-10">
    <div>
      Setting up python environment
    </div>
    <div class="pt-3" v-for="str in loading" :key="str">
      {{ str }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['loading'])
</script>
