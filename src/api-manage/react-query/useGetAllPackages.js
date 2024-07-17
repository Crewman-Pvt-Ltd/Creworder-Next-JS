import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { get_packages } from "../ApiRoutes";


const getPackages = async () => {
  const { data } = await MainApi.get(get_packages);
  return data;
};

export default function useGetAllPackages() {
  return useQuery(["packages"], () => getPackages(), {
    cacheTime: 300000,
  });
}
