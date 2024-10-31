import { Link } from "react-router-dom";

const Entry = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center font-sans p-4">
      Welcome - developed by catalyst community -<b>@leocodeio</b>
      <Link
        className="border border-2 border-black px-2 py-1 rounded"
        to="/dummy"
      >
        Home
      </Link>
    </div>
  );
};

export default Entry;
