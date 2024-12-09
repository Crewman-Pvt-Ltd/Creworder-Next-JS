import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { get_testimonials } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";
const getTestimonials = async (url = get_testimonials) => {
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

export default function useGetAllTestimonials(url) {
  return useQuery(["get_testimonials", url], () => getTestimonials(url), {
    cacheTime: 300000,
  });
}
