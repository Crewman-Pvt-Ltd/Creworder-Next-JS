import axios from "axios";
export const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const MainApi = axios.create({
    baseURL: baseUrl,
  });

export default MainApi;