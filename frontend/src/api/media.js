import axios from "axios";
import { API_URL } from "../../config";

export const getAllMedia = async (userId) => {
  const request = await axios.get(`${API_URL}/api/media/${userId}/user`, {
    headers: {
      Authorization: `Bearer ${
        sessionStorage.getItem("user_token") ||
        localStorage.getItem("user_token")
      }`,
    },
  });
  return request.data;
};

export const uploadMedia = async (data) => {
  const request = await axios.post(`${API_URL}/api/media/upload`, data, {
    headers: {
      Authorization: `Bearer ${
        sessionStorage.getItem("user_token") ||
        localStorage.getItem("user_token")
      }`,
    },
    "Content-Type": "multipart/form-data",
  });
  return request.data;
};

export const deleteMediaById = async (mediaId) => {
  const request = await axios.delete(`${API_URL}/api/media/delete/${mediaId}`, {
    headers: {
      Authorization: `Bearer ${
        sessionStorage.getItem("user_token") ||
        localStorage.getItem("user_token")
      }`,
    },
  });
  return request.data;
};
