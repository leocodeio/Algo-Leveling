import { Link } from "react-router-dom";

const Entry = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center font-sans p-4">
      Entry to the application
      <Link
        className="border border-2 border-black px-2 py-1 rounded"
        to="/dummy"
      >
        Sample
      </Link>
    </div>
  );
};

export default Entry;
