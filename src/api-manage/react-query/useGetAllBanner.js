import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { banner_list } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";

const getBanner = async (url = banner_list) => {
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

export default function useGetAllBanner(url) {
  return useQuery(["banner_list", url], () => getBanner(url), {
    cacheTime: 300000,
  });
}
