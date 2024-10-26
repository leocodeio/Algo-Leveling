import { Form, redirect } from "@remix-run/react"; // Import redirect
import { PrismaClient } from "@prisma/client";

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
        name:username,
        email:email,
        password:password 
      },
    });
    return redirect('/login'); 
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "An error occurred while creating the user." };
  }
}

export default function Signup() {
  return (
    <div className="flex items-center justify-center p-11 min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
          <span className="mr-2">👤</span> Register
        </h1>
        <Form method="post" className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              type="text"
              name="username"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Verify Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Verify Email:</label>
            <input
              type="email"
              name="verifyEmail"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Verify Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Verify Password:</label>
            <input
              type="password"
              name="verifyPassword"
              required
              minLength={6}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-600 text-white rounded-md shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex justify-center items-center"
          >
            <span className="mr-2">👤</span> Sign Up
          </button>
        </Form>
      </div>
    </div>
  );
}
