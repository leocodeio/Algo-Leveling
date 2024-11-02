import { useState } from "react";
import ProblemArea from "../utils/play/ProblemArea";
import Code from "../utils/code";
import { languages as languagesList } from "../utils/constants/languages";
import { languageMap } from "../utils/constants/languageMap";
import { useTheme } from "../contexts/themeContext";

const Play = () => {
  const { isDarkMode } = useTheme();
  const [userCode, setUserCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(71);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [languages, setLanguages] = useState<any[]>(languagesList);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("will do this");
    e.preventDefault();
  };
  return (
    <div className="flex gap-2">
      <ProblemArea />

      <form
        onSubmit={handleSubmit}
        className={`${isDarkMode ? "bg-gray-600" : "bg-white"} w-1/2 h-full`}
      >
        <div
          className={`p-2 text-left ${
            isDarkMode ? "text-white" : "text-black"
          } w-full h-full  flex  font-sans`}
        >
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
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Play;
