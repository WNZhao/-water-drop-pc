import { useEffect, useMemo, useState } from "react";
import { DAYS, IOrderTime, TWeek, isWorkDay } from "../constants";
import { OrderTimeType, ReducibleTimeType } from "@/utils/types";
import { useCourse, useCourseEditInfo } from "@/services/course";

export const useOrderTime = (id: string, currentDayKey: TWeek) => {
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

  const onDeleteHandler = (key: number) => {
    const newData = orderTime.filter((item: IOrderTime) => item.key !== key);
    onSaveHandler(newData);
  };

  const orderTime = useMemo(() => {
    // console.log('reducibleTime', reducibleTime);
    return (
      (reducibleTime.find((item) => item.week === currentDayKey)
        ?.orderTime as OrderTimeType[]) || []
    );
  }, [reducibleTime, currentDayKey]);

  const onSaveHandler = (ot: IOrderTime[]) => {
    const rt = [...reducibleTime];
    const index = rt.findIndex((item) => item.week === currentDayKey);
    if (index > -1) {
      rt[index] = {
        week: currentDayKey,
        orderTime: ot,
      };
    } else {
      rt.push({
        week: currentDayKey,
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

  return { loading: loading || editLoading, orderTime, onDeleteHandler, onSaveHandler, allWeekSyncHandler, allWorkDaySyncHandler, }
};