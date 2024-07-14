import axios from "axios";

// Axios will include coockies to requests
axios.defaults.withCredentials = true;

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const reponse = await axios.post("http://localhost:3000/users/register", {
    username,
    email,
    password,
  });
  return reponse.data;
};
