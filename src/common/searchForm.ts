const searchForm = [

  {
    type: 'COMMON_SELECT',
    label: '状态',
    placeholder: '请选择',
    field: 'status',
    width: '',
    list: [
      { value: 1, name: '全部' },
      { value: 2, name: '待审核' },
      { value: 3, name: '已审核' }
    ], // CREATED:已创建, SETTLED:已结算, CHECKED:已核对, RECEIVED:已到账, CLOSED已关闭
    initialValue: '',
    span: 6,
    tips: '请选择状态'
  },
  {
    type: 'COMMON_DATE',
    showTime: false,
    label: '账期日',
    placeholder: '请选择',
    field: 'accountDate',
    width: '',
    span: 6,
    allowClear: true,
    initialValue: null,
    tips: '请选择账期日'
  },
  {
    type: 'COMMON_RANGE_DATE',
    label: '审核时间',
    allowClear: true,
    showTime: true,
    tips: '请选择审核时间',
    field: 'shenghe',
    width: '220',
    format: 'YYYY-MM-DD HH:mm:ss',
    span: 12
    // initialValue: null
  }
];

export default searchForm;
