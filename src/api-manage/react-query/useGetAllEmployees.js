import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { users } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getUsers = async () => {
  const token = getToken();
  const { data } = await MainApi.get(
    users,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return data;
};

export default function useGetAllEmployees() {
  return useQuery(["employees"], () => getUsers(), {
    cacheTime: 300000,
  });
}