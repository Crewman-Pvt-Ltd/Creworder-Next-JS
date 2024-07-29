import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { get_notices } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getNotices = async () => {
  const token = getToken();
  const { data } = await MainApi.get(
    get_notices,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return data;
};

export default function useGetAllNotices() {
  return useQuery(["notices"], () => getNotices(), {
    cacheTime: 300000,
  });
}
