import gql from "graphql-tag";

export const UpdateProfile = gql`
	mutation UpdateProfile($data: UpdateProfileResponse!) {
		updateUserProfile(data: $data) {
			status
			message
		}
	}
`;

export const updatePassword = gql`
 mutation setPasswordForGoogleLogin($data:String!) {
    setPasswordForGoogleLogin(password: $data) {
        status
        message
    }
 }
`

export const changePassword = gql`
  mutation changePassword($type: ChangePasswordFields!) {
	changePassword(data: $type) {
		status
		message
	}
  }
`

export const UPDATE_USER_ROLE = gql`
 mutation assignRoleToGuide($type: [String!]!) {
	updateUserRole(data: $type) {
		status
		message
	}
 }
`

export const REVERT_GUIDE_TO_USER = gql`
 mutation revertGuideToUserRole($type: String!) {
	revertGuideToUserRole(data: $type) {
		status
		message
	}
 }
`

