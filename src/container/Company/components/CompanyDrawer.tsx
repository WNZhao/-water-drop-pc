import { useUserContenxt } from '@/hooks/userHooks';
import { useCreateDept, useDeptInfo, useUpdateDept } from '@/services/dept';
import { IDepartments } from '@/utils/types';
import { Button, Drawer, Form, Input, Space, message } from 'antd';

import { useEffect, useState } from 'react';

interface IProps {
  open?: boolean;
  onClose: (isReload?: boolean) => void;
  id?: string;
  pId: string | null;
  isLeaf?: boolean;
}

const { TextArea } = Input;
// 新建/编辑公司信息
/**
 *
 * @param param0
 * @returns
 */
const CompanyInfoEdit: React.FC<IProps> = ({
  onClose,
  id,
  pId,
  isLeaf,
}: IProps) => {
  const [form] = Form.useForm(); // 表单

  const [saveLoading, setSaveLoading] = useState(false);
  const [currentDepInfo, setCurrentDepInfo] = useState<IDepartments | null>(
    null
  );
  const { createDept } = useCreateDept();
  const { updateDept } = useUpdateDept();
  const { store } = useUserContenxt();

  const { refetch: refetchDeptInfo } = useDeptInfo();

  console.log('pId', pId);
  useEffect(() => {
    if (id) {
      // 编辑
      // 获取公司信息
      // getOrgDetail(id);
      setSaveLoading(true);
      refetchDeptInfo(id)
        .then((res) => {
          form.setFieldsValue(res.data);
          setCurrentDepInfo(res.data);
        })
        .finally(() => {
          setSaveLoading(false);
        });
    }
  }, [id]);

  const onSubmitHandler = async () => {
    try {
      const values = await form.validateFields();
      if (values) {
        setSaveLoading(true);
        let res;
        if (id) {
          // totdo
          const { id, ...rest } = currentDepInfo;
          res = await updateDept({
            variables: {
              id: id,
              departmentData: {
                ...rest,
                ...values,
              },
            },
          });
        } else {
          res = await createDept({
            variables: {
              parentId: pId,
              name: values.name,
              description: values.description,
              biz_id: store.orgId,
              isLeaf,
            },
          });
        }

        if (res) {
          message.success('保存成功');
          form.resetFields();
          setSaveLoading(false);
          onClose(true);
        } else {
          message.error('保存失败');
        }
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
        {/* {isLeaf + ''} */}
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
