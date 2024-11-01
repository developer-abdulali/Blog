import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

// signup fuction
export const signup = async ({ name, email, password }) => {
  try {
    const response = await axios.post(`${backendURL}/users/register`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// signin function
export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${backendURL}/users/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
