import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold my-4">Signin</h1>
      <div className="flex flex-col w-1/3 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-2 rounded-md border-2 border-gray-300"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-2 rounded-md border-2 border-gray-300"
          />
        </div>
        <button className="bg-blue-500 text-white p-2 rounded-md">
          Signin
        </button>
      </div>
      <Link to="/signup" className="text-blue-300 mt-4">
        Don't have an account? Signup
      </Link>
    </div>
  );
};

export default Signin;
