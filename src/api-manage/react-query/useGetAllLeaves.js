import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { leaves } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getLeaves = async (url = leaves) => {
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

export default function useGetAllLeaves(url) {
  return useQuery(["leaves", url], () => getLeaves(url), {
    cacheTime: 300000,
  });
}
