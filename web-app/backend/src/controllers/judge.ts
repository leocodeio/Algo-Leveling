import axios from "axios";
import { Request, Response } from "express";

// TypeScript interface for the request body
// interface ExecuteRequestBody {
//   source_code: string;
//   language_id: number;
//   stdin?: string;
//   expected_output?: string;
// }

// TypeScript interface for the Judge0 API response
interface ExecutionResponse {
  token: string;
  status: { description: string };
  stdout?: string;
  stderr?: string;
  compile_output?: string;
}

export async function getLanguages(req: Request, res: Response): Promise<void> {
  try {
    const languagesRes = await axios.get(
      `${process.env.VITE_JUDGE0_SERVER_URI}/languages`,
      { headers: { "Content-Type": "application/json" } }
    );

    const languages = languagesRes.data;
    res.status(201).json({
      message: "User created successfully",
      languages: languages,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "An unexpected error occurred during signup",
    });
  }
}

export async function executeCode(req: Request, res: Response): Promise<void> {
  try {
    const { source_code, language_id, stdin, expected_output } = req.body;
    console.log(source_code, language_id, stdin, expected_output);
    if (!source_code) {
      res.json({
        accepted: "No code provided",
        output: "No code provided",
      });
      return;
    }
    let executionPayload;
    if (expected_output) {
      executionPayload = {
        //check if already base64 encoded

        source_code: Buffer.from(source_code).toString("base64"),
        language_id,
        stdin: Buffer.from(stdin || "").toString("base64"),
        expected_output: Buffer.from(expected_output || "").toString("base64"),
      };
    } else {
      executionPayload = {
        source_code: Buffer.from(source_code).toString("base64"),
        language_id,
        stdin: Buffer.from(stdin || "").toString("base64"),
      };
    }

    console.log(executionPayload);

    // Make the request to Judge0 API
    const executionRes = await axios.post<ExecutionResponse>(
      `${process.env.VITE_JUDGE0_SERVER_URI}/submissions?base64_encoded=true&wait=true`,
      executionPayload,
      { headers: { "Content-Type": "application/json" } }
    );

    const { token } = executionRes.data;

    // Poll Judge0 API for the result
    const executionStatusRes = await axios.get<ExecutionResponse>(
      `${process.env.VITE_JUDGE0_SERVER_URI}/submissions/${token}?base64_encoded=true&fields=*`
    );

    const executionStatus = executionStatusRes.data;
    const accepted = executionStatus.status.description;
    const stdout = executionStatus.stdout
      ? Buffer.from(executionStatus.stdout, "base64").toString()
      : "";
    const stderr = executionStatus.stderr
      ? Buffer.from(executionStatus.stderr, "base64").toString()
      : "";
    const compileOutput = executionStatus.compile_output
      ? Buffer.from(executionStatus.compile_output, "base64").toString()
      : "";

    const output = stdout + stderr + compileOutput;

    res.json({ accepted, output });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
}
