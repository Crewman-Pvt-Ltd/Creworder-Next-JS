import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { designations } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getDesignations = async (url = designations) => {
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

export default function useGetAllDesignations(url) {
  return useQuery(["designations", url], () => getDesignations(url), {
    cacheTime: 300000,
  });
}
