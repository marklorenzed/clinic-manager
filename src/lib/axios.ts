import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_EXPRESS_API_BASE_URL || 'http://localhost:3000',
  headers: { "Content-Type": "application/json" },
});
