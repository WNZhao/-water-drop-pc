import { message } from 'antd';

const useAntdMessage = () => {
  return {
    success: (msg: string) => {
      // 根据主题调整 message 的样式或行为
      message.success(msg);
    },
    info: (msg: string) => {
      // 根据主题调整 message 的样式或行为
      message.info(msg);
    },
    warning: (msg: string) => {
      // 根据主题调整 message 的样式或行为
      message.warning(msg);
    },
    error: (msg: string) => {
      // 根据主题调整 message 的样式或行为
      message.error(msg);
    },
  };
};

export default useAntdMessage;
