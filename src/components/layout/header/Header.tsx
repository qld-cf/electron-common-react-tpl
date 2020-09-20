import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
// import apis from '@api/'
// import { connect } from 'react-redux'
// import moment from 'moment'
import { Button } from 'antd'
import style from './header.less'
import bgImg from '@images/nav-bg.jpg'
import ypStore from '@utils/ypStore/'

const headerStyle = {
  background: `url(${bgImg}) no-repeat`,
  backgroundSize: 'cover'
}

const MyHeader = () => {
  const history = useHistory()
  const loginOut = () => {
    ypStore.save('token', '')
    history.push('/login')
  }
  return (
    <div className={style.header} style={headerStyle}>
      <h1>APP</h1>
      <Button onClick={loginOut} type='primary'>
        退出
      </Button>
    </div>
  )
}

export default MyHeader
