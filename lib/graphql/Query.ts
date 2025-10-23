import gql from "graphql-tag";

export const GetUserProfile = gql`
	query {
		GetUserProfile {
			username
			email
			role
			password
			loginType
		}
	}
`;

export const GetGuides = gql`
	query {
		getallguides {
			username
			email
		}
	}
`;

export const getUserByRole = gql`
	query getUserByRole($role: String!) {
		getUserByRole(role: $role) {
			status
			message
			users {
				username
				_id
			}
		}
	}
`;

export const GET_ALL_GUIDES = gql`
	query gerallGuides {
		getallguides {
			status
			message
			users {
				username
				assignguideby {
					username
				}
				assignguidedate
				_id
			}
		}
	}
`;
