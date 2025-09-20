import gql from "graphql-tag";

export const UpdateProfile = gql`
	mutation UpdateProfile($data: UpdateProfileResponse!) {
		updateUserProfile(data: $data) {
			status
			message
		}
	}
`;
