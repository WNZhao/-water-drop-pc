import {
  FolderOutlined,
  FolderOpenOutlined,
  FolderAddOutlined,
  FileAddOutlined,
  DeleteOutlined,
  DiffOutlined,
  EditOutlined,
  UserOutlined,
  UserAddOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Popconfirm, Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import { AntTreeNodeProps, DataNode, EventDataNode } from 'antd/es/tree';
import style from './index.module.less';
import { ReactNode, useEffect, useState } from 'react';
import CompanyInfoEdit from './components/CompanyDrawer';
import {
  useDeleteDept,
  useDeptRootByOrz,
  useDeptTree,
  useMoveDepts,
  useSortDepts,
} from '@/services/dept';
import { useUserContenxt } from '@/hooks/userHooks';
import { DepartmentsTree, IDepartments, TBaseDepartments } from '@/utils/types';
import _ from 'lodash';
import useAntdMessage from '@/components/AntdMessage';
import classnames from 'classnames';

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
  const { sortDepts } = useSortDepts();

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
    const { node: nt, selected } = info;
    const node = nt as AntTreeNodeProps;
    console.log('selectedKeys', selectedKeys);
    if (selected) {
      setSelectedKeys(selectedKeys);
      if (node.isLeaf) {
        return;
      } else {
        setCurrentExpandKeys(
          _.uniq(_.compact([node.id, ...currentExpandKeys]))
        );
      }
    } else {
      setSelectedKeys([]);
      if (node.isLeaf) {
        return;
      } else {
        //tood
        setCurrentExpandKeys(_.without([...currentExpandKeys], node.id));
      }
    }
  };

  // 处理展开收起
  const handleExpand = (
    expandedKeys: React.Key[],
    { expanded, node }: { expanded: boolean; node: EventDataNode<any> }
  ) => {
    console.log('expandedKeys', expandedKeys);
    console.log('expanded', expanded);
    console.log('node.key', node.key);
    if (expanded) {
      setCurrentExpandKeys(_.uniq(_.compact([node.key, ...currentExpandKeys])));
    } else {
      setCurrentExpandKeys(_.without([...currentExpandKeys], node.key));
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

  const handleProfileEdit = (node: AntTreeNodeProps) => {
    console.log('node', node);
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

  const onDrop: TreeProps['onDrop'] = async (info) => {
    // console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]); // the drop position relative to the drop node, inside 0, top -1, bottom 1

    const loop = (
      data: DepartmentsTree[],
      key: React.Key,
      callback: (
        node: DepartmentsTree,
        i: number,
        data: DepartmentsTree[]
      ) => void
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...treeData];

    // Find dragObject
    let dragObj: DepartmentsTree;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      console.log('不同级处理');
      if (info.node.isLeaf === true) {
        warning('人员节点不能添加子节点！');
        return false;
      }

      // if (info.node.children) {
      //   const idx = _.findIndex(info.node.children, (o: TBaseDepartments) => {
      //     console.log('o.id', o.id);
      //     console.log('dragKey', dragKey);
      //     return o.id === dragKey;
      //   });
      //   console.log('idx', idx);
      // }

      // Drop on the content
      // loop(data, dropKey, (item) => {
      //   item.children = item.children || [];
      //   // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
      //   item.children.unshift(dragObj);
      // });
      const res = await moveDepts({
        variables: {
          dragId: dragObj!.id,
          dropId: dropKey,
        },
      });
      if (res) {
        console.log('res', res);
        await getFattData(); // 重新获取数据（隐含了排序的功能后端处理的）
      }
    } else {
      // 同级处理
      console.log('同级处理');
      let ar: DepartmentsTree[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      // console.log('ar', ar);
      // console.log('dragObj!', dragObj!);
      if (dropPosition === -1) {
        // Drop on the top of the drop node
        ar.splice(i!, 0, dragObj!);
      } else {
        // Drop on the bottom of the drop node
        ar.splice(i! + 1, 0, dragObj!);
      }
      // ar.sort((a, b) => sortRule(a as IDepartments, b as IDepartments));
      // 更新后台数据顺序 同级处理可以直接拿这个当parentId
      ar.map((item, index) => {
        item.sort = index + 1;
      });
      ar.sort((a, b) => sortRule(a as IDepartments, b as IDepartments));
      console.log('ar', ar);
      console.log('dragObj===', dragObj!);
      const res = await sortDepts({
        variables: {
          ids: ar.map((item) => item.id),
          values: ar.map((item) => item.sort!),
        },
      });
      console.log('res', res);
      getFattData();
    }
    // setTreeData(data as DepartmentsTree[]); // 这个更新数据是为了方便视图查看
  };
  // 排序规则函数
  const sortRule = (a: IDepartments, b: IDepartments) => {
    if (a.isLeaf < b.isLeaf) {
      return 1;
    }
    if (a.isLeaf > b.isLeaf) {
      return -1;
    }
    // 如果type相同，则按value排序
    return a.sort! - b.sort!;
  };

  // 显示图标
  const shawIconHandler = (node: AntTreeNodeProps) => {
    // eslint-disable-next-line no-debugger
    const {
      data: { id, isLeaf = false },
      expanded,
      // pos,
    } = node;
    const isRootNode = id === currentRootId; // 判断是否为根节点
    if (isRootNode) {
      return expanded ? (
        <FolderOpenOutlined className={style.treeNodeIcon} />
      ) : (
        <FolderOutlined className={style.treeNodeIcon} />
      );
    } else {
      return isLeaf === false ? (
        expanded ? (
          <FolderOpenOutlined className={style.treeNodeIcon} />
        ) : (
          <FolderOutlined className={style.treeNodeIcon} />
        )
      ) : (
        <UserOutlined className={style.treeNodeIcon} />
        // <FileOutlined  />
      );
    }
  };
  // 渲染标题
  const renderTitleAndToolbar = (nd: DataNode): ReactNode => {
    const node = nd as AntTreeNodeProps;
    // console.log('node', node);
    return (
      <span className={style.titleActionWapper}>
        <span className={style.title}>{(node as DepartmentsTree).name}</span>
        <span className={classnames(style['action-wrap'], 'show-in-selected')}>
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
              title="添加成员"
              icon={<UserAddOutlined style={{ fontSize: '18px' }} />}
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
              title="权限设置"
              icon={<ProfileOutlined style={{ fontSize: '18px' }} />}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedKeys([node.id]);
                handleProfileEdit(node);
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
        </span>
      </span>
    );
  };

  return (
    <PageContainer header={{ title: '部门管理页面' }}>
      {isEmptyDept === false ? (
        <>
          <Tree
            className="draggable-tree-4depts"
            draggable
            blockNode
            showIcon
            // showLine
            expandedKeys={currentExpandKeys}
            selectedKeys={selectedKeys}
            treeData={treeData as TreeDataNode[]}
            fieldNames={{ title: 'name', key: 'id', children: 'children' }}
            defaultExpandedKeys={currentExpandKeys}
            icon={shawIconHandler}
            titleRender={renderTitleAndToolbar}
            onDrop={onDrop}
            onSelect={onSelect}
            onExpand={handleExpand}
          />
        </>
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
