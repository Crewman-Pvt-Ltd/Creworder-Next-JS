import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { get_orders } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";
const getOrders = async () => {
  const token = getToken();
  const { data } = await MainApi.get(
    get_orders,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return data;
};

export default function useGetAllOrders() {
  return useQuery(["companies"], () => getOrders(), {
    cacheTime: 300000,
  });
}
