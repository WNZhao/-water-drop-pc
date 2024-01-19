import { useState, useEffect, useMemo } from 'react';

import style from './order-time.module.less';
import { Button, Col, Drawer, Row, Space, Tabs } from 'antd';
import {
  DAYS,
  IDay,
  IOrderTime,
  getOrderTimeColumns,
  isWorkDay,
} from '../constants';
import { EditableProTable } from '@ant-design/pro-components';
import { ChromeFilled, RedoOutlined } from '@ant-design/icons';
import { useCourse, useCourseEditInfo } from '@/services/course';
import { OrderTimeType, ReducibleTimeType } from '@/utils/types';
import _ from 'lodash';

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
  const [reducibleTime, setReducibleTime] = useState<ReducibleTimeType[]>([]); // 当前选中的日期的可约时间段
  const { refetch: refetchCourse, loading } = useCourse();

  const [handleCourseEdit, editLoading] = useCourseEditInfo();

  const init = async () => {
    if (id) {
      const res = await refetchCourse({ id });
      console.log('res', res.data.getCourseInfo.data?.reducibleTime);
      setReducibleTime(res.data.getCourseInfo.data?.reducibleTime || []);
    }
  };

  useEffect(() => {
    init();
  }, [id]);

  const onTabChangeHandler = (key: string) => {
    const current = DAYS.find((item) => item.key === key);
    setCurrentDay(current || DAYS[0]);
  };

  const onDeleteHandler = (key: number) => {
    const newData = orderTime.filter((item) => item.key !== key);
    onSaveHandler(newData);
  };

  const orderTime = useMemo(() => {
    // console.log('reducibleTime', reducibleTime);
    return (
      (reducibleTime.find((item) => item.week === currentDay.key)
        ?.orderTime as OrderTimeType[]) || []
    );
  }, [reducibleTime, currentDay]);

  const onSaveHandler = (ot: IOrderTime[]) => {
    const rt = [...reducibleTime];
    const index = rt.findIndex((item) => item.week === currentDay.key);
    if (index > -1) {
      rt[index] = {
        week: currentDay.key,
        orderTime: ot,
      };
    } else {
      rt.push({
        week: currentDay.key,
        orderTime: ot,
      });
    }
    handleCourseEdit(id, { reducibleTime: rt }, () => init());
  };

  const allWeekSyncHandler = () => {
    const rt: ReducibleTimeType[] = [];
    DAYS.forEach((item) => {
      rt.push({
        week: item.key,
        orderTime: orderTime,
      });
    });
    handleCourseEdit(id, { reducibleTime: rt }, () => init());
  };

  const allWorkDaySyncHandler = () => {
    const rt: ReducibleTimeType[] = [];
    DAYS.forEach((item) => {
      if (isWorkDay(item.key)) {
        rt.push({
          week: item.key,
          orderTime: orderTime,
        });
      }
    });
    handleCourseEdit(id, { reducibleTime: rt }, () => init());
  };

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
        loading={loading || editLoading}
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
