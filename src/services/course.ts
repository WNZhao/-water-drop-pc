import { COMMIT_COURSE, GET_COURSES, GET_COURSE_DETAIL } from "@/graphql/course"
import { DEFAULT_PAGE_SIZE } from "@/utils/constants"
import { TBaseCourse, TCourseQuery, TCoursesQuery } from "@/utils/types"
import { useMutation, useQuery } from "@apollo/client"
import { message } from "antd"

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

// eslint-disable-next-line @typescript-eslint/ban-types
export const useCourseEditInfo = (): [handleEdit: Function, loading: boolean] => {
  const [edit, { loading }] = useMutation(COMMIT_COURSE);

  const handleEdit = async (courseId: string, params: TBaseCourse, callback = () => { }) => {
    const res = await edit({
      variables: {
        courseId,
        params,
      },
    });
    if (res.data.commitCourseInfo.code === 200) {
      message.success(res.data.commitCourseInfo.message);
      callback()
      return;
    }
    message.error(res.data.commitCourseInfo.message);
  };

  return [handleEdit, loading];
};

export const useCourse = (id = "") => {
  const { loading, data, refetch } = useQuery<TCourseQuery>(GET_COURSE_DETAIL, {
    variables: {
      id
    },
    skip: true
  })
  // const [getcourse, { data, loading }] = useLazyQuery(GET_COURSE_DETAIL, { variables: { id } });
  //如果不使用skip:true 可以使用 useLazyQuery 将 getcourse 导出 这样就可以复用data了
  return {
    loading,
    data: data?.getCourseInfo.data,
    refetch
  }
}