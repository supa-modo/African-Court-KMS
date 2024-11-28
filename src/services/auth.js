import axios from "axios";

// Replace with your actual backend endpoint
const API_URL = "http://localhost:5000/api/auth";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });

    // Assuming backend returns { success: true, token, username, department }
    return response.data;
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};
