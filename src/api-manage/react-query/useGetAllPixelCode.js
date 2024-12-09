import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { pixel_code } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getPixelCode = async (url = pixel_code) => {
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

export default function useGetAllPixelCode(url) {
  return useQuery(["pixel_code", url], () => getPixelCode(url), {
    cacheTime: 300000,
  });
}
