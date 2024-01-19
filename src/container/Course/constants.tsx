import { ICourse } from '@/utils/types';
import { ProColumns } from '@ant-design/pro-components';
import { Popconfirm, Space } from 'antd';

interface IProps {
  onEditHandler: (id: string) => void;
  onOrderTimeHandler?: (id: string) => void;
}

/**
 *
 */
export function getColumns({
  onEditHandler,
  onOrderTimeHandler,
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
          <a
            key="orderTime"
            onClick={() =>
              onOrderTimeHandler ? onOrderTimeHandler(record.id || '') : null
            }
          >
            可约时间
          </a>,
        ];
      },
    },
  ];
}

// export const COLUMNS: ProColumns<ICourse, 'text'>[] = [];
export type TWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';
export interface IDay {
  key: TWeek;
  label: string;
}
export const DAYS: IDay[] = [
  {
    key: 'monday',
    label: '星期一',
  },
  {
    key: 'tuesday',
    label: '星期二',
  },
  {
    key: 'wednesday',
    label: '星期三',
  },
  {
    key: 'thursday',
    label: '星期四',
  },
  {
    key: 'friday',
    label: '星期五',
  },
  {
    key: 'saturday',
    label: '星期六',
  },
  {
    key: 'sunday',
    label: '星期日',
  },
];

export const getOrderTimeColumns = (
  onDeleteHandler: (key: number) => void
): ProColumns[] => [
  {
    title: '序号',
    dataIndex: 'key',
    width: 50,
    editable: false,
    align: 'center',
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    valueType: 'time',
    width: 160,
    align: 'center',
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    valueType: 'time',
    width: 160,
    align: 'center',
  },
  {
    title: '操作',
    valueType: 'option',
    width: 140,
    align: 'center',
    render: (text, record, _, action) => {
      return (
        <Space>
          <a
            key="edit"
            onClick={() => {
              action?.startEditable?.(record.key || '');
            }}
          >
            编辑
          </a>
          <Popconfirm
            title="提醒"
            description="确认删除吗？"
            onConfirm={() => onDeleteHandler(record.key || '')}
          >
            <a key="delete" style={{ color: 'red' }}>
              删除
            </a>
          </Popconfirm>
        </Space>
      );
    },
  },
];

export interface IOrderTime {
  startTime: string;
  endTime: string;
  key: number;
}

export interface IWeekCourse {
  week: TWeek;
  orderTime: IOrderTime[];
}

// 工作日判断
export const isWorkDay = (day: TWeek) => {
  return day !== 'saturday' && day !== 'sunday';
};
