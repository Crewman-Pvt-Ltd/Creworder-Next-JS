import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { get_features_product } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getFeaturesProducts = async (url = get_features_product) => {
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

export default function useGetAllFeaturesProduct(url) {
  return useQuery(["get_features_product", url], () => getFeaturesProducts(url), {
    cacheTime: 300000,
  });
}
