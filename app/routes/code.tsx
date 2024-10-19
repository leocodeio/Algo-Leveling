import { useState } from "react";
import { Editor } from "@monaco-editor/react";

export const Code = () => {
  const [code, setCode] = useState<string>(
    `// Write your TypeScript code here\n\n`
  );

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  return (
    <div style={{ height: "400px", border: "1px solid #ccc" }}>
      <Editor
        height="100%"
        language="typescript"
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          selectOnLineNumbers: true,
          automaticLayout: true,
        }}
      />
    </div>
  );
};
