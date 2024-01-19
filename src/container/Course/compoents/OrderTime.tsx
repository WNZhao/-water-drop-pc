import { useState } from 'react';

import style from './order-time.module.less';
import { Button, Col, Drawer, Row, Space, Tabs } from 'antd';
import { DAYS, IDay, getOrderTimeColumns, isWorkDay } from '../constants';
import { EditableProTable } from '@ant-design/pro-components';
import { ChromeFilled, RedoOutlined } from '@ant-design/icons';
import { OrderTimeType } from '@/utils/types';
import _ from 'lodash';
import { useOrderTime } from './hooks';

interface IProps {
  open?: boolean;
  onClose: (isReload?: boolean) => void;
  id: string;
}

/**
 *
 */
const OrderTime = ({ onClose, id }: IProps) => {
  const [currentDay, setCurrentDay] = useState<IDay>(DAYS[0]); // 当前选中的日期
  const onTabChangeHandler = (key: string) => {
    const current = DAYS.find((item) => item.key === key);
    setCurrentDay(current || DAYS[0]);
  };

  const {
    loading,
    orderTime,
    onDeleteHandler,
    onSaveHandler,
    allWeekSyncHandler,
    allWorkDaySyncHandler,
  } = useOrderTime(id, currentDay.key);

  return (
    <Drawer
      className={style.container}
      open
      onClose={() => onClose()}
      width={750}
      title={'可约时间'}
      extra={
        <Space>
          <Button onClick={() => onClose()}>取消</Button>
          {/* <Button type="primary" onClick={onSubmitHandler}>
            保存
          </Button> */}
        </Space>
      }
    >
      <Tabs items={DAYS} type="card" onChange={onTabChangeHandler} />

      <EditableProTable<OrderTimeType>
        headerTitle={
          <Space>
            选择
            <span className={style.weekLabel}>{currentDay.label}</span>{' '}
            的课开放预约的时间
          </Space>
        }
        loading={loading}
        value={orderTime}
        recordCreatorProps={{
          record: () => {
            const key =
              orderTime.length === 0
                ? 1
                : Math.max(...orderTime.map((item) => item.key)) + 1;
            // eslint-disable-next-line no-debugger
            return {
              key,
              startTime: '12:00:00',
              endTime: '12:00:00',
            };
          },
        }}
        columns={getOrderTimeColumns(onDeleteHandler)}
        rowKey="key"
        editable={{
          onSave: async (rowKey, d) => {
            let newData;
            if (orderTime.findIndex((item) => item.key === rowKey) > -1) {
              newData = orderTime.map((item) =>
                item.key === rowKey ? _.omit(d, 'index') : { ...item }
              );
            } else {
              newData = [...orderTime, _.omit(d, 'index')];
            }

            // reorder key
            newData = newData.map((item, index) => ({
              ...item,
              key: index + 1,
            }));
            // console.log('newData', newData);
            onSaveHandler(newData);
          },
        }}
      />
      <Row gutter={20} className={style.buttons}>
        <Col span={12}>
          <Button
            icon={<RedoOutlined />}
            style={{ width: '100%' }}
            type="primary"
            disabled={!isWorkDay(currentDay.key)}
            onClick={allWorkDaySyncHandler}
          >
            全工作日同步
          </Button>
        </Col>
        <Col span={12}>
          <Button
            icon={<ChromeFilled />}
            style={{ width: '100%' }}
            type="primary"
            danger
            onClick={allWeekSyncHandler}
          >
            全周同步
          </Button>
        </Col>
      </Row>
    </Drawer>
  );
};

export default OrderTime;
