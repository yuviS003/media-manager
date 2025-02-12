import axios from "axios";
import { API_URL } from "../../config";

export const login = async (email, password) => {
  const request = await axios.post(`${API_URL}/api/auth/login`, {
    email,
    password,
  });
  return request.data;
};

export const signup = async (username, email, password) => {
  const request = await axios.post(`${API_URL}/api/auth/signup`, {
    username,
    email,
    password,
  });
  return request.data;
};

export const authorize = async (token) => {
  const request = await axios.get(`${API_URL}/api/auth/authorize`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return request.data;
};
