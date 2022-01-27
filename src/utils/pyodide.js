const baseUrl = 'https://cdn.jsdelivr.net/pyodide/v0.19.0/full/'
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
  packages = packages.map((p) => `"${p}"`)
  await pyodide.runPythonAsync(`
    import micropip
    # workaround to get strawberry-graphql installed
    _gather_requirements = micropip._micropip.PACKAGE_MANAGER.gather_requirements
    async def gather_requirements(requirements, ctx, keep_going):
        return { **await _gather_requirements(requirements, ctx, keep_going=True), 'failed': [] }
    micropip._micropip.PACKAGE_MANAGER.gather_requirements = gather_requirements
    await micropip.install([${packages}])
  `)
}

export const initPyodide = async ({ packages, logging }) => {
  logging = logging || (() => {})
  if (!pyodide) {
    logging('Loading pyodide')
    await load()
    logging('Loading python packages')
    if (packages) {
      await install(packages)
    }
    logging('Ready')
  }

  return pyodide
}
