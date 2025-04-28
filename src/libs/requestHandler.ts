import type { AxiosRequestConfig } from 'axios';
import axios, { isAxiosError } from 'axios';
import { toast } from 'material-react-toastify';


export async function requestHandler(options: AxiosRequestConfig) {
  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error: unknown) {
    let errorMessage = 'A system error has occurred. Please try again later.';

    if (isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    toast.error(errorMessage);
    throw error;
  }
}