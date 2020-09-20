> 2020/03/02
###### 多主题配置

1. webpack
```
// 新增
const lessRegex = /\.less$/;
```
// 应用
```
{
  test: lessRegex,
  // exclude: lessModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 1,
      sourceMap: isEnvProduction && shouldUseSourceMap
    },
    'less-loader'
  ),
  // Don't consider CSS imports dead code even if the
  // containing package claims to have no side effects.
  // Remove this when webpack adds a warning or an error for this.
  // See https://github.com/webpack/webpack/issues/6571
  sideEffects: true
},
```
// loader

```
if (preProcessor === 'less-loader') { // 如果为less-loader则修改主题色
  loaders.push({
    loader: require.resolve(preProcessor),
    options: {
      sourceMap: isEnvProduction && shouldUseSourceMap,
      modules: false,
      modifyVars: require('./antTheme').commonTheme,
      javascriptEnabled: true
    }
  });
}
```

2. 主题选择和配置(config/antTheme)

```
module.exports = {
  commonTheme: {
    'primary-color': '#A14EFF',
    'link-color': '#4a90e2',
    'font-family': '"futura-pt", sans-serif',
    'line-height-base': 1.3
  },
  otherTheme: {
    'primary-color': '#008B8B',
    'link-color': '#4a90e2',
    'font-family': '"futura-pt", sans-serif',
    'line-height-base': 1.3
  }
};

```

---
> 2020/03/09
###### 移除sass，使用less

[参考](https://less.bootcss.com/)

###### 开放electron版本不锁定


---
> 2020/03/27 同步最新功能和优化细节
###### 优化路由层级
###### 优化布局
###### 新结构
###### 新表单、表格组件


