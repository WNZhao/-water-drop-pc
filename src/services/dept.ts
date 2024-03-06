import { CREATE_DEPTS, DELETE_DEPTS_BYID, DEPTS_MOVE, GET_DEPTS_INFO, GET_DEPTS_ROOT_BY_ORG, GET_DEPTS_TREE, GET_FLAT_DEPTS, UPDATE_DEPTS_4ORG } from "@/graphql/dept";
import { IDepartments, PageInput, TDepartmentsQuery } from "@/utils/types";
import { useMutation, useQuery } from "@apollo/client";


export const useDeptTree = () => {

  const { data, loading, error, refetch } = useQuery(GET_DEPTS_TREE, {
    skip: true,
    variables: { departmentId: "" },
  });
  const refetchDeptTree = async (departmentId: string) => {
    const res = await refetch({
      departmentId,
    });
    if (res.error) {
      return {
        success: false,
        data: [],
      };
    }
    return {
      data: res.data?.getDepartmentsTree4Org.data,
      success: true,
    };
  }
  return { data, loading, error, refetch: refetchDeptTree };
}

export const useDeptRootByOrz = () => {
  const { data, loading, error, refetch } = useQuery(GET_DEPTS_ROOT_BY_ORG, {
    skip: true,
    variables: { orz_id: "" },
  });
  const refetchDeptRootByOrz = async (orz_id: string) => {
    const res = await refetch({
      orz_id,
    });
    if (res.error) {
      return {
        success: false,
        data: [],
        total: 0,
      };
    }
    return {
      data: res.data?.getRootDepartmentByBizId.data,
      success: true,
      total: res.data?.getRootDepartmentByBizId.page?.total,
    };
  }
  return { data, loading, error, refetch: refetchDeptRootByOrz };
}
export const useDeptFlat = () => {
  const { data, loading, error, refetch } = useQuery(GET_FLAT_DEPTS, {
    skip: true,
    variables: { orz_id: "", page: { pageNum: 1, pageSize: 1000 } },
  });
  const refetchDeptFlat = async (orz_id: string, page: PageInput) => {
    const res = await refetch({
      orz_id,
      page,
    });
    if (res.error) {
      return {
        success: false,
        data: [],
        total: 0,
      };
    }
    return {
      data: res.data?.getFlatternDepartmentsByBizId.data,
      success: true,
      total: res.data?.getFlatternDepartmentsByBizId.page.total,
    };
  }
  return { data, loading, error, refetch: refetchDeptFlat };
}

export const useCreateDept = () => {

  const [createDept, { loading }] = useMutation(CREATE_DEPTS);
  const creatDeptHandler = async (params: any) => {
    const { variables: departmentData } = params;
    console.log('departmentData', departmentData);
    const res = await createDept({
      variables: {
        departmentData,
      },
    });

    if (res.data.createDepartment4Org.code === 200) {
      return res.data.createDepartment4Org.data;
    }
    return null;
  }

  return { createDept: creatDeptHandler, loading };
}


// 删除部门通过id
export const useDeleteDept = () => {
  const [deleteDept, { loading }] = useMutation(DELETE_DEPTS_BYID);
  const deleteDeptHandler = async (params: any) => {
    const { variables: id } = params;
    console.log('id', id);
    const res = await deleteDept({
      variables: {
        id,
      },
    });
    if (res.data.deleteDepartment4Org.code === 200) {
      return res.data.deleteDepartment4Org.data;
    }

    return false;
  }

  return { deleteDept: deleteDeptHandler, loading };
}

export const useDeptInfo = () => {

  const { refetch, loading } = useQuery<TDepartmentsQuery>(GET_DEPTS_INFO, {
    skip: true,
    variables: { id: "" },
  });

  const refetchDeptInfo = async (id: string) => {
    const res = await refetch({
      id,
    });
    if (res.error) {
      return {
        success: false,
        data: null,
      };
    }
    return {
      data: res.data?.getDepartmentById4Org.data,
      success: true,
    };
  }

  return { refetch: refetchDeptInfo, loading };
}

export const useUpdateDept = () => {
  const [updateDept, { loading }] = useMutation<TDepartmentsQuery, { id: string, departmentData: IDepartments }>(UPDATE_DEPTS_4ORG);
  const updateDeptHandler = async (params: any) => {
    const { variables: { id, departmentData } } = params;
    const res = await updateDept({
      variables: {
        id,
        departmentData,
      },
    });
    if (res.data?.updateDepartment4Org.code === 200) {
      return res.data.updateDepartment4Org.data;
    }
  }
  return { loading, updateDept: updateDeptHandler };
}

export const useMoveDepts = () => {
  const [moveDepts, { loading }] = useMutation<TDepartmentsQuery>(DEPTS_MOVE);
  const moveDeptsHandler = async (params: any) => {
    const { variables: { dragId: id, dropId: parentId } } = params;
    const res = await moveDepts({
      variables: {
        id,
        parentId,
      },
    });
    if (res.data?.moveDepartment4Org.code === 200) {
      return res.data.moveDepartment4Org.data;
    }
  }
  return { loading, moveDepts: moveDeptsHandler };
}