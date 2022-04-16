<template>
  <div
    class="flex cursor-pointer select-none p-1 pl-9 bg-gray-100 border-0 border-t-1 border-red-700"
    @click="toggle"
  >
    <div class="flex-1">
      {{ props.title }}
    </div>
    <div class="opacity-20 text-sm">
      ({{ visible ? 'visible' : 'hidden' }})
    </div>
  </div>
  <div class="flex-x sm:w-1/2 overflow-y-scroll" v-if="visible">
    <slot/>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  visible: { type: Boolean, default: true },
})

const visible = ref(props.visible)
const toggle = () => {
  visible.value = !visible.value
}
</script>
