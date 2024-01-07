import { gql } from "@apollo/client"

export const GET_COURSES = gql`
query getCourses($page: PageInput!,$name: String) {
  getCourses(page:$page,name:$name){
    code
    message
    data {
      id
      name
      group
      baseAbility
      limitNumber
      duration
      reserveInfo
      refundInfo
      otherInfo
      desc
    }
    page {
      pageNum
      pageSize
      total
    }
  }
}
`