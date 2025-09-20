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

`