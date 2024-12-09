import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { order_status } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getAllOrderStatus = async (url = order_status) => {
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

export default function useGetAllOrderStatus(url) {
  return useQuery(["usertargets", url], () => getAllOrderStatus(url), {
    cacheTime: 300000,
  });
}
