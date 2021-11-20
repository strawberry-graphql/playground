<template>
  <div class="flex flex-col" :class="{ 'flex-1': visible }">
    <div
      class="flex cursor-pointer select-none p-1 pl-9 bg-gray-100"
      @click="toggle"
    >
      <div class="flex-1">
        {{ props.title }}
      </div>
      <div class="opacity-20 text-sm">
        ({{ visible ? 'visible' : 'hidden' }})
      </div>
    </div>
    <div class="flex-1 flex" v-show="visible">
      <slot/>
    </div>
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
