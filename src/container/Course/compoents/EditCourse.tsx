import { useCourse, useEditInfo } from '@/services/course';
import {
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Button,
} from 'antd';
import { useEffect, useState } from 'react';

interface IProps {
  open: boolean;
  onClose: (isReload?: boolean) => void;
  id?: string;
}

const { TextArea } = Input;

/**
 * 新建/编辑课程
 * name: string; // 课程名称
  desc?: string; //课程描述
  group?: string; //适龄人群
  baseAbility?: string; //适合基础
  limitNumber?: number; //限制上课人数
  duration?: number; //持续时间
  reserveInfo?: string; //预约信息
  refundInfo?: string; //退款信息
  otherInfo?: string; //其它说明信息
 */
const EditCourse = ({ open, onClose, id }: IProps) => {
  const [form] = Form.useForm();

  const [handleEdit] = useEditInfo();

  const { refetch: refetchCourse } = useCourse();

  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (id) {
      refetchCourse({ id }).then((res) => {
        form.setFieldsValue(res.data.getCourseInfo.data);
      });
    }
  }, [id]);

  const onSubmitHandler = async () => {
    const values = await form.validateFields();
    console.log('formValid', values);
    if (values) {
      setSaveLoading(true);
      handleEdit(id, values, () => {
        onClose(true);
        form.resetFields(); // 清理数据
        setSaveLoading(false);
      });
    }
  };

  return (
    <Drawer
      open={open}
      onClose={() => onClose()}
      width={750}
      title={id ? '编辑课程' : '新建课程'}
      extra={
        <Space>
          <Button onClick={() => onClose()}>取消</Button>
          <Button
            type="primary"
            onClick={onSubmitHandler}
            loading={saveLoading}
          >
            保存
          </Button>
        </Space>
      }
    >
      <Form form={form}>
        <Form.Item label="课程名称" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="课程描述" name="desc" rules={[{ required: true }]}>
          <TextArea rows={4} showCount maxLength={400} />
        </Form.Item>
        <Form.Item label="适龄人群" name="group" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="适合基础"
          name="baseAbility"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Row gutter={10}>
          <Col>
            <Form.Item
              label="限制人数"
              name="limitNumber"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} addonAfter="人" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="持续时间"
              name="duration"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} addonAfter="分钟" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="预约信息" name="reserveInfo">
          <TextArea rows={4} showCount maxLength={200} />
        </Form.Item>
        <Form.Item label="退款信息" name="refundInfo">
          <TextArea rows={4} showCount maxLength={200} />
        </Form.Item>
        <Form.Item label="其它信息" name="otherInfo">
          <TextArea rows={4} showCount maxLength={200} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
// 可选要给一个默认值
EditCourse.defaultProps = {
  id: '',
};

export default EditCourse;
