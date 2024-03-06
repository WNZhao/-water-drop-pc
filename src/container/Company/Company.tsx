import {
  FolderOutlined,
  FileOutlined,
  FolderOpenOutlined,
  FolderAddOutlined,
  FileAddOutlined,
  DeleteOutlined,
  DiffOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Popconfirm, Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import { AntTreeNodeProps, EventDataNode } from 'antd/es/tree';
import style from './index.module.less';
import { useEffect, useState } from 'react';
import CompanyInfoEdit from './components/CompanyDrawer';
import {
  useDeleteDept,
  useDeptRootByOrz,
  useDeptTree,
  useMoveDepts,
} from '@/services/dept';
import { useUserContenxt } from '@/hooks/userHooks';
import { DepartmentsTree } from '@/utils/types';
import _ from 'lodash';
import useAntdMessage from '@/components/AntdMessage';

// const treeData: TreeDataNode[] = [];

/**
 * 组织架构添加删除移动
 */
const Company: React.FC = () => {
  // Drawershow
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isEmptyDept, setIsEmptyDept] = useState(false);
  const [currentPid, setCurrentPid] = useState(null);
  const [currentId, setCurrentId] = useState();
  const [currentRootId, setCurrentRootId] = useState(null);
  const [treeData, setTreeData] = useState<DepartmentsTree[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [isLeaf, setIsLeaf] = useState<boolean>(false);
  const [currentExpandKeys, setCurrentExpandKeys] = useState<string[]>([]);
  const { success, warning } = useAntdMessage();

  const { refetch } = useDeptRootByOrz(); // 获取指定组织架构的根节点
  const { refetch: fetchOrgTree } = useDeptTree(); // 获取组织架构树
  const { deleteDept } = useDeleteDept();
  const { moveDepts } = useMoveDepts();

  const { store } = useUserContenxt();

  const getFattData = async () => {
    if (!store.orgId) return;
    const { data } = await refetch(store.orgId);
    setIsEmptyDept(data.length === 0);
    if (data.length > 0) {
      // 有数据
      // console.log('data', data[0].id);
      setCurrentRootId(data[0].id);
      getTreeData(data[0].id);
    }
    return data;
  };

  const getTreeData = async (org_id: string) => {
    const res = await fetchOrgTree(org_id);
    const treeData = JSON.parse(res.data);
    setTreeData([treeData]);
    console.log('currentRootId', treeData.id);

    setCurrentExpandKeys(_.uniq([treeData.id, ...currentExpandKeys]));
  };

  useEffect(() => {
    if (store.orgId) {
      console.log('useEffect called with org_id:', store.orgId);
      // 获取组织架构数据
      getFattData();
    }
  }, [store.orgId]);

  //
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    const { node, selected } = info;
    console.log('selectedKeys', selectedKeys);
    setSelectedKeys(selectedKeys);
    if (selected) {
      setCurrentExpandKeys(_.uniq([...currentExpandKeys, node.key as string]));
    } else {
      setCurrentExpandKeys(_.without(currentExpandKeys, node.key as string));
    }
  };

  // 处理展开收起
  const handleExpand = (
    expandedKeys: React.Key[],
    { expanded, node }: { expanded: boolean; node: EventDataNode<any> }
  ) => {
    // console.log('expandedKeys', expandedKeys);
    // console.log('expanded', expanded);
    // console.log('node', node);
    // setExp;
    if (_.includes(expandedKeys, node.key) && expanded) {
      setCurrentExpandKeys([...currentExpandKeys, node.key as string]);
    } else {
      setCurrentExpandKeys(expandedKeys as string[]);
    }
  };

  // 切换图标
  const toggleIcon = (node: AntTreeNodeProps) => {
    // eslint-disable-next-line no-debugger
    const {
      data: { id, isLeaf = false },
      expanded,
      // pos,
    } = node;
    const isRootNode = id === currentRootId; // 判断是否为根节点
    if (isRootNode) {
      return expanded ? (
        <FolderOpenOutlined className={style['custom-icon']} />
      ) : (
        <FolderOutlined className={style['custom-icon']} />
      );
    } else {
      return isLeaf === false ? (
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

  const closeDrawer = () => {
    setIsLeaf(false);
    setDrawerVisible(false);
    setCurrentId(undefined);
    // 重新获取数据
    getFattData();
  };
  // 添加同级目录
  const handleAdd = (node: AntTreeNodeProps) => {
    console.log('node', node);
    if (node.parentId === null) {
      warning('根节点不能添加同级目录！');
      return false;
    }
    setIsLeaf(false);
    // 获取当前节点的父节点
    setCurrentPid(node.parentId);
    setDrawerVisible(true);
  };
  // 添加子级目录
  const handleSubAdd = (node: AntTreeNodeProps) => {
    console.log('node', node);
    setIsLeaf(false);
    setCurrentPid(node.id);
    setDrawerVisible(true);
  };
  // 添加文件
  const handleFileAdd = (node: AntTreeNodeProps) => {
    setIsLeaf(true);
    setCurrentPid(node.id);
    setDrawerVisible(true);
  };
  // 删除
  const handleDelete = async (node: AntTreeNodeProps) => {
    const res = await deleteDept({
      variables: node.id,
    });
    if (res === 'true') {
      success('删除成功');
      getFattData();
    }
  };
  const handleEdit = (node: AntTreeNodeProps) => {
    setCurrentId(node.id);
    setDrawerVisible(true);
  };
  // 按钮
  const renderTitle = (node: AntTreeNodeProps) => {
    return (
      <div className={style['node-text-wrap']}>
        {/* + '-' + node.id */}
        <span className="title">{node.name + ' - ' + node.id}</span>
        <div className="action-wrap">
          {!node.isLeaf && (
            <Button
              disabled={node.id === currentRootId}
              type="text"
              title="同级添加"
              icon={
                <DiffOutlined
                  style={{ fontSize: '18px', borderRadius: '0px' }}
                />
              }
              onClick={(e) => {
                e.stopPropagation();
                setSelectedKeys([node.id]);
                handleAdd(node);
              }}
            />
          )}
          {!node.isLeaf && (
            <Button
              type="text"
              title="子级添加"
              icon={<FolderAddOutlined style={{ fontSize: '18px' }} />}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedKeys([node.id]);
                handleSubAdd(node);
              }}
            />
          )}

          {!node.isLeaf && (
            <Button
              type="text"
              title="添加文件"
              icon={<FileAddOutlined style={{ fontSize: '18px' }} />}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedKeys([node.id]);
                handleFileAdd(node);
              }}
            />
          )}
          {node.isLeaf && (
            <Button
              type="text"
              title="添加文件"
              icon={<FileAddOutlined style={{ fontSize: '18px' }} />}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedKeys([node.id]);
                handleFileAdd(node);
              }}
            />
          )}
          <Button
            type="text"
            title="编辑"
            icon={<EditOutlined style={{ fontSize: '18px' }} />}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedKeys([node.id]);
              handleEdit(node);
            }}
          />
          <Popconfirm
            title="删除节点"
            description="确认删除该节点吗？它将删除该节点下的所有子节点！"
            okText="确定"
            cancelText="取消"
            onPopupClick={(e) => e.stopPropagation()}
            onConfirm={(e) => {
              e?.stopPropagation();
              setSelectedKeys([node.id]);
              handleDelete(node);
            }}
          >
            <Button
              danger
              title="删除"
              type="text"
              icon={<DeleteOutlined style={{ fontSize: '18px' }} />}
              onClick={(e) => {
                e?.stopPropagation();
                setSelectedKeys([node.id]);
              }}
            />
          </Popconfirm>
        </div>
      </div>
    );
  };
  // 获取树节点数据
  const getTreeDataById = (id: string): DepartmentsTree | null => {
    if (treeData.length === 0) return null;
    const node = treeData[0];
    const findNode = (
      node: DepartmentsTree,
      id: string
    ): DepartmentsTree | null => {
      if (node.id === id) {
        return node;
      }
      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          const result = findNode(node.children[i], id);
          if (result) {
            return result;
          }
        }
      }
      return null;
    };
    return findNode(node, id);
  };

  // onDropHandler
  const onDropHandler = async (info: any) => {
    const dropKey = info.node.id;
    const dragKey = info.dragNode.id;
    const dragStr = info.dragNode.pos;
    const dropStr = info.node.pos;
    const dragPos = info.dragNode.pos.split('-');
    const dropPos = info.node.pos.split('-');
    const dragPosition = info.node.pos.split('-');
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const dropParentId = info.node.parentId; // 放置的节点的父节点id
    const dragParentId = info.dragNode.parentId;
    const dropId = info.node.id; // 放置的节点id
    const dragId = info.dragNode.id; // 拖拽的节点id

    console.log('dragStr', dragStr);
    console.log('dropStr', dropStr);

    console.log('dragParentId', dragParentId);
    console.log('dropParentId', dropParentId);
    console.log('dragParentId===dragParentId', dragParentId === dropParentId);
    // console.log('info', info.dropToGap); // dropToGap 为 true 时，表示放置在节点之前或之后 但它一直是false所以
    // console.log('dropKey', dropKey);
    // console.log('dragKey', dragKey);
    console.log('dropPos', dropPos);
    // console.log('dropPosition', dropPosition);
    console.log('dragPos', dragPos);
    // console.log('dragPosition', dragPosition);
    // console.log('dropParentId', dropParentId);
    // console.log('dragParentId', dragParentId);
    console.log('dropId', dropId);
    console.log('dragId', dragId);
    // dragId -> drop
    const dropNode = getTreeDataById(dropId);
    console.log('dropNode', dropNode);
    if (dropNode && dropNode.isLeaf) {
      warning('不能移动到文件下！');
      // debugger;
      return;
    }

    const res = await moveDepts({
      variables: {
        dragId,
        dropId,
      },
    });
    console.log('res', res);
    if (res) {
      success('移动成功！');
      setCurrentExpandKeys(_.uniq(_.compact([dropId, ...currentExpandKeys])));
      getFattData();
    }
  };

  return (
    <PageContainer header={{ title: '部门管理页面' }}>
      {isEmptyDept === false ? (
        <Tree
          autoExpandParent
          className="dept-manage-tree"
          expandedKeys={currentExpandKeys}
          selectedKeys={selectedKeys}
          fieldNames={{ title: 'name', key: 'id', children: 'children' }}
          treeData={treeData as TreeDataNode[]}
          showIcon // 设置 showIcon 为 true
          draggable
          icon={toggleIcon}
          titleRender={(data) => renderTitle(data as AntTreeNodeProps)} //使用自定义的节点渲染函数
          onSelect={onSelect}
          onExpand={handleExpand}
          onDrop={onDropHandler}
        />
      ) : (
        <Button
          type="primary"
          onClick={() => {
            setIsLeaf(false);
            setDrawerVisible(true);
          }}
        >
          添加根结点
        </Button>
      )}

      {drawerVisible && (
        <CompanyInfoEdit
          onClose={() => closeDrawer()}
          id={currentId}
          pId={currentPid}
          isLeaf={isLeaf}
        />
      )}
    </PageContainer>
  );
};

export default Company;
