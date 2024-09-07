import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { holidays } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getHolidays = async (url = holidays) => {
  const token = getToken();
  const { data } = await MainApi.get(
    url,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return data;
};

export default function useGetAllHolidays(url) {
  return useQuery(["holidays", url], () => getHolidays(url), {
    cacheTime: 300000,
  });
}
