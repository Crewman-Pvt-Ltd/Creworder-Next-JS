import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { departments } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getDepartments = async (url = departments) => {
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

export default function useGetAllDepartments(url) {
  return useQuery(["departments", url], () => getDepartments(url), {
    cacheTime: 300000,
  });
}
