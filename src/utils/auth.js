import MainApi from "@/api-manage/MainApi";
import { log_out } from "../../api-manage/ApiRoutes";

export const logout = async () => {
    try {
        const token = localStorage.getItem('crew_token');

        if (token) {
            await MainApi.post(
                `${log_out}`,
                {},
                {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }
            );
        }

        localStorage.removeItem('crew_token');
        document.cookie = 'token=; Max-Age=0; path=/';
    } catch (error) {
        console.error('Error logging out:', error);
    }
};
