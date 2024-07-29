import { useMutation } from 'react-query';
import MainApi from '../MainApi'; 
import { get_packages } from '../ApiRoutes'; 
import { getToken } from "@/utils/getToken"; 

export const useCreatePackage = () => {
  return useMutation(async (payload) => {
    const token = getToken(); 
    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
  
    const { data } = await MainApi.post(get_packages, payload, config);
    return data;
  });
};
