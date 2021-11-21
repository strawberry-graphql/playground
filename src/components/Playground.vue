<template>
  <div class="flex flex-col flex-wrap items-stretch border-0 border-b-1 border-red-700">
    <Container
      title="Strawberry Schema">
      <CodeMirror
        mode="python"
        v-model:value="state.code"
        :indent="4"
      />
    </Container>
    <Container
      title="GraphQL Query">
      <CodeMirror
        v-model:value="state.query"
      />
    </Container>
    <Container
      title="Query Variables"
      :visible="false">
      <CodeMirror
        mode="json"
        v-model:value="state.variables"
      />
    </Container>
    <div class="sm:flex-break border-0 sm:border-r-1 border-red-700" />
    <Container
      title="Query Results">
      <CodeMirror
        mode="json"
        :value="state.results"
        :readonly="true"
      />
    </Container>
    <Container title="GraphQL Schema">
      <CodeMirror
        mode="json"
        :value="state.schema"
        :readonly="true"
      />
    </Container>
  </div>
</template>

<script setup>
const props = defineProps(['state'])
const state = reactive(props.state)
</script>
