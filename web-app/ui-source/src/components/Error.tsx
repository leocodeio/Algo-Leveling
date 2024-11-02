import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center font-sans p-4">
      yup! you are lost
      <Link className="border border-2 border-black px-2 py-1 rounded" to="/">
        Home
      </Link>
    </div>
  );
};

export default Error;
