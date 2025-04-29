import type { AxiosRequestConfig } from 'axios';
import axios, { isAxiosError } from 'axios';
import { toast } from 'material-react-toastify';


/**
 * API 請求處理函式，若有錯誤會顯示 toast 訊息
 * @function requestHandler
 * @param {AxiosRequestConfig} options
 */
export async function requestHandler(options: AxiosRequestConfig) {
  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error: unknown) {
    // 預設錯誤
    let errorMessage = 'A system error has occurred. Please try again later.';

    // axios 錯誤
    if (isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    }
    // 一般錯誤
    else if (error instanceof Error) {
      errorMessage = error.message;
    }

    // 吐司訊息
    toast.error(errorMessage);
    throw error;
  }
}