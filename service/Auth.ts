import { AxiosError, AxiosResponse } from "axios";
import { endPoints } from "./endPoints";
import APIClient from "./interceptor"

export type LoginWithGoogleFields = {
    username: string;
    email: string;
    loginType?: string;
    token?: string
    expires_at?: number;
    password?: string;
    image?: string | null;
    role?: string;
}
export const loginWithGoogle = async (data: LoginWithGoogleFields) => {
    try {
        const response = await APIClient.post(endPoints.loginWithGoogle, data);
    } catch (error) {
        return error
    }
}


export const register = async (
  data: LoginWithGoogleFields
): Promise<AxiosResponse<any, any>> => {
  try {
    const response = await APIClient.post(endPoints.regiser, data)
    return response
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error
    }
    throw new Error("Unexpected error occurred")
  }
}


export async function handleApi<T>(
  fn: () => Promise<AxiosResponse<T>>
): Promise<{ data?: T; error?: string }> {
  try {
    const res = await fn()
    return { data: res.data }
  } catch (err) {
    if (err instanceof AxiosError) {
      return { error: err.response?.data?.error || err.message }
    }
    if (err instanceof Error) {
      return { error: err.message }
    }
    return { error: "Something went wrong" }
  }
}

