/**
 * 菜单标签
 */
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import style from './menuTab.less'
import { connect } from 'react-redux'
import { CloseOutlined, MoreOutlined } from '@ant-design/icons'
import { updateMenuTab, setCurMenuTab } from '@redux/menuTab.redux'
import { matchRouterPath } from '@utils/utils'
import menu from '@common/menu'
import { Popover } from 'antd'

interface Iprop {
  location: any
  tabList: any // tab列表
  updateMenuTab?: any // 更新tab
  setCurMenuTab?: any
  currentTab?: string // 当前tab
}

const MenuTab = (props: Iprop) => {
  const { location, tabList, updateMenuTab, setCurMenuTab, currentTab } = props
  const dashboardPath = '/banner/settlement'
  const history = useHistory()
  const cTablimit = 0 // tab控制格式
  const isTabActive = e => {
    // 是否当前tab
    if (e.path === props.location.pathname) {
      return style.tab + ' ' + style.menuTabActive
    }
    return style.tab
  }
  const toggleTab = (e: string) => {
    // 切换tab
    setCurMenuTab(e)
    history.replace(e)
  }

  const isTabControlShow = () => {
    // tab控制是否显示
    if (tabList && tabList.length > cTablimit) {
      return style.menuTabWrap + ' ' + style.showTabcontrol
    }
    return style.menuTabWrap
  }

  const closeTab = (e, path: string) => {
    // 关闭标签
    e.stopPropagation()
    if (tabList && tabList.length) {
      const _i = tabList.findIndex(tabList => tabList.path === path)
      if (tabList && tabList.length > 1) {
        const _arr = tabList.filter((e, i) => {
          return i !== _i
        })
        updateMenuTab(_arr)
        if (path === location.pathname) {
          if (_arr.length === 1) {
            setCurMenuTab(_arr[0].path)
            history.push(_arr[0].path)
          } else {
            history.go(-1)
          }
        }
      } else {
        // 目前暂不处理，后续改为 TODO: 返回dashborad页
        updateMenuTab([
          {
            path: dashboardPath,
            name: '展示菜单'
          }
        ])
        setCurMenuTab(dashboardPath)
        history.push(dashboardPath)
      }
    }
  }

  const closeCurTab = e => {
    closeTab(e, location.pathname)
  }

  const closeAllTabs = () => {
    updateMenuTab([
      {
        path: dashboardPath,
        name: '展示菜单'
      }
    ])
    setCurMenuTab(dashboardPath)
    history.push(dashboardPath)
    // 关闭全部标签
  }

  // 更新tabs
  const updateTabs = (type: string) => {
    const currentTabName = matchRouterPath(menu, location.pathname, [])
    let arr: any[] = []
    if (currentTabName) {
      switch (type) {
        case 'init':
          arr = tabList.concat([
            {
              name: currentTabName,
              path: location.pathname
            }
          ])
          break
        case 'closeOther':
          arr = [
            {
              name: currentTabName,
              path: location.pathname
            }
          ]
          break

        default:
          break
      }
      updateMenuTab(arr)
      setCurMenuTab(location.pathname)
    }
  }

  const closeOtherTabs = () => {
    // 关闭其他标签
    updateTabs('closeOther')
  }

  useEffect(() => {
    updateTabs('init')
  }, [])

  const tabControlContent = (
    <div className={style.tabControlPop}>
      <div
        onClick={e => {
          closeCurTab(e)
        }}
      >
        关闭当前标签页
      </div>
      <div
        onClick={() => {
          closeOtherTabs()
        }}
      >
        关闭其他标签页
      </div>
      <div
        onClick={() => {
          closeAllTabs()
        }}
      >
        关闭全部标签页
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex' }}>
      <div className={isTabControlShow()}>
        {tabList &&
          tabList.map(e => {
            return (
              <div
                key={e.name}
                className={isTabActive(e)}
                onClick={() => {
                  toggleTab(e.path)
                }}
              >
                <div key={e.name}>{e.name}</div>
                <div>
                  <CloseOutlined
                    className={style.tabClose}
                    onClick={item => {
                      closeTab(item, e.path)
                    }}
                  />
                </div>
              </div>
            )
          })}
      </div>
      <Popover content={tabControlContent} placement='bottomRight'>
        <div className={style.moreOut}>
          <MoreOutlined
            className={tabList && tabList.length > cTablimit ? style.showMore : style.hideMore}
          />
        </div>
      </Popover>
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    tabList: state.menuTab.menuTabList.list,
    currentTab: state.menuTab.currentTab
  }
}
const mapDispatchToProps = {
  updateMenuTab,
  setCurMenuTab
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuTab)
