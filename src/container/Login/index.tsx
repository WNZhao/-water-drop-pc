import {
  // AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  // TaobaoCircleOutlined,
  // WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  // setAlpha,
} from '@ant-design/pro-components';
import { Tabs, message, theme } from 'antd';
// import type { CSSProperties } from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LOGIN, SENDCODEMESSAGE } from '../../graphql/auth';
import styles from './index.module.less';

type LoginType = 'phone' | 'account';

interface TValue {
  tel: string;
  code: string;
}

const Login = () => {
  const { token } = theme.useToken();
  const [loginType, setLoginType] = useState<LoginType>('phone');

  const [run] = useMutation(SENDCODEMESSAGE);
  const [login] = useMutation(LOGIN);

  {
    /*  const iconStyles: CSSProperties = {
    marginInlineStart: '16px',
    color: setAlpha(token.colorTextBase, 0.2),
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };*/
  }
  const loginHandler = async (values: TValue) => {
    const res = await login({
      variables: values,
    });
    console.log('res', res);
    if (res.data.login.code === 200) {
      message.success(res.data.login.message);
      return;
    }
    message.error(res.data.login.message);
  };

  return (
    <ProConfigProvider hashed={false}>
      <div
        style={{ backgroundColor: token.colorBgContainer }}
        className={styles.container}
      >
        <LoginForm
          logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
          title="RC18全栈开发"
          subTitle="全球最大的代码托管平台"
          onFinish={loginHandler}
          // actions={
          //   <Space>
          //     其他登录方式
          //     <AlipayCircleOutlined style={iconStyles} />
          //     <TaobaoCircleOutlined style={iconStyles} />
          //     <WeiboCircleOutlined style={iconStyles} />
          //   </Space>
          // }
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          >
            <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
          </Tabs>

          {loginType === 'phone' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={'prefixIcon'} />,
                }}
                name="tel"
                placeholder={'手机号'}
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'获取验证码'}`;
                  }
                  return '获取验证码';
                }}
                phoneName="tel"
                name="code"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
                onGetCaptcha={async (tel: string) => {
                  console.log('tel', tel);
                  const res = await run({
                    variables: {
                      tel,
                    },
                  });
                  if (res && res.data.sendCodeMessage.code === 200) {
                    message.success('获取验证码成功！');
                  } else {
                    message.error(
                      '获取验证码失败' + res.data.sendCodeMessage.message
                    );
                  }
                }}
              />
            </>
          )}
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};

export default Login;
