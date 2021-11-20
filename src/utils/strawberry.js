import { reactive, toRefs, watch } from 'vue'
import { initPyodide } from './pyodide.js'

const packages = [
  './strawberry_graphql-0.87.1-py3-none-any.whl',
]

export const useStrawberry = ({ code, query, variables }) => {
  const state = reactive({
    results: null,
    errors: null,
    loading: [],
    schema: null,
  })

  onMounted(async () => {
    const pyodide = await initPyodide({
      packages,
      logging: (str) => state.loading.push(str)
    })
    window.pyodide = pyodide

    watch([code, query, variables], async ([code, query, variables]) => {
      state.errors = null
      state.schema = null

      //const globals = pyodide.toPy({})
      const globals = pyodide.globals
      globals.set('schema', null)

      // exeute python code
      try {
        pyodide.runPython(code, globals)
      } catch(err) {
        state.results = null
        state.errors = err.message
        return
      }

      // get and store schema
      const schema = globals.get('schema')
      if (typeof schema === 'undefined') {
        state.results = null
        state.errors = "NameError: name 'schema' is not defined"
        return
      }
      state.schema = schema.__str__()

      // parse variables
      try {
        variables = pyodide.toPy(JSON.parse(variables))
      } catch (err) {
        state.results = null
        state.errors = `${err.name}: ${err.message}`
        schema.destroy()
        return
      }

      // execute query
      const results = await schema.execute(query, variables)
      //const results = schema.execute_sync(query, variables)
      schema.destroy()

      // check errors
      if (results.errors) {
        state.results = null
        const errors = results.errors.toJs()
        state.errors = errors.map((e) => e.__str__()).join('\n')
        results.destroy()
        return
      }

      // store results
      const data = results.data.toJs({ dict_converter: Object.fromEntries })
      state.results = JSON.stringify(data, null, 2)
      results.destroy()

    }, { immediate: true })

    state.loading = null
  })

  return toRefs(state)
}
