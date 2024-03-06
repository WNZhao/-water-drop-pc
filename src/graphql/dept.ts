import { gql } from "@apollo/client";

export const GET_DEPTS_TREE = gql`
  query getDepartmentsTree4Org($departmentId: String!){
    getDepartmentsTree4Org(departmentId:$departmentId){
      data
      message
      code
    }
  }
`
export const GET_FLAT_DEPTS = gql`
  query getFlatternDepartmentsByBizId($orz_id: String!,$page: PageInput!){
    getFlatternDepartmentsByBizId(orz_id:$orz_id,page:$page){
      message,
      code,
      data{
        id
        name
        path
        depth
        parentId
      },
      page{
        total
      }
    }
  }
`
export const GET_DEPTS_ROOT_BY_ORG = gql`
  query getRootDepartmentByBizId($orz_id: String!){
    getRootDepartmentByBizId(orz_id:$orz_id){
      message,
      data{
        id
        name
        path
        depth
        parentId
        description
      },
      page{
        total
      }
    }
  }
`

export const CREATE_DEPTS = gql`
  mutation createDepartment4Org($departmentData: DepartmentsInput!){
    createDepartment4Org(departmentData:$departmentData){
      message
      code,
      data {
        id
        parentId
        name
        description
        depth
        path
        isLeaf
        relateBizIds
      }
    }
  }
`
export const GET_DEPTS_INFO = gql`
  query getDepartmentById4Org($id: String!){
    getDepartmentById4Org(id:$id){
      data{
        id
        name
        path
        depth
        description
        isLeaf
      }
      code
      message
    }
  }
`

export const UPDATE_DEPTS_4ORG = gql`
  mutation updateDepartment4Org($id:String!,$departmentData: DepartmentsInput!){
    updateDepartment4Org(id:$id,departmentData:$departmentData){
      message
      code
      data {
        id
        parentId
        name
        description
        depth
        path
      }
    }
  }
`

export const DELETE_DEPTS_BYID = gql`
  mutation deleteDepartment4Org($id: String!){
    deleteDepartment4Org(id:$id){
      message
      data
      code
    }
  }
`

export const DEPTS_MOVE = gql`
  mutation moveDepartment4Org($id: String!,$parentId: String!){
    moveDepartment4Org(id:$id,parentId:$parentId){
      message
      code
      data{
        parentId
        name
        path
      }
    }
  }
`