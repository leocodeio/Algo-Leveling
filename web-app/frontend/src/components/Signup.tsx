import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../functions/signup";
import { useNavigate } from "react-router-dom";
import { checkSignin } from "../functions/checkSignin";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // check if user is already signed in using cookies
  useEffect(() => {
    const isSignedIn = checkSignin();
    if (isSignedIn) {
      navigate("/dashboard");
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await signup(username, email, password);
      console.log(response.data, response.status);
      if (response.status === 201) {
        setUsername("");
        setEmail("");
        setPassword("");
        navigate("/signin");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold my-4">Signup</h1>
      <form className="flex flex-col w-1/3 gap-4" onSubmit={handleSignup}>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            autoComplete="username"
            className="p-2 rounded-md border-2 border-gray-300"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="email"
            className="p-2 rounded-md border-2 border-gray-300"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="new-password"
            className="p-2 rounded-md border-2 border-gray-300"
          />
        </div>
        <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">
          Signup
        </button>
      </form>
      <Link to="/signin" className="text-blue-500 mt-4">
        Already have an account? Signin
      </Link>
    </div>
  );
};

export default Signup;
