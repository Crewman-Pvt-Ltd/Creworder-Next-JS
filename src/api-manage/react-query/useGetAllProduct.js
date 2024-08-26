import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { get_product } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getProduct = async () => {
  const token = getToken();
  const { data } = await MainApi.get(
    get_product,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return data;
};

export default function useGetAllProduct() {
  return useQuery(["product"], () => getProduct(), {
    cacheTime: 300000,
  });
}
