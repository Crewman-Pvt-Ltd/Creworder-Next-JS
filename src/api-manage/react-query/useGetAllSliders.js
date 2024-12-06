import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { get_sliders } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getSliders = async (url = get_sliders) => {
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

export default function useGetAllSliders(url) {
  return useQuery(["get_sliders", url], () => getSliders(url), {
    cacheTime: 300000,
  });
}
