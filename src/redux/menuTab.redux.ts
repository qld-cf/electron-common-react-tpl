/**
 * 路由标签控制
 */
import update from 'immutability-helper'
import { Dispatch } from 'redux'
import { ITabList } from '@typings/common.d'

// types
const UPDATE_MENUTAB_LIST = 'UPDATE_MENUTAB_LIST'
const UPDATE_CURRENT_TAB = 'UPDATE_CURRENT_TAB'

// interface
interface IInitState {
  menuTabList: ITabList,
  currentTab: ''
}

// state
const initState: IInitState = {
  menuTabList: {
    list: [],
  },
  currentTab: ''
}

// actions

function actionAddMenuTabs(tabList: ITabList) {
  return {
    type: UPDATE_MENUTAB_LIST,
    payload: tabList
  }
}

function actionSetMenuTab(tab: string) {
  return {
    type: UPDATE_CURRENT_TAB,
    payload: tab
  }
}

// 更新tabs
export function updateMenuTab(data: ITabList) {
  return async (dispatch: Dispatch, getState: any) => {
    dispatch(
      actionAddMenuTabs({
        ...getState().menuTabList,
        list: data,
      })
    )
  }
}

// 设置当前tab
export function setCurMenuTab(data: string) {
  return async (dispatch: Dispatch, getState: any) => {
    dispatch(
      actionSetMenuTab(data)
    )
  }
}

// reducer
export default function menuTab(state = initState, action: { type: string; payload: any }) {
  switch (action.type) {
    case UPDATE_MENUTAB_LIST:
      return update(state, {
        menuTabList: {
          $set: action.payload
        }
      })
    case UPDATE_CURRENT_TAB:
      return update(state, {
        currentTab: {
          $set: action.payload
        }
      })
    default:
      return state
  }
}
