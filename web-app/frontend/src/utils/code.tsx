
import { Editor } from "@monaco-editor/react";
import { languageMap } from "./constants/languageMap";
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


  console.log(selectedLanguage);
  const handleEditorChange = (value: string | undefined) => {
    setUserCode(value || "");
  };

  const { isDarkMode } = useTheme();

  return (
    <>
      <div
        style={{
          height: "350px",
          width: "600px",
          border: "1px solid #ccc",
        }}
      >
        <Editor
          height="100%"
          width="100%"
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
    </>
  );
}
