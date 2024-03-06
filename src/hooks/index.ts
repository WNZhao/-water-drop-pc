import { ROUTE_CONFIG, ROUTE_KEY, getRouteByKey, routes } from "@/routes/menu";
import { useEffect, useMemo } from "react"
import { matchPath, useLocation, useNavigate } from "react-router-dom";

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  })
}

// 通用页面跳转器
export const useGoto = () => {
  const nav = useNavigate()

  const back = () => nav(-1);
  const go = (pageKey: string, params?: Record<string, string>) => {
    if (!pageKey) {
      // console.log('pageKey', pageKey);
      nav('/home')
      return
    }
    const route = getRouteByKey(pageKey)
    if (route && route.path) {
      if (!params) {
        nav(`/${route.path}`)
        return
      }
      //  /page/:id params{id:1}==> page/1
      const url = route.path.replace(/\/:(\w+)/g, (exp: string, exp1: string) => {
        return `/${params[exp1]}`
      })
      nav(`/${url}`)
    }
  }
  return {
    go,
    back
  }
}
/**
 * 获取当前url匹配的路由
 * @returns 
 */
// 根据url获取页面信息
export const useMatchedRoute = () => {
  const r = useLocation()
  // console.log('routes', routes);
  const route = useMemo(() => routes.find((item) => matchPath(`/${item.path}`, r.pathname)), [r.pathname])

  return route
}

// 是否是org router
export const useIsOrgRoute = () => {
  const curRoute = useMatchedRoute()
  if (curRoute?.path === ROUTE_CONFIG[ROUTE_KEY.ORG].path) {
    return true
  }
  return false
}