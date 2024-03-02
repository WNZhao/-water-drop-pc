import { Button, Drawer, Form, Input, Space } from 'antd';
import { useState } from 'react';

interface IProps {
  open?: boolean;
  onClose: (isReload?: boolean) => void;
  id?: string;
}

const { TextArea } = Input;
// 新建/编辑公司信息
/**
 *
 * @param param0
 * @returns
 */
const CompanyInfoEdit: React.FC<IProps> = ({ onClose, id }: IProps) => {
  const [form] = Form.useForm(); // 表单

  const [saveLoading, setSaveLoading] = useState(false);

  const onSubmitHandler = async () => {
    try {
      const values = await form.validateFields();

      console.log('formValid', values);
      if (values) {
        setSaveLoading(true);
        console.log('submit');
      }
    } catch (error) {
      //
      console.error('表单验证失败:', error);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <>
      <Drawer
        maskClosable={false}
        open
        onClose={() => onClose()}
        width={550}
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
          <Form.Item
            label="名称"
            name="name"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 19 }}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="描述"
            name="description"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 19 }}
          >
            <TextArea
              showCount
              style={{ height: 80, resize: 'none' }}
              maxLength={200}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

CompanyInfoEdit.defaultProps = {
  open: true,
  id: '',
};

export default CompanyInfoEdit;
