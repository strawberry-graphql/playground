import { zip, unzip } from './utils/zip.js'
import { watch } from 'vue'

import sampleRequirements from './samples/requirements.txt?raw'
import sampleCode from './samples/schema.py?raw'
import sampleQuery from './samples/query.gql?raw'
import sampleVariables from './samples/variables.json?raw'

function parseStrawberryVersion(requirements) {
  const m = requirements.match(/strawberry-graphql==([^\n]+)/)
  if (m) {
    return m[1]
  }
  return 'latest'
}

function updateStrawberryVersion(requirements, version) {
  let strawberry = 'strawberry-graphql'
  if (version && version !== 'latest') {
    strawberry += '==' + version
  }
  return requirements.replace(/strawberry-graphql(==[^\n]+)?/, strawberry)
}

export const useState = () => {
  const state = reactive({
    code: sampleCode.trim(),
    query: sampleQuery.trim(),
    requirements: sampleRequirements.trim(),
    variables: sampleVariables.trim(),
    strawberryVersion: null,
  })

  const updateHash = async () => {
    const hash = await zip({
      'requirements.txt': state.requirements,
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
      if ('requirements.txt' in files) {
        state.requirements = files['requirements.txt']
      }
      state.strawberryVersion = parseStrawberryVersion(state.requirements)
    } catch {
      // use default values
      state.strawberryVersion = parseStrawberryVersion(state.requirements)
      updateHash()
    }

    watch(() => state.strawberryVersion, async (version) => {
      state.requirements = updateStrawberryVersion(state.requirements, version)
      await updateHash()
      window.location.reload()
    })
  })

  const { code, query, variables } = toRefs(state)
  watch([ code, query, variables ], updateHash)

  return state
}
