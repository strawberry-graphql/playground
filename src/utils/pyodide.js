const baseUrl = "https://cdn.jsdelivr.net/pyodide/v0.19.0/full/";
let pyodide;

const load = async () => {
  const url = baseUrl + "pyodide.js";
  await import(/* @vite-ignore */ url);
  pyodide = await loadPyodide({
    indexURL: baseUrl,
    fullStdLib: false,
  });
};

const install = async (packages) => {
  await pyodide.loadPackage(["micropip"]);
  packages = packages.map((p) => `"${p}"`);
  await pyodide.runPythonAsync(`
    import micropip
    import builtins
    # workaround to get strawberry-graphql installed
    _gather_requirements = micropip._micropip.PACKAGE_MANAGER.gather_requirements
    async def gather_requirements(requirements, ctx, keep_going):
        return { **await _gather_requirements(requirements, ctx, keep_going=True), 'failed': [] }
    micropip._micropip.PACKAGE_MANAGER.gather_requirements = gather_requirements
    print("installing packages", ${packages})
    # await micropip.install([${packages}, "${window.location.protocol}//${window.location.host}/libcst-0.4.8-py3-none-any.whl"])
    await micropip.install([
      "${window.location.protocol}//${window.location.host}/strawberry_graphql-0.126.0-py3-none-any.whl",
      "${window.location.protocol}//${window.location.host}/libcst-0.4.8-py3-none-any.whl"
    ])

    import sys

    original_exception_hook = sys.excepthook

    from strawberry.exceptions import StrawberryException

    def exception_handler(
        exception_type,
        exception,
        traceback,
    ):
        print("asd")

        def _get_handler() -> ExceptionHandler:
            if (
                issubclass(exception_type, StrawberryException)
            ):
                print("strawberry exception")

            return original_exception_hook

        _get_handler()(exception_type, exception, traceback)

    sys.excepthook = exception_handler

    def strawberry_playground_getsource():
        import js

        return js.__source

    builtins.strawberry_playground_getsource = strawberry_playground_getsource
  `);
};

export const initPyodide = async ({ packages, logging }) => {
  logging = logging || (() => {});
  if (!pyodide) {
    logging("Loading pyodide");
    await load();
    logging("Loading python packages");
    if (packages) {
      await install(packages);
    }
    logging("Ready");
  }

  return pyodide;
};
