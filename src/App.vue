<template>
  <Playground class="flex-1" :id="gistId" :version="version" />
</template>

<script setup>
import 'uno.css'
import '@unocss/reset/normalize.css'
import { useClient } from 'villus';

useClient({
  url: 'https://api.strawberry.rocks/graphql',
});

const params = new URLSearchParams(window.location.search);
const gistId = params.get("gist")
const version = params.get("version")
</script>
