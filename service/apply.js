const db = require('../modal/mysql.js')
const moment = require('moment')

exports.submit = async (body) => {
  const isSubmited = await db.get('turning2017', {
    leaderMobile: body.leaderMobile
  })
  if (isSubmited) {
    throw new Error('该队伍已登记')
  }
  const data = Object.assign(body, {
    submitAt: moment().format('YYYY-MM-DD HH:mm:ss')
  })
  await db.insert('turning2017', data)
}

exports.download = async () => {
  const exportExcel = require('../utils/exportExcel')
  let result = await db.select('turning2017')
  const _headers = [{
    caption: '队伍序号',
    type: 'number'
  }, {
    caption: '队伍名称',
    type: 'string'
  }, {
    caption: '队长姓名',
    type: 'string'
  }, {
    caption: '队长学号',
    type: 'string'
  }, {
    caption: '队长班级',
    type: 'string'
  }, {
    caption: '使用语言',
    type: 'string'
  }, {
    caption: '队长手机号',
    type: 'string'
  }, {
    caption: '队长邮箱',
    type: 'string'
  }, {
    caption: '队员1姓名',
    type: 'string'
  }, {
    caption: '队员1学号',
    type: 'string'
  }, {
    caption: '队员1班级',
    type: 'string'
  }, {
    caption: '队员2姓名',
    type: 'string'
  }, {
    caption: '队员2学号',
    type: 'string'
  }, {
    caption: '队员2班级',
    type: 'string'
  }, {
    caption: '提交时间',
    type: 'string'
  }]
  const rows = result.map(t => Array.from(t))
  const excel = exportExcel(_headers, rows)
  return excel
}
