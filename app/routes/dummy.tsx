import { useState, FormEvent } from "react";
import { json } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Handle form submission
    appendToLog(`[Request ${new Date().toLocaleString()}] Submitting...`);
  };

  return (
    <div>
      <h1>Judge0 Client</h1>
      <Form method="post" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="apiUrl">API URL</label>
          <input type="url" id="apiUrl" name="apiUrl" required />
        </div>

        <div>
          <label htmlFor="sourceCode">Source Code</label>
          <textarea
            id="sourceCode"
            name="sourceCode"
            rows={10}
            cols={50}
            required
          />
        </div>

        <div>
          <label htmlFor="languageId">Language ID</label>
          <input
            type="text"
            id="languageId"
            name="languageId"
            defaultValue="50"
          />
        </div>

        <div>
          <label htmlFor="stdin">Stdin</label>
          <textarea id="stdin" name="stdin" rows={5} cols={25} />
        </div>

        {/* Add more form fields as needed */}

        <div>
          <button type="submit">Run</button>
          <button type="button" onClick={() => setLog("")}>
            Clear Log
          </button>
        </div>
      </Form>

      <h2>Request/Response Log</h2>
      <pre>{log}</pre>

      <h2>API Response</h2>
      <pre>
        {JSON.stringify(actionData as Record<string, unknown>, null, 2)}
      </pre>
    </div>
  );
}
