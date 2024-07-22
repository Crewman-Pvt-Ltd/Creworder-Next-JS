import { useMutation } from 'react-query';
import MainApi from '../MainApi'; 
import { post_packages } from '../ApiRoutes'; 
import { getToken } from "@/utils/getToken"; 

export const useCreatePackage = () => {
  return useMutation(async (payload) => {
    const token = getToken(); 
    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
  
    const { data } = await MainApi.post(post_packages, payload, config);
    return data;
  });
};
