import { createContext, useContext, useMemo, useState } from 'react';
import { IPropChild } from './types';

interface IStore {
  key: string; // 命名空间
  store: Record<string, any>;
  setStore: (payload: Record<string, any>) => void;
}

const getCtxProvider =
  (
    key: string,
    defaultValue: Record<string, any>,
    AppContext: React.Context<IStore>
  ) =>
  ({ children }: IPropChild) => {
    const [store, setStore] = useState(defaultValue);
    const value = useMemo(
      () => ({
        key,
        store,
        setStore,
      }),
      [store]
    );
    return (
      <AppContext.Provider value={value}> {children} </AppContext.Provider>
    );
  };

// 缓存
const ctxCache: Record<string, Ctx> = {};

interface IProp {
  children: React.ReactNode;
}

class Ctx {
  defaultStore: IStore;

  AppContext: React.Context<IStore>;

  Provider: ({ children }: IProp) => JSX.Element;

  constructor(key: string, defaultValue: Record<string, any>) {
    this.defaultStore = {
      key,
      store: defaultValue,
      setStore: () => {},
    };
    this.AppContext = createContext(this.defaultStore); // 创建Context
    this.Provider = getCtxProvider(key, defaultValue, this.AppContext);
    ctxCache[key] = this;
  }
}

// 拿到context
export const useAppContext = (key: string) => {
  const ctx = ctxCache[key];
  const app = useContext(ctx.AppContext);
  return {
    store: app.store,
    setStore: app.setStore,
  };
};

// 包裹的组件
export const connectFactory = (
  key: string,
  defaultValue: Record<string, any>
) => {
  const ctx = ctxCache[key];
  let CurCtx: Ctx;
  if (ctx) {
    CurCtx = ctx;
  } else {
    CurCtx = new Ctx(key, defaultValue);
  }
  return (Child: React.FunctionComponent<any>) => (props: any) =>
    (
      <CurCtx.Provider>
        <Child {...props} />
      </CurCtx.Provider>
    );
};
