import { Form, redirect } from "@remix-run/react";
import { createUserSession } from "../session.server";
import { PrismaClient } from "@prisma/client";
import { FaGithub, FaGoogle, FaSignInAlt } from "react-icons/fa";

const prisma = new PrismaClient();

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  // Ensure both fields are present
  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Invalid form submission" }; // Handle invalid submission
  }

  // Find the user in the database by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // If user doesn't exist or password doesn't match, return an error
  if (!user || user.password !== password) {
    return { error: "Invalid email or password" }; // Handle invalid credentials
  }

  // Create a session and redirect to homepage upon successful login

  return createUserSession(
    request,
    {
      id: user.id,
      access_token: "some-access-token", // Generate a real token here if needed
      lightOrDarkMode: "light",
      language: "en",
      CSRFToken: "123", // Placeholder, implement CSRF protection if needed
      metrics: { lastLogin: new Date(), loginCount: 0 },
    },
    "/"
  );
}

// This is the login form component
export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-[#323437]">
      <Form method="post" className="p-8 w-full max-w-lg">
        <p className="text-3xl flex text-gray-800 dark:text-white mb-6 items-center">
          <span className="mr-3 text-gray-600 dark:text-white">
            <FaSignInAlt />
          </span>
          login
        </p>

        <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <button
            type="button"
            className="bg-gray-700 dark:bg-[#2C2E31] hover:bg-gray-600 dark:hover:bg-gray-500 text-white py-3 rounded-md w-full sm:w-1/2 text-xl flex justify-center"
          >
            <span className="text-xl">
              <FaGoogle />
            </span>
          </button>
          <button
            type="button"
            className="bg-gray-700 dark:bg-[#2C2E31] hover:bg-gray-600 dark:hover:bg-gray-500 text-white py-3 rounded-md w-full sm:w-1/2 text-xl flex justify-center"
          >
            <span>
              <FaGithub />
            </span>
          </button>
        </div>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t-4 rounded bg-gray-300 dark:bg-[#2C2E31]"></div>
          <span className="mx-3 text-gray-400 text-lg">or</span>
          <div className="flex-grow border-t-4 rounded bg-gray-300 dark:bg-[#2C2E31]"></div>
        </div>

        <div className="mb-5">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            className="w-full p-3 bg-gray-200 dark:bg-[#2C2E31] text-gray-800 dark:text-gray-300 rounded-md placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 text-lg"
            required
          />
        </div>

        <div className="mb-5">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            className="w-full p-3 bg-gray-200 dark:bg-[#2C2E31] text-gray-800 dark:text-gray-300 rounded-md placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 text-lg"
            required
          />
        </div>

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            className="h-5 w-5 text-yellow-500 bg-[#2C2E31] rounded focus:ring-0"
          />
          <label htmlFor="rememberMe" className="ml-3 text-gray-400 text-lg">
            remember me
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-700 dark:bg-[#2C2E31] hover:bg-gray-600 dark:hover:bg-gray-500 text-white py-3 rounded-md flex items-center justify-center text-lg"
        >
          <span className="mr-2 text-xl">
            <FaSignInAlt />
          </span>
          sign in
        </button>

        <div className="text-center mt-4">
          <a
            href="/forgot-password"
            className="text-gray-500 dark:text-gray-400 text-lg hover:underline"
          >
            forgot password?
          </a>
        </div>
      </Form>
    </div>
  );
}
