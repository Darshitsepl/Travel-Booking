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