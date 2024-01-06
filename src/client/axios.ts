import axios from "axios";

const userId = localStorage.getItem("canvasUserId");
console.log(userId, "user id");
export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    "X-User-Id": userId,
  },
});
