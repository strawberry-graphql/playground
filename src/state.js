import { zip, unzip } from './utils/zip.js'
import { watch } from 'vue'

import sampleCode from './samples/schema.py?raw'
import sampleQuery from './samples/query.gql?raw'
import sampleVariables from './samples/variables.json?raw'

export const useState = () => {
  const state = reactive({
    code: sampleCode.trim(),
    query: sampleQuery.trim(),
    variables: sampleVariables.trim(),
  })

  const updateHash = async () => {
    const hash = await zip({
      'schema.py': state.code,
      'query.gql': state.query,
      'variables.json': state.variables,
    })
    window.location.hash = hash
  }

  onMounted(async () => {
    const hash = window.location.hash.slice(1)
    try {
      const files = await unzip(hash)
      state.code = files['schema.py']
      state.query = files['query.gql']
      state.variables = files['variables.json']
    } catch {
      // use default values
      updateHash()
    }
  })

  const { code, query, variables } = toRefs(state)
  watch([code, query, variables], updateHash)

  return state
}
