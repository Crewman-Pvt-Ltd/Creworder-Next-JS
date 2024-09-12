import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { submenu } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getSubmenu = async (url = submenu) => {
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

export default function useGetAllSubmenu(url) {
  return useQuery(["submenu", url], () => getSubmenu(url), {
    cacheTime: 300000,
  });
}
