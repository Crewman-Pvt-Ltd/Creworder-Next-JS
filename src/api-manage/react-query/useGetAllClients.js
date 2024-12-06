import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { get_clients } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getClients = async (url = get_clients) => {
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

export default function useGetAllClients(url) {
  return useQuery(["get_clients", url], () => getClients(url), {
    cacheTime: 300000,
  });
}
