import { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { useOutletContext } from "@remix-run/react"; // Import useOutletContext
import { languageMap } from "~/constants/languageMap";

export default function Code() {
  const { selectedLanguage } = useOutletContext<{
    selectedLanguage: number;
  }>();

  const [code, setCode] = useState<string>(
    `// Write your ${languageMap[selectedLanguage]} code here\n\n`
  );

  useEffect(() => {
    if (selectedLanguage) {
      setCode(`// Write your ${languageMap[selectedLanguage]} code here\n\n`);
    }
  }, [selectedLanguage]);

  console.log(selectedLanguage);
  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
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
}
