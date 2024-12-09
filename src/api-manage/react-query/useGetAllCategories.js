import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { get_category } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getCategory = async () => {
  const token = getToken();
  const { data } = await MainApi.get(
    get_category,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return data;
};

export default function useGetAllCategories() {
  return useQuery(["category"], () => getCategory(), {
    cacheTime: 300000,
  });
}
