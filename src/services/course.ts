import { GET_COURSES } from "@/graphql/course"
import { DEFAULT_PAGE_SIZE } from "@/utils/constants"
import { TCoursesQuery } from "@/utils/types"
import { useQuery } from "@apollo/client"

export const useCourses = (pageNum = 1, pageSize = DEFAULT_PAGE_SIZE) => {
  const { loading, data, refetch } = useQuery<TCoursesQuery>(GET_COURSES, {
    skip: true, // 进这个页面触发两次
    variables: {
      page: {
        pageNum,
        pageSize
      }
    }
  })
  const refetchHandler = async (pn = 1, ps = DEFAULT_PAGE_SIZE, name = '') => {
    const res = await refetch({
      page: {
        pageNum: pn,
        pageSize: ps
      },
      name
    })

    if (res.error) {
      return {
        success: false,
        data: [],
        total: 0,
      }
    }

    return {
      data: res.data?.getCourses.data,
      success: true,
      total: res.data?.getCourses.page.total
    }
  }
  return {
    loading,
    page: data?.getCourses.page,
    data: data?.getCourses.data,
    refetch: refetchHandler
  }
}