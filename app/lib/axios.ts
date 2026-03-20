"use client";

import axios from "axios";
import { env } from "next-runtime-env";

const api = axios.create({
  baseURL: env("NEXT_PUBLIC_API_URL"),
  withCredentials: true,
});

export default api;
