import { useState } from "react";
import Code from "../utils/code";
import { useTheme } from "../contexts/themeContext";
import { languageMap } from "../utils/constants/languageMap";
import axios from "axios";
import { MaskedLanguages } from "../utils/constants/languages";
const Dummy = () => {
  const [log, setLog] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<number>(71);
  const [userCode, setUserCode] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [languages, setLanguages] = useState<any[]>(MaskedLanguages);
  const [stdin, setStdin] = useState<string>("");
  const { isDarkMode } = useTheme();

  // useEffect(() => {
  //   const fetchLanguages = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_BACKEND_URL}/languages`
  //       );
  //       console.log(response.data);
  //       setLanguages(response.data.languages || []);
  //     } catch (error) {
  //       console.error("Failed to load languages:", error);
  //     }
  //   };
  //   fetchLanguages();
  // }, []);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_JUDGE_BACKEND_API_URL}/execute`,
        {
          source_code: userCode,
          language_id: selectedLanguage,
          stdin: stdin,
        }
      );

      const { accepted, output } = response.data;
      setLog((prevLog) => [
        `\nAccepted: ${accepted}\nOutput: ${output}`,
        ...prevLog,
      ]);
    } catch (error) {
      console.error("Execution error:", error);
      setLog((prevLog) => [...prevLog, "\nExecution failed"]);
    }
  };

  // Clear log when Clear button is clicked
  const handleClearLog = () => {
    setLog([]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      // onSubmit={() => {}}
      className={`${isDarkMode ? "bg-gray-600" : "bg-white"}`}
    >
      <div
        className={`p-2 text-left ${
          isDarkMode ? "text-white" : "text-black"
        } w-screen h-screen flex justify-center font-sans`}
      >
        <div className="w-1/2 p-3 py-8">
          <label
            htmlFor="stdin"
            className={`block text-xs font-bold ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Stdin
          </label>
          <textarea
            id="stdin"
            name="stdin"
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            rows={4}
            cols={20}
            className={`mt-1 block w-full border ${
              isDarkMode
                ? "border-gray-600 bg-gray-700 text-gray-300"
                : "border-gray-300"
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs`}
          />

          <h2 className="text-sm font-semibold mt-3">API Response</h2>
          <pre
            className={`bg-gray-100 p-2 rounded-md w-full h-24 overflow-y-auto text-xs ${
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            {log || "No response yet"}
          </pre>
        </div>

        <div className="w-1/2 p-3 flex flex-col gap-2">
          <select
            name="languageId"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(Number(e.target.value))}
            className={`mt-1 h-8 w-20 border ${
              isDarkMode
                ? "border-gray-600 bg-gray-700 text-gray-300"
                : "border-gray-300"
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs`}
          >
            {languages.map((language) => (
              <option key={language.id} value={language.id}>
                {language.name}
              </option>
            ))}
          </select>

          <p
            className={`text-xs font-medium text-left ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {`Write your ${languageMap[selectedLanguage]} code below...`}
          </p>

          <Code
            userCode={userCode}
            setUserCode={setUserCode}
            selectedLanguage={selectedLanguage}
          />

          <div className="flex space-x-1 justify-center items-center">
            <button
              type="submit"
              className="inline-flex justify-center py-1 px-2 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Run
            </button>
            <button
              type="button"
              onClick={handleClearLog}
              className="inline-flex justify-center py-1 px-2 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Dummy;
