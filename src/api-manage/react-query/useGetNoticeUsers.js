import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { get_notice_users } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getUsers = async () => {
  const token = getToken();
  const { data } = await MainApi.get(
    get_notice_users,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return data;
};

export default function useGetNoticeUers() {
  return useQuery(["noticeusers"], () => getUsers(), {
    cacheTime: 300000,
  });
}
