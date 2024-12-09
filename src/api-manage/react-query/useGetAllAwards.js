import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { awards } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getAwards = async (url = awards) => {
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

export default function useGetAllAwards(url) {
  return useQuery(["awards", url], () => getAwards(url), {
    cacheTime: 300000,
  });
}
