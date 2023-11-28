import { gql } from '@apollo/client';
export const SENDCODEMESSAGE = gql`
  mutation sendCodeMsg($tel:String!){
    sendCodeMessage(tel:$tel){
      code,
      message
    }
  }
`;

export const LOGIN = gql`
  mutation login($tel:String!,$code:String!){
    login(tel:$tel,code:$code){
      code,
      message,
      data
    }
  }
`;


