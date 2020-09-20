import React, { useState, useEffect } from 'react'
import { Button, Input, Row, Col, message, Modal } from 'antd'
import $cookie from 'js-cookie'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { ipcRenderer as ipc } from 'electron'
const { confirm } = Modal

const Login = (props: any & RouteComponentProps) => {
  const [loginInfo, setLoginInfo] = useState({
    env: '',
    token: ''
  })

  const changeLoginInfo = (type: string, value: any) => {
    setLoginInfo({ ...loginInfo, [type]: value })
  }

  const login = () => {
    if (!loginInfo.env || !loginInfo.token) {
      message.error('请输入上面信息在登录')
      return false
    }
    $cookie.set('env', loginInfo.env)
    $cookie.set('token', loginInfo.token)
    props.history.push('/app/settlement')
  }

  // 模拟 自动更新
  useEffect(() => {
    // 检测app自动更新

    const container = document.getElementById('container')
    console.log('ipc', ipc)
    if (ipc) {
      console.log('container', container)
      // 打包后才能进行主进程和渲染进程的交互
      ipc.send('checkForUpdate')
      ipc.on('message', (event, text) => {
        const message = document.createElement('div')
        message.innerText = text
        console.log('message', message)
        console.log('text', text)
        if (message && container) {
          container.appendChild(message)
        }
      })

      // 因为如果安装文件过小的话，很快就下载完成，导致没能达到触发条件。
      ipc.on('downloadProgress', (event, { percent }) => {
        console.log(percent)
      })

      // 接收到主进程有新的版本已经下载完成，询问是否更新。
      ipc.on('isUpdateNow', () => {
        confirm({
          title: '确定要现在升级吗？',
          content: '更新内容：...',
          onOk() {
            ipc.send('updateNow')
          },
          onCancel() {
            console.log(123)
          }
        })
      })
    }
  }, [])

  return (
    <div className='mid' style={{ flexDirection: 'column' }}>
      <Row className='' style={{ marginBottom: 15 }}>
        <Col span={12}>env:（dev,test,sit,pre）</Col>
        <Col span={12}>
          <Input
            style={{ width: 200 }}
            value={loginInfo.env}
            onChange={e => {
              changeLoginInfo('env', e.target.value)
            }}
          />
        </Col>
      </Row>

      <Row className='' style={{ marginBottom: 15 }}>
        <Col span={12}>token值</Col>
        <Col span={12}>
          <Input
            style={{ width: 200 }}
            value={loginInfo.token}
            onChange={e => {
              changeLoginInfo('token', e.target.value)
            }}
          />
        </Col>
      </Row>
      <div className='zh'>
        <Button type='primary' onClick={login}>
          登录
          </Button>
      </div>
      <div id='container' />
    </div>
  )
}

export default withRouter(Login)
