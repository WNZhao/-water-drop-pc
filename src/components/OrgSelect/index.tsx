import { Select, Space } from 'antd';
import { useOrgnizations } from '@/services/org';
import _ from 'lodash';
import { useUserContenxt } from '@/hooks/userHooks';
import { LOCAL_CURRENT_ORG } from '@/utils/constants';
import { useEffect } from 'react';
import { useGoto } from '@/hooks';
import { ROUTE_KEY } from '@/routes/menu';
import { useLocation } from 'react-router-dom';

const currentOrg = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_CURRENT_ORG) || '');
  } catch (error) {
    return undefined;
  }
};

/**
 * 门店选择器
 */
const OrgSelect = () => {
  const { data = [], refetch: refetchHandler } = useOrgnizations(
    1,
    10000,
    true
  );
  // console.log('?????');
  const location = useLocation();
  const { setStore } = useUserContenxt();
  const { go } = useGoto();
  // 没有选择门店的时候，跳转到缺省页面
  useEffect(() => {
    if (currentOrg()?.value) {
      setStore({ currentOrg: currentOrg().value });
    } else {
      go(ROUTE_KEY.NO_ORG);
    }
  }, [location.pathname]);
  // 防抖
  const handleSearch = _.debounce((name: string) => {
    refetchHandler({ name });
  }, 500);

  const onChangeHandler = (org: { value: string; label: string }) => {
    console.log('onChangeHandler');
    setStore({
      currentOrg: org.value,
    });
    localStorage.setItem(LOCAL_CURRENT_ORG, JSON.stringify(org));
  };
  return (
    <Space>
      <span style={{ fontSize: '12px' }}>选择门店：</span>
      <Select
        placeholder="请选择门店"
        style={{ width: '180px', fontSize: '12px' }}
        showSearch
        onSearch={handleSearch}
        onChange={onChangeHandler}
        filterOption={false}
        defaultValue={currentOrg()?.value}
        labelInValue
      >
        {data.map((item) => (
          <Select.Option value={item.id} key={item.id}>
            {item.orgName}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
};

export default OrgSelect;
