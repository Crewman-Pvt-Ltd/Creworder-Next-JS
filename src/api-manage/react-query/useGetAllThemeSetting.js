import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { theme_setting } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getThemeSetting = async () => {
  const token = getToken();
  const { data } = await MainApi.get(
    theme_setting,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return data;
};

export default function useGetAllThemeSetting() {
  return useQuery(["theme_setting"], () => getThemeSetting(), {
    cacheTime: 300000,
  });
}
