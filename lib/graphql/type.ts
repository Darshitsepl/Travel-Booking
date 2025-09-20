export interface UserProfile {
  username: string;
  email: string;
  role: string;
  image:string;
  _id: string
  loginType: string;
  password: string;
}

export  interface GetUserProfileResponse {
  GetUserProfile: UserProfile;
}

export type APIResponse = {
    status: boolean
    message: string
}

export type UpdateProfileResponse ={
    updateUserProfile: APIResponse
}

export type UserUpdateProfile  ={
    email: string
    username: string
}

export type PasswordFields  = {
  password:string;
}

export type PasswordResponseFields  = {
  setPasswordForGoogleLogin:APIResponse;
}
