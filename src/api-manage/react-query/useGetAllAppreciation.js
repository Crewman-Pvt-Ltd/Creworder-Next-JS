import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { appreciations } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getAppreciations = async (url = appreciations) => {
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

export default function useGetAllAppreciations(url) {
  return useQuery(["appreciations", url], () => getAppreciations(url), {
    cacheTime: 300000,
  });
}
