import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { get_branches } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getBranches = async () => {
  const token = getToken();
  const { data } = await MainApi.get(
    get_branches,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return data;
};

export default function useGetAllBranches() {
  return useQuery(["branches"], () => getBranches(), {
    cacheTime: 300000,
  });
}
