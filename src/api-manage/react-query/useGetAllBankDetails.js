import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { admin_bank_details } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getAllBankDetails = async (url = admin_bank_details) => {
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

export default function useGetAllBankDetails(url) {
  return useQuery(["bankdetails", url], () => getAllBankDetails(url), {
    cacheTime: 300000,
  });
}
