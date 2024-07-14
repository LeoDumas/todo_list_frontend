import axios from "axios";

// Axios will include coockies to requests
axios.defaults.withCredentials = true;

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post("http://localhost:3000/users/login", {
    email,
    password,
  });
  return response.data;
};
