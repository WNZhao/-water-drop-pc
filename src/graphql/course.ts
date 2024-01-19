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

export const COMMIT_COURSE = gql`
  mutation commitCourseInfo($params: PartialCourseInput!,$courseId: String) {
    commitCourseInfo(params:$params,courseId:$courseId){
      code
      message
    }
  }
`

export const GET_COURSE_DETAIL = gql`
  query getCourseInfo($id: String!){
    getCourseInfo(id:$id){
      code
      message
      data {
        id
        createdAt
        createdBy
        updatedAt
        updatedBy
        deletedAt
        deletedBy
        name
        desc
        group
        baseAbility
        limitNumber
        duration
        reserveInfo
        refundInfo
        otherInfo
        reducibleTime {
          week
          orderTime {
            key
            startTime
            endTime
          }
        }
      }
    }
  }
`