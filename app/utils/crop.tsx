import { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { languageMap } from "~/constants/languageMap";
import ResizableComponent from "./resize";
import { useTheme } from "../contexts/themeContext";
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

  const { isDarkMode } = useTheme();

  return (
    <>
      <ResizableComponent>
        <div
          style={{
            height: "100%",
            width: "100%",
            border: "1px solid #ccc",
          }}
        >
          <Editor
            height="100%"
            language={languageMap[selectedLanguage]}
            value={userCode}
            onChange={handleEditorChange}
            theme={isDarkMode ? "vs-dark" : "vs"}
            options={{
              selectOnLineNumbers: true,
              automaticLayout: true,
            }}
          />
        </div>
      </ResizableComponent>
    </>
  );
}
