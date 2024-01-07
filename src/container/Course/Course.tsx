import { ICourse } from '@/utils/types';
import { PageContainer, ProTable } from '@ant-design/pro-components';

import { COLUMNS } from './constants';
import { useCourses } from '@/services/course';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';

/**
 *
 */
const Course = () => {
  const { data, refetch } = useCourses();

  return (
    <PageContainer header={{ title: '当前门店下开设的课程' }}>
      <ProTable<ICourse>
        rowKey="id"
        columns={COLUMNS}
        dataSource={data}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
        }}
        request={async (params: {
          name?: string;
          pageSize?: number;
          PageNum?: number;
        }) => {
          const { name } = params;
          console.log(name);
          const res = await refetch(params.PageNum, params.pageSize, name);
          return {
            data: res.data,
            success: res.success,
            total: res.page?.total,
          };
        }}
      />
    </PageContainer>
  );
};

export default Course;
