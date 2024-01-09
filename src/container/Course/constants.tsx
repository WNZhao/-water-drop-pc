import { ICourse } from '@/utils/types';
import { ProColumns } from '@ant-design/pro-components';

interface IProps {
  onEditHandler: (id: string) => void;
  onOrderTimeHandler?: (id: string) => void;
}

/**
 *
 */
export function getColumns({
  onEditHandler,
}: IProps): ProColumns<ICourse, 'text'>[] {
  return [
    {
      title: '课程名称',
      dataIndex: 'name',
      key: 'name',
      valueType: 'text',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '限制人数',
      dataIndex: 'limitNumber',
      key: 'limitNumber',
      valueType: 'text',
      width: 115,
      ellipsis: true,
      search: false,
    },
    {
      title: '持续时间',
      dataIndex: 'duration',
      key: 'duration',
      valueType: 'text',
      width: 115,
      ellipsis: true,
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 130,
      dataIndex: 'id',
      render: (_, record) => {
        return [
          <a key="edit" onClick={() => onEditHandler(record.id || '')}>
            编辑
          </a>,
        ];
      },
    },
  ];
}

// export const COLUMNS: ProColumns<ICourse, 'text'>[] = [];
