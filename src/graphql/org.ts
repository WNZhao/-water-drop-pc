import { gql } from "@apollo/client";

export const GET_ORGS = gql`
query getOrgnazitions($page: PageInput!){
  getOrgnazitions(page:$page){
    code
    message
    data {
      id
      orgName
      logo
      address
      tel
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