import { gql } from "graphql-request";

export const GET_USER = gql`
query GetUser($id : String!) {
    getZellerCustomer(id:$id){
    id
    name
    email
    role
    }
}
`;

export const LIST_USERS = gql`
query ListUsers($limit: Int, $nextToken: String) {
    listZellerCustomers(limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        role
      }
      nextToken
    }
  }
`;
