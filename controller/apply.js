const applyService = require('../service/apply.js')
exports.test = async (ctx, next) => {
  ctx.body = 'test'
}

exports.submitTurning = async (ctx, next) => {
  const createRule = {
    teamName: 'string',
    leaderName: 'string',
    leaderStuId: 'string',
    leaderClass: 'string',
    teamLanguage: 'string',
    leaderMobile: /(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7}/ig,
    leaderMail: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
    memberName1: 'string',
    memberStuId1: 'string',
    memberClass1: 'string'
  }
  try {
    ctx.verifyParams(createRule)
  } catch (e) {
    console.log('Error: ' + e.message)
    ctx.throw('输入格式有误，请认真核对！')
  }
  await applyService.submitTurning(ctx.request.body)
  ctx.status = 200
}
exports.submitSpecial = async (ctx, next) => {
  const createRule = {
    name: 'string',
    sex: 'string',
    mobile: /(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7}/ig,
    email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
  }
  try {
    ctx.verifyParams(createRule)
  } catch (e) {
    console.log('Error: ' + e.message)
    ctx.throw('输入格式有误，请认真核对！')
  }
  await applyService.submitSpecial(ctx.request.body)
  ctx.status = 200
}
exports.submitInnovation = async (ctx, next) => {
  const createRule = {
    knowLoss: 'string',
    knowConnect: 'string',
    knowTheory: 'string',
    knowBitCoin: 'string',
    name: 'string',
    sex: 'string',
    major: 'string',
    stuId: 'string',
    mobile: /(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7}/ig,
    email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
  }
  try {
    ctx.verifyParams(createRule)
  } catch (e) {
    console.log('Error: ' + e.message)
    ctx.throw('输入格式有误，请认真核对！')
  }
  const insertId = await applyService.submitInnovation(ctx.request.body)
  ctx.body = {
    applyId: insertId
  }
}

exports.download = async (ctx, next) => {
  const {password, type} = ctx.query
  const PASSWORD = 'ACMCLUB2017'
  console.log(password, type)
  if (!password) {
    throw new Error('未输入密码')
  }
  if (!type) {
    throw new Error('未指定导出数据')
  }
  if (password !== PASSWORD) {
    throw new Error('密码错误')
  }
  if (type !== 'turning' && type !== 'special' && type !== 'innovation') {
    throw new Error('指定数据表名错误')
  }
  const result = await applyService.download(type)
  let data = new Buffer(result, 'binary')
  ctx.set('Content-Type', 'application/vnd.openxmlformats')
  ctx.set('Content-Disposition', 'attachment; filename=' + type + Date.now() + '.xlsx')
  ctx.body = data
}
