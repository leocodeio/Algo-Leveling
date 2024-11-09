import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../functions/signin";
import { checkSignin } from "../functions/checkSignin";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //check if user is already signed in using cookies
  useEffect(() => {
    const isSignedIn = checkSignin();
    if (isSignedIn) {
      navigate("/dashboard");
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await signin(email, password);
      console.log('Response headers:', response.headers);
      console.log('Cookies after signin:', document.cookie);
      
      if (response.status === 200) {
        setEmail("");
        setPassword("");
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.log('Error during signin:', error);
      console.log('Error response:', error.response);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold my-4">Signin</h1>
      <form className="flex flex-col w-1/3 gap-4" onSubmit={handleSignin}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="password"
            className="p-2 rounded-md border-2 border-gray-300"
          />
        </div>
        <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">
          Signin
        </button>
      </form>
      <Link to="/signup" className="text-blue-500 mt-4">
        Don't have an account? Signup
      </Link>
    </div>
  );
};

export default Signin;
