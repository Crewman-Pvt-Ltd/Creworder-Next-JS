import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { get_packages } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";

const getPackages = async () => {
  const token = getToken();
  const { data } = await MainApi.get(
    get_packages,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return data;
};

export default function useGetAllPackages() {
  return useQuery(["packages"], () => getPackages(), {
    cacheTime: 300000,
  });
}
