import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { get_packages } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getPackages = async (url = get_packages) => {
  const token = getToken();
  const { data } = await MainApi.get(url, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return data;
};


export default function useGetAllPackages(url) {
  return useQuery(["packages", url], () => getPackages(url), {
    cacheTime: 300000,
  });
}
