import { gql, GraphQLClient } from 'graphql-request'
const TAG = "Network :";


const endpoint = 'http://10.0.2.2:9002/graphql'
const client = new GraphQLClient(endpoint)
export default client;
// await client.request(document)