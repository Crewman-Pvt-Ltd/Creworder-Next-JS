import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { support_tickets } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getSupportTickets = async () => {
  const token = getToken();
  const { data } = await MainApi.get(
    support_tickets,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return data;
};

export default function usegetAllSupportTickets() {
  return useQuery(["support_tickets"], () => getSupportTickets(), {
    cacheTime: 300000,
  });
}
