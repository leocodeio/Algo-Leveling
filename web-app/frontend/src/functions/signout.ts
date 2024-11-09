import axios from "axios";

export const signout = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_USER_BACKEND_API_URL}/signout`,
    {
      withCredentials: true,
    }
  );
  return response;
};
