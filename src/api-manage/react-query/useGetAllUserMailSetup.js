import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { user_mail_setup } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getAllUserMailSetup = async (url = user_mail_setup) => {
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

export default function useGetAllUserMailSetup(url) {
  return useQuery(["usermailsetup", url], () => getAllUserMailSetup(url), {
    cacheTime: 300000,
  });
}
