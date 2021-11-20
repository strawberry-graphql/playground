<template>
<div v-if="loading" class="inset-0 fixed z-99 bg-gray-900 text-gray-100 text-center p-10 opacity-90">
Loading...
</div>
</template>

<script setup>
const props = defineProps(['loading'])
</script>
