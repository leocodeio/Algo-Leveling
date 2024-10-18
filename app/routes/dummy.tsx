import { useState, FormEvent } from "react";
import { json } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  console.log(formData);
  // Process form data and make API call to Judge0
  // Return the response as JSON
  return json({
    /* API response */
  });
};

export default function Dummy() {
  const [log, setLog] = useState("");
  const actionData = useActionData();

  const appendToLog = (text: string) => {
    setLog((prevLog) => prevLog + text + "\n");
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Judge0 Client</h1>
      <Form method="post" className="space-y-4">
        <div>
          <label
            htmlFor="apiUrl"
            className="block text-sm font-medium text-gray-700"
          >
            API URL
          </label>
          <input
            type="url"
            id="apiUrl"
            name="apiUrl"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="sourceCode"
            className="block text-sm font-medium text-gray-700"
          >
            Source Code
          </label>
          <textarea
            id="sourceCode"
            name="sourceCode"
            rows={10}
            cols={50}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="languageId"
            className="block text-sm font-medium text-gray-700"
          >
            Language ID
          </label>
          <input
            type="text"
            id="languageId"
            name="languageId"
            defaultValue="50"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="stdin"
            className="block text-sm font-medium text-gray-700"
          >
            Stdin
          </label>
          <textarea
            id="stdin"
            name="stdin"
            rows={5}
            cols={25}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Run
          </button>
          <button
            type="button"
            onClick={() => setLog("")}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Clear Log
          </button>
        </div>
      </Form>

      <h2 className="text-xl font-semibold mt-6">Request/Response Log</h2>
      <pre className="bg-gray-100 p-4 rounded-md">{log}</pre>

      <h2 className="text-xl font-semibold mt-6">API Response</h2>
      <pre className="bg-gray-100 p-4 rounded-md">
        {JSON.stringify(actionData as Record<string, unknown>, null, 2)}
      </pre>
    </div>
  );
}
