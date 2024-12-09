import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { qc } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getQC = async (url = qc) => {
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

export default function useGetAllQC(url) {
  return useQuery(["qc", url], () => getQC(url), {
    cacheTime: 300000,
  });
}
