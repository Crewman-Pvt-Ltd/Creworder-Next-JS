import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { follow_up } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getFollowUP = async (url = follow_up) => {
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


export default function useGetAllFollowUP(url) {
  return useQuery(["FollowUP", url], () => getFollowUP(url), {
    cacheTime: 300000,
  });
}
