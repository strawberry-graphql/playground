<template>
    <TransitionRoot as="template" :show="props.open">
        <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto font-sans" @close="props.open = false">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                    enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <TransitionChild as="template" enter="ease-out duration-300"
                    enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                    leave-from="opacity-100 translate-y-0 sm:scale-100"
                    leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">


                    <div
                        class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                        <div v-if="props.loading" class="text-center absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center"> Creating gist... </div>
                        <div v-bind:class="{ 'opacity-0': props.loading }">
                            <div class="mt-3 text-center sm:mt-5">
                                <DialogTitle as="h3" class="text-lg leading-6 text-gray-900">Share this playground
                                </DialogTitle>

                                <div class="mt-1 flex rounded-md shadow-sm max-w-100 mx-auto">

                                    <input type="text" disabled
                                        class="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md sm:text-sm border-none pl-4"
                                        :value="url" />
                                    <button type="button" @click="copyUrl"
                                        class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                                        <ClipboardCopyIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        <span v-if="copied">Copied</span>
                                        <span v-else>Copy</span>
                                    </button>
                                </div>
                            </div>

                            <div class="mt-5 flex max-w-48 mx-auto">
                                <button type="button"
                                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600   text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                                    @click="props.open = false">Close</button>
                            </div>
                        </div>
                    </div>

                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { ref, unref } from 'vue'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ClipboardCopyIcon } from '@heroicons/vue/outline'
import { useClipboard } from '../utils/clipboard.js'

const props = defineProps(['loading', 'open', 'url'])
const { writeText } = useClipboard()

const copied = ref(false);

const copyUrl = () => {
    console.log(props.url)

    writeText(props.url)

    copied.value = true;
}
</script>