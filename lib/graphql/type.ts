export interface UserProfile {
  username: string;
  email: string;
  password: string
  role: string;
  image: string;
  _id: string
  loginType: string;
  assignguidedate: string
	assignguideby: UserProfile
}

export interface GetUserProfileResponse {
  GetUserProfile: UserProfile;
}

export type APIResponse = {
  status: boolean
  message: string
}

export type UpdateProfileResponse = {
  updateUserProfile: APIResponse
}

export type UserUpdateProfile = {
  email: string
  username: string
}



export type PasswordFields = {
  password: string;
}

export type PasswordResponseFields = {
  setPasswordForGoogleLogin: APIResponse;
}

export type ChangePasswordFields = {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  changePassword: APIResponse;
}

export interface GetUserByRoleResponse {
  getUserByRole: {
    status: boolean
    message: string
    users: UserProfile[]
  }
}

export interface UpdateUserRoleResponse {
  updateUserRole: APIResponse;
}

export type GetGuidesResponse = {
	status:boolean
	message: string
	users:UserProfile[]
}

export type Getallguides = {
	getallguides: GetGuidesResponse
}

export interface RevertGuideToUserRoleResponse {
  revertGuideToUserRole: APIResponse;
}