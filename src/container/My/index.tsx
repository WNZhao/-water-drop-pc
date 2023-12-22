import OSSImageUpload from '@/components/OSSImageUpload';
import { UPDATE_USER } from '@/graphql/user';
import { useUserContenxt } from '@/hooks/userHooks';
import {
  PageContainer,
  ProForm,
  ProFormInstance,
  ProFormText,
} from '@ant-design/pro-components';
import { useMutation } from '@apollo/client';
import { Col, Form, Row, message } from 'antd';
import { useEffect, useRef } from 'react';

/**
 *
 */
const My = () => {
  const formRef = useRef<ProFormInstance>();

  const [updateUserInfo] = useMutation(UPDATE_USER);

  const { store } = useUserContenxt();
  // const [state, setState] = useState();
  useEffect(() => {
    if (!store.tel) return;
    formRef.current?.setFieldsValue({
      tel: store.tel,
      name: store.name,
      desc: store.desc,
      avatar: [
        {
          url: store.avatar,
        },
      ],
    });
  }, [store]);
  // fixed  antd upload (fileList || []).forEach is not a function

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const checkFile = (rule: any, value: any) => {
    if (!value) {
      return Promise.reject('请上传文件');
    }
    return Promise.resolve();
  };

  return (
    <PageContainer>
      <ProForm
        formRef={formRef}
        layout="horizontal"
        onFinish={async (values) => {
          console.log('values', values);
          const { avatar = [] } = values;
          let av = '';
          if (avatar && avatar[0]) {
            av = avatar[0].url || '';
          }
          const res = await updateUserInfo({
            variables: {
              id: store.id,
              params: {
                name: values.name,
                desc: values.desc,
                avatar: av,
              },
            },
          });

          if (res.data.updateUserInfo.code === 200) {
            // messageApi.success(res.data.updateUserInfo.message);
            // console.log('res', res);
            message.success(res.data.updateUserInfo.message);
            store.refetchHandler();
            return;
          }
          // messageApi.error(res.data.updateUserInfo.message);
          message.error(res.data.updateUserInfo.message);
        }}
        submitter={{
          resetButtonProps: {
            style: {
              display: 'none',
            },
          },
        }}
      >
        <Row gutter={20}>
          <Col>
            <ProFormText
              name="tel"
              label="手机号"
              tooltip="不能修改"
              disabled={true}
            ></ProFormText>
            <ProFormText
              name="name"
              label="昵称"
              placeholder="请输入昵称"
            ></ProFormText>
            <ProFormText
              name="desc"
              label="简介"
              placeholder="认输入简介信息"
            ></ProFormText>
          </Col>
          <Col>
            <Form.Item
              name="avatar"
              rules={[{ required: true, validator: checkFile }]}
              valuePropName="value"
              getValueFromEvent={normFile}
            >
              <OSSImageUpload />
            </Form.Item>
          </Col>
        </Row>
      </ProForm>
    </PageContainer>
  );
};

export default My;
