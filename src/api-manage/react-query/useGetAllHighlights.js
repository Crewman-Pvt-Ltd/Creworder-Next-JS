import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { get_highlights } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";
const getHighlights = async (url = get_highlights) => {
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

export default function useGetAllHighlights(url) {
  return useQuery(["get_highlights", url], () => getHighlights(url), {
    cacheTime: 300000,
  });
}
