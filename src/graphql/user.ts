import { gql } from '@apollo/client';

export const GET_USER = gql`
  query {
    getUserInfo{
      id
      name
      desc
      tel
      avatar
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUserInfo($id:String!,$params:UserInput!) {
    updateUserInfo(id:$id,params:$params){
      code,
      message
    }
  }
`