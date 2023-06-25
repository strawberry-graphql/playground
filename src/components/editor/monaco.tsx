/**
 * Editor for the Python source code.
 */

import Editor, { useMonaco } from "@monaco-editor/react";
import { MarkerSeverity, MarkerTag } from "monaco-editor";
import { useCallback, useEffect } from "react";

export const MonacoEditor = ({
  source,
  onChange,
  language = "plaintext",
}: {
  source: string;
  language?: string;
  onChange: (pythonSource: string) => void;
}) => {
  const monaco = useMonaco();

  const handleChange = useCallback(
    (value: string | undefined) => {
      onChange(value ?? "");
    },
    [onChange]
  );

  return (
    <Editor
      options={{
        readOnly: false,
        minimap: { enabled: false },
        fontSize: 14,
        roundedSelection: false,
        scrollBeyondLastLine: false,
      }}
      language={language}
      //   theme={theme === "light" ? "Ayu-Light" : "Ayu-Dark"}
      value={source}
      onChange={handleChange}
    />
  );
};
