<template>
  <Playground class="flex-1" :id="gistId" />
</template>

<script setup>
import 'uno.css'
import '@unocss/reset/normalize.css'
import { createClient, provideClient } from '@urql/vue';

const client = createClient({
  url: 'https://api.strawberry.rocks/graphql',
});

provideClient(client);

const params = new URLSearchParams(window.location.search);
const gistId = params.get("gist")
</script>
