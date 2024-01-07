import { gql } from "@apollo/client";

export const GET_ORGS = gql`
query getOrgnizations($page: PageInput!,$name:String){
  getOrgnizations(page:$page,name:$name){
    code
    message
    data {
      id
      orgName
      description,
      latitude,
      identityCardBackImg,
      identityCardFrontImg,
      orgFrontImg {
        id
        url
      }
      orgRoomImg {
        id
        url
      }
      orgOtherImg {
        id
        url
      }
    }
    page {
      total
      pageNum
      pageSize
    }
  }
}
`

export const GET_SIMPLE_ORGS = gql`
  query getOrgnizations($page: PageInput!,$name:String){
    getOrgnizations(page:$page,name:$name){
      code
      message
      data {
        id
        orgName
      }
      page {
        total
        pageNum
        pageSize
      }
    }
  }
`

export const GET_ORG_DETAIL = gql`
  query getOrgnizeInfo($id:String!) {
    getOrgnizeInfo(id:$id){
      code
      message
      data {
        id
        orgName
        logo
        address
        tel
        businessLicense
        identityCardFrontImg
        identityCardBackImg
        latitude
      longitude
      tags
      description
        orgFrontImg {
          id,
          url,
          remark
        }
        orgRoomImg {
          id
          url
          remark
        }
        orgOtherImg {
          id
          url
          remark
        }
      }
    }
  }
`

export const COMMIT_ORG = gql`
  mutation commitOrgnization($params:OrgnizationInput!,$id:String){
    commitOrgnizationInfo(params:$params,id:$id){
      code
      message
    }
  }
`;

export const DEL_ORG = gql`
  mutation deleteOrganization($id: String!) {
    deleteOrganization(id: $id) {
      code
      message
    }
  }
`;