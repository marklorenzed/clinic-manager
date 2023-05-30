import axios from "axios";

const BASE_URL = "http://localhost:8000";

export default axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
