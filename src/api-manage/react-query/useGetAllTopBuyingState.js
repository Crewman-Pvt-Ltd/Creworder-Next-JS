import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { top_buying_state } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getTopBuyingState = async (url = top_buying_state) => {
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

export default function useGetAlTopBuyingState(url) {
  return useQuery(["top_buying_state", url], () => getTopBuyingState(url), {
    cacheTime: 300000,
  });
}
