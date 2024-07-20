import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { get_companies } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getCompanies = async () => {
  const token = getToken();
  const { data } = await MainApi.get(
    get_companies,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return data;
};

export default function useGetAllCompanies() {
  return useQuery(["companies"], () => getCompanies(), {
    cacheTime: 300000,
  });
}
