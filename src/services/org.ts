import { COMMIT_ORG, DEL_ORG, GET_ORGS, GET_ORG_DETAIL, GET_SIMPLE_ORGS } from "@/graphql/org"
import { DEFAULT_PAGE_SIZE } from "@/utils/constants"
import { TBaseOrganization, TOrgQuery, TOrgsQuery } from "@/utils/types"
import { useMutation, useQuery } from "@apollo/client"
import { message } from 'antd';


export const useOrgnizations = (pageNum = 1, pageSize = DEFAULT_PAGE_SIZE, isSimple = false) => {
  const { loading, data, refetch } = useQuery<TOrgsQuery>(isSimple ? GET_SIMPLE_ORGS : GET_ORGS, {
    variables: {
      page: {
        pageNum,
        pageSize
      }
    }
  })
  return {
    loading,
    page: data?.getOrgnazitions.page,
    data: data?.getOrgnazitions.data,
    refetch

  }
}

export const useOrgnization = (id: string) => {
  const { loading, data, refetch } = useQuery<TOrgQuery>(GET_ORG_DETAIL, {
    variables: {
      id
    }
  })
  return {
    loading,
    data: data?.getOrgnizeInfo.data,
    refetch
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const useEditInfo = (): [handleEdit: Function, loading: boolean] => {
  const [edit, { loading }] = useMutation(COMMIT_ORG);

  const handleEdit = async (id: string, params: TBaseOrganization) => {
    const res = await edit({
      variables: {
        id,
        params,
      },
    });
    message.info(res.data.commitOrgnizationInfo.message);
  };

  return [handleEdit, loading];
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const useDeleteOrg = (): [handleEdit: Function, loading: boolean] => {
  const [del, { loading }] = useMutation(DEL_ORG);

  const delHandler = async (id: number, callback: () => void) => {
    const res = await del({
      variables: {
        id,
      },
    });
    if (res.data.deleteOrganization.code === 200) {
      message.success(res.data.deleteOrganization.message);
      callback();
      return;
    }
    message.error(res.data.deleteOrganization.message);
  };

  return [delHandler, loading];
};