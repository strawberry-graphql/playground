import { reactive, toRefs, unref, watch } from "vue";
import { initPyodide } from "./pyodide.js";
import toSemver from "to-semver";

const url = "https://pypi.org/pypi/strawberry-graphql/json";

export const useStrawberryVersions = () => {
  const versions = ref();
  const fetchVersions = async () => {
    if (versions.value) {
      return;
    }
    const rsp = await fetch(url);
    const data = await rsp.json();
    let keys = Object.keys(data.releases);
    keys = toSemver(keys);
    keys.unshift("latest");
    versions.value =  [...new Set(keys)];
  };
  return { versions, fetchVersions };
};

export const useStrawberry = (data) => {
  const state = reactive({
    results: null,
    errors: null,
    loading: [],
    schema: null,
  });

  const init = async () => {
    const packages = unref(data).requirements.trim().split("\n");

    const pyodide = await initPyodide({
      packages,
      logging: (str) => state.loading.push(str),
    });

    window.pyodide = pyodide;

    watch(
      data,
      async (dataRef) => {
        const { code, query, variables } = unref(dataRef);

        state.errors = null;
        state.schema = null;

        const globals = pyodide.globals;
        globals.set("schema", null);

        try {
          pyodide.runPython(code, globals);
        } catch (err) {

          state.results = null;
          state.errors = err.message;
          return;
        }

        // get and store schema
        const schema = globals.get("schema");
        if (typeof schema === "undefined") {
          state.results = null;
          state.errors = "NameError: name 'schema' is not defined";

          return;
        }
        state.schema = schema.__str__();

        let pyVariables = {};

        try {
          pyVariables = pyodide.toPy(JSON.parse(variables));
        } catch (err) {
          state.results = null;
          state.errors = `${err.name}: ${err.message}`;
          schema.destroy();
          return;
        }

        // execute query
        const results = await schema.execute(query, pyVariables);

        schema.destroy();

        // check errors
        if (results.errors) {
          state.results = null;
          const errors = results.errors.toJs();
          state.errors = errors.map((e) => e.__str__()).join("\n");
          results.destroy();
          return;
        }

        // store results
        const result = results.data.toJs({
          dict_converter: Object.fromEntries,
        });
        state.results = JSON.stringify(result, null, 2);
        results.destroy();
      },
      { immediate: true, deep: true }
    );

    state.loading = null;
  };

  return {
    ...toRefs(state),
    init,
  };
};
