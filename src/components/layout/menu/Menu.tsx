/**
 * 菜单栏
 */
import React, { useState } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import _menuList from '@common/menu'
import { updateMenuTab, setCurMenuTab } from '@redux/menuTab.redux'
import { connect } from 'react-redux';
const { SubMenu } = Menu

interface Iprop {
  updateMenuTab?: any
  tabList?: any
}

const MyMenu = (props: Iprop & any) => {
  const [collapsed, setCollapsed] = useState(false)
  const [menuList, setMenuList] = useState(_menuList)
  const { tabList, updateMenuTab, setCurMenuTab } = props
  // 添加tab
  const addMenuTab = (p: any) => {
    setCurMenuTab(p.route)
    const isExsit = tabList.filter(e => { return e.path === p.route })
    if (isExsit && isExsit.length) return;
    const _list = tabList.concat([{
      name: p.name,
      path: p.route
    }])
    updateMenuTab(_list)
  }

  const renderMenu = list => {
    return list.map(item => {
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu title={item.name} key={item.id}>
            {renderMenu(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item title={item.title} key={item.id} onClick={()=>{addMenuTab(item)}}>
          <Link to={item.route}>{item.name}</Link>
        </Menu.Item>
      )
    })
  }

  return (
    <div style={{ minWidth: 200, background: '#001529' }}>
      {menuList.length > 0 ? (
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode='inline'
          theme='dark'
          inlineCollapsed={collapsed}
        >
          {renderMenu(menuList)}
        </Menu>
      ) : (
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode='inline'
            theme='dark'
            inlineCollapsed={collapsed}
          >
            <Menu.Item key='1'>
              <span>首页</span>
            </Menu.Item>
          </Menu>
        )}
    </div>
  )
}

// export default MyMenu

const mapStateToProps = (state: any) => {
  return {
    tabList: state.menuTab.menuTabList.list
  }
}
const mapDispatchToProps = {
  updateMenuTab,
  setCurMenuTab
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMenu)


