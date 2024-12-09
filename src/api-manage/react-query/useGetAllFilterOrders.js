import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { get_filter_orders } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";

const getAllOrderFilters = async (url = get_filter_orders) => {
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

export default function useGetAllOrdersFilters(url) {
  return useQuery(["orderFilters", url], () => getAllOrderFilters(url), {
    cacheTime: 300000,
  });
}
