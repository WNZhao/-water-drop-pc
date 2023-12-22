import { gql } from "@apollo/client";

export const GET_OSS_INFO = gql`
  query getOSSInfo{
    getOSSInfo{
      expire
      accessid
      policy
      signature
      host
      dir
    }
  }
`;