const db = require('../modal/mysql.js')
const moment = require('moment')

exports.submitTurning = async (body) => {
  // const isSubmited = await db.get('turning', {
  //   leaderMobile: body.leaderMobile
  // })
  // if (isSubmited) {
  //   throw new Error('该队伍已登记')
  // }
  const data = Object.assign(body, {
    submitAt: moment().format('YYYY-MM-DD HH:mm:ss')
  })
  await db.insert('turning', data)
}

exports.submitTurningOnline = async (body) => {
  // const isSubmited = await db.get('turingOnline', {
  //   leaderMobile: body.leaderMobile
  // })
  // if (isSubmited) {
  //   throw new Error('该队伍已登记')
  // }
  const data = Object.assign(body, {
    submitAt: moment().format('YYYY-MM-DD HH:mm:ss')
  })
  await db.insert('turingOnline', data)
}

exports.submitInnovation = async (body) => {
  const isSubmited = await db.get('innovation', {
    mobile: body.mobile
  })
  if (isSubmited) {
    throw new Error('该手机号码已登记')
  }
  const data = Object.assign(body, {
    submitAt: moment().format('YYYY-MM-DD HH:mm:ss')
  })
  const result = await db.insert('innovation', data)
  return result.insertId
}

exports.submitSpecial = async (body) => {
  const isSubmited = await db.get('special', {
    mobile: body.mobile
  })
  if (isSubmited) {
    throw new Error('该手机号码已登记')
  }
  const data = Object.assign(body, {
    submitAt: moment().format('YYYY-MM-DD HH:mm:ss')
  })
  await db.insert('special', data)
}

exports.download = async (type) => {
  const exportExcel = require('../utils/exportExcel')

  let result = await db.select(type)
  const typeHeader = {
    'turning': [{
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
    }],
    'innovation': [{
      caption: '序号',
      type: 'number'
    }, {
      caption: '问题1',
      type: 'string'
    }, {
      caption: '问题2',
      type: 'string'
    }, {
      caption: '问题3',
      type: 'string'
    }, {
      caption: '问题4',
      type: 'string'
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
      caption: '提交时间',
      type: 'string'
    }],
    'special': [{
      caption: '序号',
      type: 'number'
    }, {
      caption: '姓名',
      type: 'string'
    }, {
      caption: '性别',
      type: 'string'
    }, {
      caption: '单位',
      type: 'string'
    }, {
      caption: '手机号',
      type: 'string'
    }, {
      caption: '提交时间',
      type: 'string'
    }],
    'turingOnline': [{
      caption: '队伍序号',
      type: 'number'
    }, {
      caption: '队伍名称',
      type: 'string'
    }, {
      caption: '队长姓名',
      type: 'string'
    }, {
      caption: '队长学校',
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
      caption: '队员1x学校',
      type: 'string'
    }, {
      caption: '队员2姓名',
      type: 'string'
    }, {
      caption: '队员2学校',
      type: 'string'
    }, {
      caption: '提交时间',
      type: 'string'
    }],
    'certreq': [{
      caption: '序号',
      type: 'number'
    }, {
      caption: '队长姓名',
      type: 'string'
    }, {
      caption: '队长手机号',
      type: 'string'
    }, {
      caption: '队长邮箱',
      type: 'string'
    }, {
      caption: '是否需要证书',
      type: 'string'
    }, {
      caption: '队员1姓名',
      type: 'string'
    }, {
      caption: '队员2姓名',
      type: 'string'
    }, {
      caption: '地址省市',
      type: 'string'
    }, {
      caption: '详细地址',
      type: 'string'
    }, {
      caption: '邮编',
      type: 'string'
    }, {
      caption: '提交时间',
      type: 'string'
    }, {
      caption: '备注',
      type: 'string'
    }]
  }
  const _headers = typeHeader[type]
  const rows = result.map(t => Array.from(t))
  const excel = exportExcel(_headers, rows)
  return excel
}

exports.verifyTeam = async (body) => {
  const verifyValues = await db.get('turingOnline', {
    leaderMobile: body.leaderMobile
  })
  if (!verifyValues) {
    throw new Error('无该队伍信息或未在本系统登记过，请核对后重新提交')
  }
  if (verifyValues.leaderName !== body.leaderName) {
    throw new Error('队长手机与登记姓名不匹配，请核对后重新提交')
  }
  const preValues = await db.get('certreq', {
    leaderMobile: body.leaderMobile
  })
  return preValues || verifyValues
}

exports.applyCertrep = async (body) => {
  const verify = await db.get('certreq', {
    leaderMobile: body.leaderMobile
  })
  if (!verify) {
    const data = Object.assign(body, {
      submitAt: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    await db.insert('certreq', data)
  } else {
    const data = Object.assign(body, {
      id: verify.id,
      submitAt: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    await db.update('certreq', data)
  }
}
