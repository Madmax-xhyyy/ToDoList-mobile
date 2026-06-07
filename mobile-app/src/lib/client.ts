import axios from "axios";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "http://192.168.100.7:5000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});