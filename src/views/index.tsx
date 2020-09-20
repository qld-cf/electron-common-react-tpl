// eslint-disable-next-line no-use-before-define
import React, { Suspense } from "react"
import $cookie from "js-cookie"
import { Route, Redirect, Switch } from "react-router-dom"
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from '@redux/rootReducer';
import { getEnv } from '@utils/utils';
import Loading from "@cps/common/loading/Loading"
import routes from "@router/routerConfig"
import Main from "@cps/layout/main/Main"
import Login from "@views/user/login"

import '@css/index.normal.less';

const { isPrd } = getEnv()
// redux store配置
const store = isPrd
  ? createStore(rootReducer, applyMiddleware(thunk))
  : window.__REDUX_DEVTOOLS_EXTENSION__ // 使用redux-devtools-extension进行开发调试
    ? createStore(rootReducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__()))
    : // compose: 多函数组装成型函数 把复杂的多函数嵌套调用，组合成纯粹的函数调用，实现fn1(fn2(fn3(fn3(...args))))-->compose(fn1,fn2,fn3,fn4)(...args)这样单纯可读的函数调用方式
    createStore(rootReducer, applyMiddleware(thunk))

const Entry = () => {
  const handleEntry = () => {
    const token = $cookie.get('token') || ''
    return token ? '/app/settlement' : '/login'
  }
  // 返回路由
  const RouteItem = props => {
    const { redirect, path, component, key } = props
    if (redirect) {
      return <Redirect exact key={key} from={path} to={redirect} />
    }
    return <Route key={key} component={component} path={path} />
  }

  // 获取子路由
  const loopRoute = (route, i, _path?: string) => {
    return route.children.map((routeChild, idx) => {
      const r_path = route.path + routeChild.path
      const { redirect, component } = routeChild
      if (routeChild.children && routeChild.children.length) {
        // 递归获取子路径
        return loopRoute(routeChild, idx, r_path)
      } else {
        const route_path = _path ? _path + routeChild.path : route.path + routeChild.path
        return RouteItem({
          key: `${i}-${idx}`,
          redirect,
          path: route_path,
          component
        })
      }
    })
  }

  const Routes = routes.map((route: any, key) => {
    return Array.isArray(route.children) && route.children.length
      ? loopRoute(route, key)
      : RouteItem({ key, ...route })
  })

  return (
    <Provider store={store}>
      <Main>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path='/login' component={Login} />
            <Redirect exact from='/' to={handleEntry()} />
            {Routes}
          </Switch>
        </Suspense>
      </Main>
    </Provider>
  )
}

export default Entry
