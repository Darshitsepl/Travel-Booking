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
        console.log(data,'data')
        const response = await APIClient.post(endPoints.loginWithGoogle, data);
        console.log(response, 'response')
    } catch (error) {
        return error
    }
}