import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { user_target } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getAllUserTargets = async (url = user_target) => {
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

export default function useGetAllUserTargets(url) {
  return useQuery(["usertargets", url], () => getAllUserTargets(url), {
    cacheTime: 300000,
  });
}
