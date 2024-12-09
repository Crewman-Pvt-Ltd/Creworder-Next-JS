import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { get_role } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getRole = async () => {
  const token = getToken();
  const { data } = await MainApi.get(
    get_role,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return data;
};

export default function useGetAllRole() {
  return useQuery(["role"], () => getRole(), {
    cacheTime: 300000,
  });
}
