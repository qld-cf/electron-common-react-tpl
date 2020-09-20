const menu = [
  {
    id: 389,
    parentId: 0,
    name: '结算管理',
    route: '/app',
    icon: 'sliders',
    children: [
      {
        id: 391,
        parentId: 389,
        name: '记账',
        route: '/app/settlement',
        icon: 'double-right',
        children: [],
      }
    ],
  },
  {
    id: 391,
    parentId: 0,
    name: '一级菜单',
    route: '/menu1',
    icon: 'deployment-unit',
    children: [
      {
        id: 392,
        parentId: 391,
        name: '二级菜单',
        route: '/menu1',
        icon: 'double-right',
        children: [
          {
            id: 392,
            parentId: 391,
            name: '三级菜单',
            route: '/menu3',
            icon: 'double-right',
            children: [],
          }
        ],
      }
    ],
  }
]

export default menu
