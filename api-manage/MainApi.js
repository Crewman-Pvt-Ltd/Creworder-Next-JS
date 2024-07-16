import axios from "axios";
export const baseUrl = process.env.BACKEND_URL;
const MainApi = axios.create({ baseUrl : baseUrl});

export default MainApi;