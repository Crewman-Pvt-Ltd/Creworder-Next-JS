import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { get_modules } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getModules = async () => {
  const token = getToken();
  const { data } = await MainApi.get(
    get_modules,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return data;
};

export default function useGetAllModues() {
  return useQuery(["modules"], () => getModules(), {
    cacheTime: 300000,
  });
}
