import {
  FolderOutlined,
  FileOutlined,
  FolderOpenOutlined,
  FolderAddOutlined,
  FileAddOutlined,
  DeleteOutlined,
  DiffOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import { AntTreeNodeProps } from 'antd/es/tree';
import style from './index.module.less';
import { useState } from 'react';
import CompanyInfoEdit from './components/CompanyDrawer';

const treeData: TreeDataNode[] = [
  // {
  //   title: 'parent 1',
  //   key: '0-0',
  //   children: [
  //     {
  //       title: 'parent 1-0',
  //       key: '0-0-0',
  //       // disabled: true,
  //       children: [
  //         {
  //           title: 'leaf001',
  //           key: '0-0-0-0',
  //           // disableCheckbox: true,
  //         },
  //         {
  //           title: 'leaf002',
  //           key: '0-0-0-1',
  //         },
  //       ],
  //     },
  //     {
  //       title: 'parent 1-1',
  //       key: '0-0-1',
  //       children: [
  //         {
  //           title: <span style={{ color: '#1677ff' }}>sss</span>,
  //           key: '0-0-1-0',
  //         },
  //       ],
  //     },
  //     {
  //       title: 'root_leaf',
  //       key: '0-2',
  //     },
  //   ],
  // },
];

/**
 * 组织架构添加删除移动
 */
const Company: React.FC = () => {
  // Drawershow
  const [drawerVisible, setDrawerVisible] = useState(false);

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  const toggleIcon = (node: AntTreeNodeProps) => {
    console.log('node', node);
    // eslint-disable-next-line no-debugger
    const {
      data: { children },
      expanded,
      pos,
    } = node;
    const isRootNode = pos === '0-0'; // 判断是否为根节点
    if (isRootNode) {
      return expanded ? (
        <FolderOpenOutlined className={style['custom-icon']} />
      ) : (
        <FolderOutlined className={style['custom-icon']} />
      );
    } else {
      return children ? (
        expanded ? (
          <FolderOpenOutlined className={style['custom-icon']} />
        ) : (
          <FolderOutlined className={style['custom-icon']} />
        )
      ) : (
        <FileOutlined className={style['custom-icon']} />
      );
    }
  };
  // 显示抽屉
  const showDrawer = () => {
    setDrawerVisible(true);
  };
  // 添加同级目录
  const handleAdd = () => {};
  // 添加子级目录
  const handleSubAdd = () => {};
  // 添加文件
  const handleFileAdd = () => {};
  // 删除
  const handleDelete = () => {};
  // 按钮
  const renderTitle = (node: AntTreeNodeProps) => {
    return (
      <div className={style['node-text-wrap']}>
        <span className="title">{node.title}</span>
        <div className="action-wrap">
          <Button
            type="text"
            icon={
              <DiffOutlined style={{ fontSize: '18px', borderRadius: '0px' }} />
            }
            onClick={handleAdd}
          />
          <Button
            type="text"
            icon={<FolderAddOutlined style={{ fontSize: '18px' }} />}
            onClick={handleSubAdd}
          />

          <Button
            type="text"
            icon={<FileAddOutlined style={{ fontSize: '18px' }} />}
            onClick={handleFileAdd}
          />
          <Button
            danger
            type="text"
            icon={<DeleteOutlined style={{ fontSize: '18px' }} />}
            onClick={handleDelete}
          />
        </div>
      </div>
    );
  };
  return (
    <PageContainer header={{ title: '部门管理页面' }}>
      {treeData.length > 0 ? (
        <Tree
          defaultExpandedKeys={['0-0-0', '0-0-1']}
          defaultSelectedKeys={['0-0-0', '0-0-1']}
          onSelect={onSelect}
          onCheck={onCheck}
          treeData={treeData}
          showIcon // 设置 showIcon 为 true
          icon={toggleIcon}
          titleRender={(data) => renderTitle(data as AntTreeNodeProps)} //使用自定义的节点渲染函数
          draggable
        />
      ) : (
        <Button type="primary" onClick={showDrawer}>
          添加根结点
        </Button>
      )}
      {drawerVisible && (
        <CompanyInfoEdit onClose={() => setDrawerVisible(false)} />
      )}
    </PageContainer>
  );
};

export default Company;
