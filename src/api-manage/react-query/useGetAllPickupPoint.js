import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { pickup_point } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getPickupPoint = async () => {
  const token = getToken();
  const { data } = await MainApi.get(
    pickup_point,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return data;
};

export default function useGetAllPickupPoint() {
  return useQuery(["pickup_point"], () => getPickupPoint(), {
    cacheTime: 300000,
  });
}
