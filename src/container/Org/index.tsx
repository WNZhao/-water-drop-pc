import { PageContainer, ProList } from '@ant-design/pro-components';
import { useState } from 'react';
import { Button, Popconfirm, Tag } from 'antd';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { useOrgnizations } from '@/services/org';
import EditOrg from './components';

import style from './index.module.less';

const OrgPage = () => {
  const { loading, data, page, refetch } = useOrgnizations();
  // const [delHandler, delLoading] = useDeleteOrg();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showEdit, setShowEdit] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [curId, setCurId] = useState('');

  const editInfoHandler = (id: string) => {
    setCurId(id);
    setShowEdit(true);
  };

  const delInfoHandler = async (id: string) => {
    console.log('id', id);
    // delHandler(id, refetch);
  };

  const addInfoHandler = () => {
    setCurId('');
    setShowEdit(true);
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onCloseHandler = () => {
    setShowEdit(false);
    refetch();
  };

  const onPageChangeHandler = (pageNum: number, pageSize: number) => {
    refetch({
      page: {
        pageNum,
        pageSize,
      },
    });
  };

  const dataSource = data?.map((item) => ({
    ...item,
    key: item.id,
    subTitle: (
      <div>
        {item.tags?.split(',').map((tag) => (
          <Tag key={tag} color="#5BD8A6">
            {tag}
          </Tag>
        ))}
      </div>
    ),
    actions: [
      <Button type="link" onClick={() => editInfoHandler(item.id)}>
        编辑
      </Button>,
      <Popconfirm
        title="提醒"
        okButtonProps={{
          loading: false,
        }}
        description={`确定要删除 ${item.name} 吗？`}
        onConfirm={() => delInfoHandler(item.id)}
      >
        <Button type="link">删除</Button>
      </Popconfirm>,
    ],
    content: item.address,
  }));

  return (
    <div className={style.container}>
      <PageContainer
        loading={loading}
        header={{
          title: '门店管理',
        }}
        extra={[
          <Button key="1" type="primary" onClick={addInfoHandler}>
            新增门店
          </Button>,
        ]}
      >
        <ProList<any>
          pagination={{
            defaultPageSize: DEFAULT_PAGE_SIZE,
            showSizeChanger: false,
            total: page?.total,
            onChange: onPageChangeHandler,
          }}
          grid={{ gutter: 10, column: 2 }}
          showActions="always"
          rowSelection={false}
          metas={{
            title: {
              dataIndex: 'name',
            },
            subTitle: {},
            type: {},
            avatar: {
              dataIndex: 'logo',
            },
            content: {
              dataIndex: 'address',
            },
            actions: {
              cardActionProps: 'extra',
            },
          }}
          dataSource={dataSource}
        />
        {showEdit && <EditOrg id={curId} onClose={onCloseHandler} />}
      </PageContainer>
    </div>
  );
};

export default OrgPage;
