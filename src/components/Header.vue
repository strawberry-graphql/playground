<template>
  <div class="flex flex-row items-center p-2">
    <StrawberryIcon class="h-10 pr-2" />
    <div class="flex-1 text-lg">
      Strawberry GraphQL Playground
    </div>
    <div class="flex flex-col sm:flex-row items-end sm:items-center space-x-5">
      <div>
        <select class="w-30" v-model="props.state.version" @mouseover="fetchVersions" @blur="fetchVersion">
          <option v-for="version in (versions || [props.state.version])" :key="version">{{ version }}</option>
        </select>
      </div>
      <a class="text-red-700 hover:opacity-70 no-underline cursor-pointer" @click.prevent="share"
        title="Share playground url">
        <i-mdi-share-variant class="text-lg" />
      </a>
      <a class="text-red-700 hover:opacity-70 no-underline" href="https://github.com/la4de/strawberry-playground"
        target="_blank" title="Go to github repository">
        <i-mdi-github class="text-xl" />
      </a>
      <a class="text-red-700 hover:opacity-70 no-underline" href="https://strawberry.rocks/" target="_blank"
        title="Go to Strawberry documentation">
        <StrawberryIcon class="h-6 pr-.5" />
      </a>
    </div>
  </div>
  <share-modal :loading="isFetching" :open="modalOpen" :url="shareUrl" />
</template>

<script setup>
import { useMutation } from 'villus';

import { useStrawberryVersions } from '../utils/strawberry.js'

const props = defineProps(['state'])
const { versions, fetchVersions } = useStrawberryVersions()

const modalOpen = ref(false)
let shareUrl = ref("loading...")

const { data, execute, isFetching } = useMutation(`
  mutation CreateGist($input: CreateGistInput!) {
    createGist(input: $input) {
      __typename
      id
    }
  }
`);

const share = async () => {
  if (isFetching.value) {
    return
  }

console.log('should be open now')
  modalOpen.value = true

  await createGist()
}

const createGist = () => {
  const variables = {
    input: {
      query: props.state.query,
      schema: props.state.code,
      variables: JSON.parse(props.state.variables),
      requirements: props.state.requirements,
    },
  };

  return execute(variables).then(result => {
    if (result.error) {
      console.error('Oh no!', result.error);
    } else {
      const params = new URLSearchParams(window.location.search);
      params.set('gist', result.data.createGist.id);

      history.pushState(null, null, `?${params.toString()}`);

      shareUrl.value = window.location.href
    }
  });
}
</script>
