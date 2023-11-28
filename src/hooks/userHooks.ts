import { useQuery } from "@apollo/client";
import { connectFactory, useAppContext } from "@/utils/contextFactory";
import { GET_USER } from "@/graphql/user";
import { IUser } from "@/utils//types";
import { useLocation, useNavigate } from "react-router-dom";

const KEY = 'userInfo'
const DEFAULT_VALUE = {};

export const useUserContenxt = () => useAppContext(KEY);

export const connect = connectFactory(KEY, DEFAULT_VALUE)

export const useGetUser = () => {
  const { setStore } = useUserContenxt();
  const location = useLocation()
  const nav = useNavigate()
  const { loading } = useQuery<{ getUserInfo: IUser }>(GET_USER, {
    onCompleted: (data) => {
      console.log('data', data);
      if (data.getUserInfo) {
        setStore(data.getUserInfo);
        // 登录成功的话
        if (location.pathname.startsWith('/login')) {
          nav(`/`);
        }
        return;
      }
      if (location.pathname !== '/login') {
        nav(`/login?origUrl=${location.pathname}`);
      }
    },
    onError: () => {
      if (location.pathname !== '/login') {
        nav(`/login?origUrl=${location.pathname}`);
      }
    }
  });
  return { loading }
}