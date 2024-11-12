import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { get_dashboard_tiles } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";
const getDashboardTiles = async () => {
  const token = getToken();
  const { data } = await MainApi.get(
    get_dashboard_tiles,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return data;
};

export default function useGetAllDashboardTiles() {
  return useQuery(["get_dashboard_tiles"], () => getDashboardTiles(), {
    cacheTime: 300000,
  });
}
