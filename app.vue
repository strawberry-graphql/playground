<template>
  <Title>Strawberry GraphQL Playground</Title>
  <div class="absolute inset-0 flex flex-col font-sans">
    <Header />
    <Playground class="flex-1" :state="state" />
    <Loading :loading="state.loading" />
  </div>
</template>

<script setup>
import 'uno.css'
import '@unocss/reset/normalize.css'
import { useState } from '/utils/state.js'
import { useStrawberry } from '/utils/strawberry.js'

const state = useState()
const { results, errors, loading, schema } = useStrawberry(toRefs(state))
state.results = results
state.errors = errors
state.loading = loading
state.schema = schema
</script>
