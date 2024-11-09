import { useEffect } from "react";
import { signout } from "../functions/signout";
import { checkSignin } from "../functions/checkSignin";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();

  const handleSignout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await signout();
      console.log("signed out");
      navigate("/signin");
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checkSignin()) {
      navigate("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-4">
      <p className="text-2xl font-bold">Dashboard</p>
      <button
        className="bg-red-500 text-white p-2 rounded-md"
        onClick={handleSignout}
      >
        Signout
      </button>
    </div>
  );
};

export default Dashboard;
