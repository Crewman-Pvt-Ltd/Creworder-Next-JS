import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { ip } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getIP = async (url = ip) => {
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

export default function useGetAllIP(url) {
  return useQuery(["ip", url], () => getIP(url), {
    cacheTime: 300000,
  });
}
