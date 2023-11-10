import { gql } from '@apollo/client';
export const SENDCODEMESSAGE = gql`
  mutation sendCodeMsg($tel:String!){
    sendCodeMessage(tel:$tel)
  }
`;

export const LOGIN = gql`
  mutation login($tel:String!,$code:String!){
    login(tel:$tel,code:$code)
  }
`;
