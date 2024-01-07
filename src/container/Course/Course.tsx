import { ICourse } from '@/utils/types';
import { PageContainer, ProTable } from '@ant-design/pro-components';

import { COLUMNS } from './constants';
import { useCourses } from '@/services/course';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';

/**
 *
 */
const Course = () => {
  const { refetch } = useCourses();

  return (
    <PageContainer header={{ title: '当前门店下开设的课程' }}>
      <ProTable<ICourse>
        rowKey="id"
        columns={COLUMNS}
        // dataSource={data}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
        }}
        request={async (params: {
          name?: string;
          pageSize?: number;
          PageNum?: number;
        }) => {
          return await refetch(params.PageNum, params.pageSize, params.name);
        }}
      />
    </PageContainer>
  );
};

export default Course;
