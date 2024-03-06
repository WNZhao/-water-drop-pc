import { ICourse } from '@/utils/types';
import {
  ActionType,
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';

import { getColumns } from './constants';
import { useCourses } from '@/services/course';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import EditCourse from './compoents/EditCourse';
import OrderTime from './compoents/OrderTime';

/**
 *
 */
const Product = () => {
  console.log('product');
  const [curId, setCurId] = useState('');
  const actionRef = useRef<ActionType>();
  const { refetch } = useCourses();

  const [showInfo, setShowInfo] = useState(false);
  const [showOrderTime, setShowOrderTime] = useState(false);

  const onClickAddHandler = (id = '') => {
    if (id) {
      setCurId(id);
    } else {
      setCurId('');
    }
    setShowInfo(true);
  };

  const onCloseDrawer = (isReload?: boolean) => {
    setShowInfo(false);
    if (isReload) {
      actionRef.current?.reload?.();
    }
  };

  const onOrderTimeHandler = (id: string) => {
    setCurId(id);
    setShowOrderTime(true);
  };

  return (
    <PageContainer header={{ title: '当前门店下开设的课程' }}>
      <ProTable<ICourse>
        actionRef={actionRef}
        rowKey="id"
        columns={getColumns({
          onEditHandler: onClickAddHandler,
          onOrderTimeHandler: onOrderTimeHandler,
        })}
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
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => onClickAddHandler('')}
          >
            新建
          </Button>,
        ]}
      />
      {showInfo && <EditCourse onClose={onCloseDrawer} id={curId} />}
      {showOrderTime && (
        <OrderTime open onClose={() => setShowOrderTime(false)} id={curId} />
      )}
    </PageContainer>
  );
};

export default Product;
