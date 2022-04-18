<template>
  <div v-if="!loading" class="absolute inset-0 flex flex-col font-sans">
    <Header :state="state" />
    <div class="flex flex-col flex-wrap flex-1 items-stretch border-0 border-b-1 border-red-700">
      <Container title="Strawberry Schema">
        <CodeMirror mode="python" v-model:value="data.code" :indent="4" />
      </Container>
      <Container title="GraphQL Query">
        <CodeMirror v-model:value="data.query" />
      </Container>
      <Container title="Query Variables" :visible="false">
        <CodeMirror mode="json" v-model:value="data.variables" />
      </Container>

      <div class="sm:w-1/2 h-0" />
      <div class="sm:flex-break border-0 sm:border-r-1 border-red-700" />

      <Container title="Query Results">
        <CodeMirror mode="json" :value="results" :readonly="true" />
      </Container>
      <Container title="GraphQL Schema">
        <CodeMirror mode="json" :value="schema" :readonly="true" />
      </Container>

      <div class="sm:w-1/2 h-0" />
    </div>

    <ErrorContainer class="max-h-5em sm:max-h-10em" :state="state" />

    <Loading :loading="pyodideLoading" />
  </div>
</template>

<script setup>
import { useQuery } from '@urql/vue';
import { useStrawberry } from '../utils/strawberry.js'
import sampleRequirements from '../samples/requirements.txt?raw'
import sampleCode from '../samples/schema.py?raw'
import sampleQuery from '../samples/query.gql?raw'
import sampleVariables from '../samples/variables.json?raw'

const { id } = defineProps(['id'])

console.log(sampleRequirements)

const state = {}

const result = useQuery({
  query: `
    query GetGist($id: ID!) {
      gist(id: $id) {
        id
        query
        code: schema
        variables
        requirements
      }
    }
  `,
  variables: { id },
  pause: !id,
});

const loading = id ? result.fetching : false
const data = ref({
  id: null,
  query: sampleQuery,
  code: sampleCode,
  variables: JSON.parse(sampleVariables),
  requirements: sampleRequirements,
})

watch(result.data, (d) => {
  data.value = d.gist
})

const { init, schema, results, loading: pyodideLoading } = useStrawberry(data)

// TODO: listen to version update
init()
</script>