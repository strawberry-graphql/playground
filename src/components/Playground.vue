<template>
  <div class="flex flex-col">
    <div class="flex-1 flex flex-col sm:flex-row border-0 border-y-1 border-red-700">
      <div class="flex-1 flex flex-col border-0 border-r-1 border-red-700">
        <Container
          class="border-0 border-b-1 border-red-700"
          title="Strawberry Schema">
          <CodeMirror
            mode="python"
            v-model:value="state.code"
            :indent="4"
          />
        </Container>
        <Container
          class="border-0 border-b-1 border-red-700"
          title="GraphQL Query">
          <CodeMirror
            v-model:value="state.query"
          />
        </Container>
        <Container
          class="border-0 border-b-1 sm:border-0 border-red-700"
          title="Query Variables"
          :visible="false">
          <CodeMirror
            mode="json"
            v-model:value="state.variables"
          />
        </Container>
      </div>
      <div class="flex-1 flex flex-col">
        <Container
          class="border-0 border-b-1 border-red-700"
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
    </div>
    <ErrorContainer v-show="state.errors">
      {{ state.errors }}
    </ErrorContainer>
  </div>
</template>

<script setup>
const props = defineProps(['state'])
const state = reactive(props.state)
</script>
