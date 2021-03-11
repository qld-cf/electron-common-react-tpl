# create-react-app + electron

- [x] react 16.12
- [x] electron 9.1.0

#### 运行和打包

```
$ npm i
$ npm start
$ npm run build-react // web构建
$ npm run build-electron // electron构建
$ npm run pack // 当前系统类型打包
$ npm run pack-all // 所有平台类型打包
$ npm run lint // eslint检查
```

#### 目录

```
|————config --------------------- 启动和打包配置
| |————webpack.config.js
|————scripts -------------------- 启动和打包脚本
| |————build-analyze.js --------- 文件分析
| |————build.js ----------------- 打包
| |————start.js ----------------- 运行
| |————test.js ------------------ 测试
|————electron ------------------- 主进程
|————eslintRule ----------------- eslint规则
|————src ------------------------ 渲染进程
| |————api  --------------------- 业务逻辑层
| |————assets  ------------------ 全局公用文件
| | |————css  ------------------- css
| | |————images  ---------------- 图片
| | |————iconfont  -------------- 字体等
| |————common  ------------------ 全局通用常量
| |————components  -------------- 通用组件
| | |————common  ---------------- 子组件封装
| | | |————myList.tsx
| | | |————myForm.tsx
| | |————layout  ---------------- 布局
| | | |————header.tsx
| |————views  ------------------- 业务组件
| | |————settlement ------------- 业务模块
| | | |————Settlement.tsx
| | |————index.tsx -------------- 入口
| |————config ------------------- 全局配置
| | |————routerConfig.tsx  ------ 路由配置
| |————redux -------------------- redux
| | |————rootReducer.ts  -------- reducer集合
| | |————user.redux.ts  --------- state | action | reducer集成 | 按模块划分不同文件
| |————typings ------------------ 接口集合
| |————utils -------------------- 通用工具类
|————.eslintrc.js --------------- eslint入口
|————.prettierrc.js ------------- prettier
|————README.MD ------------------ 项目描述文件
|————SETTINGS.MD ---------------- 运行配置介绍
```
