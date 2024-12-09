import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { get_cloud_telephonic_channels } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getAllCloudTelephonicChannels = async (url = get_cloud_telephonic_channels) => {
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

export default function useGetAllCloudTelephonicChannels(url) {
  return useQuery(["cloudtelephonic", url], () => getAllCloudTelephonicChannels(url), {
    cacheTime: 300000,
  });
}
