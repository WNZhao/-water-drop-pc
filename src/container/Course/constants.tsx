import { ICourse } from '@/utils/types';
import { ProColumns } from '@ant-design/pro-components';

export const COLUMNS: ProColumns<ICourse, 'text'>[] = [
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
    render: (text) => {
      return [
        <a key="edit" onClick={() => {}}>
          编辑{text}
        </a>,
      ];
    },
  },
];
