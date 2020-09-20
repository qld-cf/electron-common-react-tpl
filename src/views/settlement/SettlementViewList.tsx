import React from 'react'
import { Button, Alert, Table, Badge } from 'antd'
import styles from './receive.less'

const SettlementViewList = () => {
  const columns = [
    {
      title: '货主',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      sorter: true
      // sortOrder: sorter.field === 'name' && sorter.order,
    },
    {
      title: '收货单号',
      dataIndex: 'age',
      key: 'age',
      width: 140,
      sorter: true
    },
    {
      title: '来源单号',
      dataIndex: 'address',
      key: 'address',
      width: 100
    },
    {
      title: '状态',
      dataIndex: 'addr3ess',
      key: 'addr3ess',
      width: 90,
      render: text => (
        <div>
          <Badge status='warning' />
          {status[text]}
        </div>
      )
    },
    {
      title: '业务类型',
      dataIndex: 'addfress',
      key: 'addfress',
      width: 100
    },
    {
      title: '种类/数量',
      dataIndex: 'addgress',
      key: 'addgress',
      width: 100
    },
    {
      title: '供应商',
      dataIndex: 'addrsess',
      key: 'addrsess',
      width: 100
    },
    {
      title: '来源地点',
      dataIndex: '433',
      key: '433',
      width: 90
    },
    {
      title: '联系人',
      dataIndex: 'dddad',
      key: 'dddad',
      width: 130
    },
    {
      title: '联系电话',
      dataIndex: 'ffds',
      key: 'ffds',
      width: 140
    },
    {
      title: '验收打印次数',
      dataIndex: 'k',
      key: 'k',
      width: 130
    },
    {
      title: '关闭人',
      dataIndex: 'fff',
      key: 'fff',
      width: 100
    },
    {
      title: '取消人',
      dataIndex: 'ggg',
      key: 'ggg',
      width: 100
    },
    {
      title: '制单人',
      dataIndex: 'okoo',
      key: 'okoo',
      width: 100
    },
    {
      title: '创建时间',
      dataIndex: 'ji',
      key: 'ji',
      width: 160
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: () => <a>action</a>,
    }
  ]
  return (
    <div>
      HTML
    </div>
  )
}

export default SettlementViewList
