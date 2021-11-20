const baseUrl = 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/'
let pyodide

const load = async () => {
  const url = baseUrl + 'pyodide.js'
  await import(/* @vite-ignore */ url)
  pyodide = await loadPyodide({
    indexURL : baseUrl,
    fullStdLib: false,
  });
}

const install = async (packages) => {
  await pyodide.loadPackage(['micropip'])
  await pyodide.runPythonAsync(`
    import micropip
    await micropip.install("${packages}")
  `)
}

export const initPyodide = async ({ packages }) => {
  if (!pyodide) {
    await load()

    if (packages) {
      await install(packages)
    }
  }

  return pyodide
}
