import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { get_teamleads } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getAllAssignRole = async (url = get_teamleads) => {
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

export default function useGetAllAssignRole(url) {
  return useQuery(["getteamleads", url], () => getAllAssignRole(url), {
    cacheTime: 300000,
  });
}
