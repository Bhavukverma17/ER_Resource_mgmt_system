import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../config/api";

export const useLoginHook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, formData);
      console.log(response.data);
      localStorage.setItem("currentUser", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      // Dispatch custom event to notify App component about auth change
      window.dispatchEvent(new Event("auth-change"));

      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Login failed");
      return null;
    }
  };

  return { login, loading, error };
};
