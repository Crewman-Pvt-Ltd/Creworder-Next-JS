import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { get_companies } from "../ApiRoutes";


const getCompanies = async () => {
  const { data } = await MainApi.get(get_companies);
  return data;
};

export default function useGetAllCompanies() {
  return useQuery(["companies"], () => getCompanies(), {
    cacheTime: 300000,
  });
}
