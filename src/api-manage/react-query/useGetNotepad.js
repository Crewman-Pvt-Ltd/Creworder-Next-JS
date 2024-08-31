import MainApi from "../MainApi";
import { useQuery } from "react-query";
import { get_notepad } from "../ApiRoutes";
import { getToken } from "@/utils/getToken";


const getNotepad = async (authId) => {
  const token = getToken();
  const { data } = await MainApi.get(`${get_notepad}${authId}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return data;
};

export default function useGetNotepad(id) {
  return useQuery(["notepad"], () => getNotepad(id), {
    cacheTime: 300000,
  });
}
