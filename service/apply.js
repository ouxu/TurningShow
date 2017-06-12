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
  const typeHeader = require('../utils/downloadConfig')
  let result = await db.select(type)

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
    leaderName: body.leaderName
  })
  if (!preValues) {
    throw new Error('该队伍未获奖')
  }
  return preValues.submitAt ? preValues : verifyValues
}

exports.applyCertrep = async (body) => {
  const verify = await db.get('certreq', {
    leaderName: body.leaderName
  })
  const data = Object.assign(body, {
    id: verify.id,
    submitAt: moment().format('YYYY-MM-DD HH:mm:ss')
  })
  await db.update('certreq', data)
}

exports.turingFeedback = async (body) => {
  const data = Object.assign(body, {
    submitAt: moment().format('YYYY-MM-DD HH:mm:ss')
  })
  await db.insert('turing_feedback', data)
}
