import axios from "axios";

export const signup = async (username: string, email: string, password: string) => {
  const response = await axios.post("/user/v1/signup", {
    username,
    email,
    password,
  });
};

