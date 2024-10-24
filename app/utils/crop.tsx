import { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { languageMap } from "~/constants/languageMap";

export default function Code({
  userCode,
  setUserCode,
  selectedLanguage,
}: {
  userCode: string;
  setUserCode: (value: string) => void;
  selectedLanguage: number;
}) {
  useEffect(() => {
    if (selectedLanguage) {
      setUserCode(
        `// Write your ${languageMap[selectedLanguage]} code here\n\n`
      );
    }
  }, [selectedLanguage]);

  console.log(selectedLanguage);
  const handleEditorChange = (value: string | undefined) => {
    setUserCode(value || "");
  };

  return (
    <div
      style={{
        height: "800px",
        width: "1000px",
        border: "1px solid #ccc",
      }}
    >
      <Editor
        height="100%"
        language={languageMap[selectedLanguage]}
        value={userCode}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          selectOnLineNumbers: true,
          automaticLayout: true,
        }}
      />
    </div>
  );
}
