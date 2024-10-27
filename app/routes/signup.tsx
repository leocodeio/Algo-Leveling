import { Form, redirect } from "@remix-run/react"; // Import redirect
import { PrismaClient } from "@prisma/client";
import { MdPersonAddAlt1 } from "react-icons/md";
import { FaGithub, FaGoogle } from "react-icons/fa";

const prisma = new PrismaClient(); // Instantiate PrismaClient

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();

  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const verifyEmail = formData.get("verifyEmail") as string;
  const verifyPassword = formData.get("verifyPassword") as string;

  // Basic validation (you might want to implement more robust validation)
  if (email !== verifyEmail) {
    return { error: "Emails do not match" };
  }
  if (password !== verifyPassword) {
    return { error: "Passwords do not match" };
  }

  // Create a new user
  try {
    await prisma.user.create({
      data: {
        name: username,
        email: email,
        password: password,
      },
    });
    return redirect("/login");
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "An error occurred while creating the user." };
  }
}

export default function Signup() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-[#323437]">
      <div className="w-full max-w-lg p-8">
        <h1 className="text-3xl text-gray-800 dark:text-white mb-6 text-center flex">
          <span className="mr-3 text-gray-600 dark:text-white">
            <MdPersonAddAlt1 />
          </span>{" "}
          Register
        </h1>

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

        <Form method="post" className="space-y-6">
          {/* Username */}
          <div>
            <input
              type="text"
              name="username"
              placeholder="username"
              required
              className="w-full p-3 bg-gray-200 dark:bg-[#2C2E31] text-gray-700 dark:text-gray-300 rounded-md placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 text-lg"
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="email"
              required
              className="w-full p-3 bg-gray-200 dark:bg-[#2C2E31] text-gray-700 dark:text-gray-300 rounded-md placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 text-lg"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="password"
              required
              minLength={6}
              className="w-full p-3 bg-gray-200 dark:bg-[#2C2E31] text-gray-700 dark:text-gray-300 rounded-md placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 text-lg"
            />
          </div>

          {/* Verify Password */}
          <div>
            <input
              type="password"
              name="verifyPassword"
              placeholder="verify password"
              required
              minLength={6}
              className="w-full p-3 bg-gray-200 dark:bg-[#2C2E31] text-gray-700 dark:text-gray-300 rounded-md placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 text-lg"
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-gray-700 dark:bg-[#2C2E31] hover:bg-gray-600 dark:hover:bg-gray-500 text-white py-3 rounded-md flex items-center justify-center text-lg"
          >
            <span className="mr-2 text-xl">
              <MdPersonAddAlt1 />
            </span>{" "}
            Sign Up
          </button>
        </Form>
      </div>
    </div>
  );
}
