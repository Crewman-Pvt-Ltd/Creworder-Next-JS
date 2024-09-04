import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { get_companies } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getCompanies = async (url = get_companies) => {
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

export default function useGetAllCompanies(url) {
  return useQuery(["companies", url], () => getCompanies(url), {
    cacheTime: 300000,
  });
}
