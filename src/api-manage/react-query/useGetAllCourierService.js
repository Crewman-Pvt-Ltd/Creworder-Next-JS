import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { courier_service } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getCourierService = async (url = courier_service) => {
  const token = getToken();

  const { data } = await MainApi.get(
    url,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );  console.log("getCourierService", getCourierService);
  return data;
  
};

export default function useGetAllCourierService(url) {
  return useQuery(["courier_service", url], () => getCourierService(url), {
    cacheTime: 300000,
  });
}
