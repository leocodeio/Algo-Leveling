import { Form, redirect } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();  // Await the formData
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

  // If user doesn't exist or password doesn't match, return error
  if (!user || user.password !== password) {
    return { error: "Invalid email or password" }; // Handle invalid credentials
  }

  // Redirect to the home page upon successful login
  return redirect("/");
}

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <Form method="post" className="bg-gray-800 p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-white text-center text-xl mb-6">Login</h2>

        <div className="flex justify-between space-x-4 mb-6">
          <button 
            type="button" 
            className="bg-gray-700 text-white py-2 px-4 rounded-md w-full">
            G
          </button>
          <button 
            type="button" 
            className="bg-gray-700 text-white py-2 px-4 rounded-md w-full">
            GitHub
          </button>
        </div>

        <p className="text-center text-gray-400 mb-4">or</p>

        <div className="mb-4">
          <label htmlFor="email" className="text-gray-400">Email</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            className="w-full mt-1 p-2 bg-gray-700 text-white rounded-md border-none focus:outline-none" 
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="text-gray-400">Password</label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            className="w-full mt-1 p-2 bg-gray-700 text-white rounded-md border-none focus:outline-none" 
            required
          />
        </div>

        <div className="flex items-center mb-6">
          <input 
            type="checkbox" 
            id="rememberMe" 
            name="rememberMe" 
            className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-700 bg-gray-800 rounded" 
          />
          <label htmlFor="rememberMe" className="ml-2 text-gray-400">Remember me</label>
        </div>

        <button 
          type="submit" 
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md">
          Sign in
        </button>

        <div className="text-center mt-4">
          <a href="/forgot-password" className="text-gray-400 hover:underline">Forgot password?</a>
        </div>
      </Form>
    </div>
  );
}
