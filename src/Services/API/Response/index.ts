import { AxiosError, AxiosResponse } from "axios";

export const handleResponse = (response: any) => {
  console.log(response);
  // if (response.data.errors) {
  //   console.log(response.data.errors);
  //   // return new Error(response.response.data.errors);
  // }
  if (response.data) {
    if (response.data.result) {
      return response.data.result;
    }
    return response.data;
  }
  return new Error("server error");

  return response;
};

export function handleError(error: AxiosError) {
  console.log(error);
  return new Error("Server Error");
}
