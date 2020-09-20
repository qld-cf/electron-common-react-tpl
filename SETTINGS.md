
#### 引入alloy eslint

> 准备

```
 npm i
 eslint-config-alloy@latest
 @typescript-eslint/eslint-plugin@latest
 eslint-plugin-react@latest
 @typescript-eslint/parser@latest
  --save-dev
```

1. 添加.eslinrc.js

```

const baseRule = require('./eslintRule/eslintBaseRule')
const reactRule = require('./eslintRule/eslintReactRule')
const Tsule = require('./eslintRule/eslintTsRule')
module.exports = {
  extends: [
        'alloy',
        'alloy/react',
        'alloy/typescript',
  ],
  env: {
      // 你的环境变量（包含多个预定义的全局变量）
      //
      browser: true,
      // node: true,
      // mocha: true,
      // jest: true,
      // jquery: true
  },
  globals: {
      // 你的全局变量（设置为 false 表示它不允许被重新赋值）
      //
      // myGlobal: false
  },
  rules: {...baseRule,...reactRule,...Tsule}
};
```

2. 添加不同类型rule

 - 新建 eslint/BaseRule.js
 - 添加和调整对应配置

"off" 或 0 - 关闭这项规则

"warn" 或 1 - 将规则视为一个警告

"error" 或 2 - 将规则视为一个错误


#### prettier

 - 安装vscode 'prettier format'插件，重启

1. 修改vscode setting.json
```

  {
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "vue",
            "autoFix": true
        },
        {
            "language": "typescript",
            "autoFix": true
        },
        {
            "language": "typescriptreact",
            "autoFix": true
        }
    ]
}

{
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "vue",
        "typescript",
        "typescriptreact"
    ]
}

// 不建议开启，在其他项目格式化可能会引发合并代码冲突(所有文件保存时候自动按照插件prettier格式化)
  "editor.formatOnSave": true,

```

2. alloy把prettier抽出来了，所以关于缩进等的格式化暂时比较好的办法是右键选择prettier格式化

修改vscode setting.json
```
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

```

[参考](https://github.com/AlloyTeam/eslint-config-alloy/issues/140)


##### eslint文件全检查

`eslint --ext .js,.jsx,.ts,.tsx ./src`


#### 配置项目模块别名 | 便于开发整理归纳
```
// 1.webpack添加配置配置 | config/webpack.config.js
const resolvePath = function (dir) {
  return path.join(__dirname, '..', dir)
}
...
alias: {
  // 增加如下配置
  '@cps': resolvePath('/src/components'),
  '@cts': resolvePath('/src/containers'),
  '@redux': resolvePath('/src/redux'),
  '@utils': resolvePath('/src/utils')
}
...

// 2.配置tscongfig.json
...
"baseUrl": "src",
"paths": {
  "@cps/*": [
    "components/*"
  ],
  "@cts/*": [
    "containers/*"
  ],
  "@redux/*": [
    "redux/*"
  ],
  "@utils/*": [
    "utils/*"
  ]
}

// 配置结束后需要重启项目
```


#### antd/antd-mobile

> 默认引入antd库, 可根据需要自行移除和添加新库

```
// 修改package.json
  "plugins": [
    [
      "import",
      {
        "libraryName": "antd-mobile",
        "style": "css"
      }
    ],
    [
      "import",
      {
        "libraryName": "antd",
        "style": "css"
      }
    ],
// 修改webpack.config.js

[
  require.resolve('babel-plugin-import'),
  { libraryName: 'antd-mobile', style: 'css' },
],
[
  require.resolve('babel-plugin-import'),
  { libraryName: 'antd', style: 'css' },
  'antd'
]

```

#### 生产环境 - 打包移除console |debugger
```
// 修改webpack.config.js
  new TerserPlugin({
    terserOptions: {
      compress: {
        ecma: 5,
        warnings: false,
        comparisons: false,
        inline: 2,
        drop_debugger: true, // 去除所有的debugger
        drop_console: true // 去除所有的console
      },
    }
```
#### 打包去除.map文件
```
// 修改webpack.config.js

devtool: isEnvProduction
      ? shouldUseSourceMap
        ? 'source-map'
        : false
      : isEnvDevelopment && 'cheap-module-source-map'

=>

devtool: isEnvProduction
      ? false
      : isEnvDevelopment && 'cheap-module-source-map'
```
#### 项目分析:
  ```
  // 前提：webpack关于map移除部分需要还原
  // 安装source-map-explorer
  npm install --save-dev source-map-explorer
  // 运行
  npm run build
  npm run analyze
  ```

#### redux
```
// actions、state、reducers等集中写到同一个文件便于管理 / 按模块划分 如 user.redux.ts
import update from 'immutability-helper';
import { Dispatch } from 'redux';
import { IUser } from '@typings/common.typing';

// types
const USER = 'USER';

// interface
interface IInitState {
  user: IUser;
}

// state
const initState: IInitState = {
  user: {}
};

// actions
/** 设置菜单选择的角色 */
export function setUser (userInfo: IUser) {
  return {
    type: USER,
    payload: userInfo
  };
}

// reducer
export default function user (state = initState, action: { type: string; payload: any }) {
  switch (action.type) {
    case USER:
      return update(state, {
        user: {
          $set: action.payload
        }
      });
    default:
      return state;
  }
}

```


#### 其他插件

1.  [Reactjs code snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets)
2. [参考](https://juejin.im/entry/599d4cb96fb9a024a27bf090)


###### 配置完毕请重启vscode
