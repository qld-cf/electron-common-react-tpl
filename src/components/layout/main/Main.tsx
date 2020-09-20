import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Layout, ConfigProvider } from 'antd'
import enUS from 'antd/es/locale/en_US'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import MyMenu from '@cps/layout/menu/Menu'
import MyHeader from '@cps/layout/header/Header'
import MenuTab from '@cps/layout/menuTab/MenuTab'

import style from './main.less'

moment.locale('en')

interface IProps {
  children: any
  location?: any
}

const { Content } = Layout

const Main = (props: IProps & RouteComponentProps) => {
  console.log(props);
  const { location } = props;
  const isLoginPage = location.pathname === '/login';

  return <ConfigProvider locale={zhCN}>
    {
      isLoginPage
        ? <div className="mid">{props.children}</div>
        : <Layout style={{ minHeight: '100vh', display: 'flex' }}>
          <MyHeader />
          <Layout style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
            <MyMenu />
            <Layout style={{ padding: '24px 24px 0 24px', width: 0, flex: 1 }}>
              <MenuTab location={props.location} />
              <Content className='site-layout-background layout-content'>
                <div className={style.contentChild}>{props.children}</div>
              </Content>
            </Layout>
          </Layout>
        </Layout>
    }
  </ConfigProvider>;
}

export default withRouter(Main)
