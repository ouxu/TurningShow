const db = require('../modal/mysql.js')
const moment = require('moment')

exports.submitTurning = async (body) => {
  const isSubmited = await db.get('turning', {
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

exports.submitInnovation = async (body) => {
  const isSubmited = await db.get('innovation', {
    mobile: body.mobile
  })
  if (isSubmited) {
    throw new Error('该队伍已登记')
  }
  const data = Object.assign(body, {
    submitAt: moment().format('YYYY-MM-DD HH:mm:ss')
  })
  await db.insert('innovation', data)
}

exports.download = async (type) => {
  const exportExcel = require('../utils/exportExcel')
  const ACM = 'turning'

  let result = await db.select(type)
  const _headers = type === ACM ? [{
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
    caption: '队长专业',
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
    caption: '队员1专业',
    type: 'string'
  }, {
    caption: '队员2姓名',
    type: 'string'
  }, {
    caption: '队员2学号',
    type: 'string'
  }, {
    caption: '队员2专业',
    type: 'string'
  }, {
    caption: '提交时间',
    type: 'string'
  }] : [{
    caption: '序号',
    type: 'number'
  }, {
    caption: '姓名',
    type: 'string'
  }, {
    caption: '性别',
    type: 'string'
  }, {
    caption: '专业',
    type: 'string'
  }, {
    caption: '学号',
    type: 'string'
  }, {
    caption: '手机号',
    type: 'string'
  }, {
    caption: '邮箱',
    type: 'string'
  }, {
    caption: '提交时间',
    type: 'string'
  }]
  const rows = result.map(t => Array.from(t))
  const excel = exportExcel(_headers, rows)
  return excel
}
