/**
 * Editor for the Python source code.
 */

import Editor, { useMonaco } from "@monaco-editor/react";
import { MarkerSeverity, MarkerTag } from "monaco-editor";
import { useCallback, useEffect } from "react";

export const MonacoEditor = ({
  title,
  source,
  onChange,
  language = "plaintext",
}: {
  title: string;
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
    <div className="flex flex-col h-full">
      <div
        className="bg-strawberry px-4 py-2 text-white font-bold text-sm"
      >{title}</div>

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
    </div>
  );
};
