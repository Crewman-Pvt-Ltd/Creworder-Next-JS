import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { shifts } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getShifts = async (url = shifts) => {
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

export default function useGetAllShifts(url) {
  return useQuery(["shifts", url], () => getShifts(url), {
    cacheTime: 300000,
  });
}
