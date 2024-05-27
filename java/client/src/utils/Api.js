import axios from "axios";

export const API_URL = "http://localhost:8080/api/v1";

export const API_LIMIT = 3;

export const sendRequest = async (api, method, payload = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token != null) {
    headers.headers = { ...headers.headers, Authorization: `Bearer ${token}` };
  }

  try {
    if (method === "GET") {
      const response = await axios.get(api, headers);
      return response;
    } else if (method === "POST") {
      const response = await axios.post(api, payload, headers);
      return response;
    } else if (method === "PUT") {
      const response = await axios.put(api, payload, headers);
      return response;
    } else if (method === "DELETE") {
      const response = await axios.delete(api, headers);
      return response;
    }
  } catch (error) {
    console.error("Error occurred during request:", error);
    throw error;
  }
};
