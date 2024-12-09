import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { menu } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getMenu = async (url = menu) => {
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

export default function useGetAllMenu(url) {
  return useQuery(["menu", url], () => getMenu(url), {
    cacheTime: 300000,
  });
}
