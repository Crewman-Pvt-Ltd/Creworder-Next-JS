import { baseApiUrl } from "@/api-manage/ApiRoutes";
import { getToken } from "@/utils/getToken";
import axios from "axios";
export const fetchSideBarData = async () => {
    try {
        const token = getToken();
        const config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${baseApiUrl}get-module/0/`,
            headers: {
                Authorization: `Token ${token}`,
            },
        };
        const response = await axios.request(config);
        return response.data.sidebardata;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
