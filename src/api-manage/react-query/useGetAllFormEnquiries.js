import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { form_enquiries } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getFormEnquiries = async () => {
  const token = getToken();
  const { data } = await MainApi.get(
    form_enquiries,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return data;
};

export default function usegetAllFormEnquires() {
  return useQuery(["form_enquiries"], () => getFormEnquiries(), {
    cacheTime: 300000,
  });
}
