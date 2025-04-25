import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

export async function requestHandler(options: AxiosRequestConfig) {
  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.error(error);
  }
}