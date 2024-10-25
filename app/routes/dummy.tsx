import { useEffect, useState } from "react";
import { json } from "@remix-run/node";
import { useActionData, Form, useLoaderData } from "@remix-run/react";
import Code from "~/utils/code";
import { useTheme } from "~/contexts/themeContext";

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  // console.log(formData);
  const sourceCode = btoa(formData.get("sourceCode") as string);
  const languageId = formData.get("languageId");
  const stdin = btoa(formData.get("stdin") as string);

  // execute code on judge0
  const executionPayload = {
    source_code: sourceCode,
    language_id: languageId,
    stdin: stdin,
  };
  console.log(executionPayload);

  const executionRes = await fetch(
    `${process.env.VITE_JUDGE0_SERVER_URI}/submissions?base64_encoded=true&wait=true`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(executionPayload),
    }
  );

  // get token from execution response
  const { token } = await executionRes.json();

  // get execution status
  const executionStatusRes = await fetch(
    `${process.env.VITE_JUDGE0_SERVER_URI}/submissions/${token}?base64_encoded=true&fields=*`
  );
  const executionStatus = await executionStatusRes.json();
  console.log(executionStatus);
  // Extract status and message from the response
  const accepted = executionStatus.status.description;

  // Decode the base64-encoded stdout and stderr, if they exist
  const stdout = executionStatus.stdout ? atob(executionStatus.stdout) : "";
  const stderr = executionStatus.stderr ? atob(executionStatus.stderr) : "";
  const compileOutput = executionStatus.compile_output
    ? atob(executionStatus.compile_output)
    : "";

  const output = stdout + stderr + compileOutput;

  // Log the decoded output and error (for debugging)
  console.log(accepted, output);

  // Return the decoded output back to the frontend as a JSON response
  return json({
    accepted: accepted,
    output: output,
  });
};

export const loader = async () => {
  // load languages
  const languagesRes = await fetch(
    `${process.env.VITE_JUDGE0_SERVER_URI}/languages`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const languages = await languagesRes.json();

  return json({
    languages: languages,
  });
};

export default function Dummy() {
  const [log, setLog] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<number>(71);
  const [userCode, setUserCode] = useState<string>("");
  let actionData = useActionData<typeof action>();
  const { languages } = useLoaderData<typeof loader>();

  let Response: { accepted: string; output: string } | undefined;
  if (actionData) {
    const { accepted, output } = actionData as {
      accepted: string;
      output: string;
    };
    Response = {
      accepted: accepted,
      output: output,
    };
  }

  useEffect(() => {
    if (Response) {
      setLog((prevLog) => prevLog + `\n${JSON.stringify(Response)}`);
    }
  }, [actionData]);

  const { isDarkMode } = useTheme();
  return (
    <Form method="post" className={`${isDarkMode ? "bg-[#3e3e42]" : ""}`}>
      <div className="w-screen h-screen flex items-center justify-between text-center font-sans p-2">
        <div className="w-1/2 p-3">
          <div className="space-y-2">
            <label
              htmlFor="languageId"
              className="block text-xs font-medium text-gray-700"
            >
              Language ID
            </label>
            <select
              name="languageId"
              defaultValue={71}
              className="mt-1 block w-auto border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs"
              onChange={(e) => setSelectedLanguage(Number(e.target.value))}
            >
              {languages.map((language: { id: number; name: string }) => (
                <option key={language.id} value={language.id}>
                  {language.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="stdin"
              className="block text-xs font-medium text-gray-700"
            >
              Stdin
            </label>
            <textarea
              id="stdin"
              name="stdin"
              rows={4}
              cols={20}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs"
            />
          </div>

          <h2 className="text-sm font-semibold mt-3">API Response</h2>
          <pre className="bg-gray-100 p-2 rounded-md w-full h-24 overflow-y-auto text-xs">
            {actionData && Response
              ? Object.entries(Response).map(([key, value]) => (
                  <div key={key} className="flex flex-col w-full">
                    <span className="font-bold">{key}:</span> {value}
                  </div>
                ))
              : "No response yet"}
          </pre>
          <h2 className="text-sm font-semibold mt-3">Request/Response Log</h2>
          <pre className="bg-gray-100 p-2 rounded-md w-full h-24 overflow-y-auto text-xs">
            {log}
          </pre>
        </div>
        <div className="w-1/2 p-3 flex flex-col gap-2">
          <Code
            userCode={userCode}
            setUserCode={setUserCode}
            selectedLanguage={selectedLanguage}
          />
          <div className="flex space-x-1 justify-center items-center">
            <input type="hidden" name="sourceCode" value={userCode} />
            <button
              type="submit"
              className="inline-flex justify-center py-1 px-2 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Run
            </button>
            <button
              type="button"
              onClick={() => {
                setLog("");
              }}
              className="inline-flex justify-center py-1 px-2 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
}
