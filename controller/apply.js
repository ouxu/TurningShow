const applyService = require('../service/apply.js')
exports.test = async (ctx, next) => {
  ctx.body = 'test'
}

exports.submit = async (ctx, next) => {
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
    memberClass1: 'string',
    memberName2: 'string',
    memberStuId2: 'string',
    memberClass2: 'string'
  }
  try {
    ctx.verifyParams(createRule)
  } catch (e) {
    console.log('Error: ' + e.message)
    ctx.throw('输入格式有误，请认真核对！')
  }
  await applyService.submit(ctx.request.body)
  ctx.status = 200
}

exports.download = async (ctx, next) => {
  const secret = ctx.querystring
  const SECRET = 'ACMCLUB2017'
  if (!secret) {
    throw new Error('未输入密码')
  }
  if (secret !== SECRET) {
    throw new Error('密码错误')
  }
  const result = await applyService.download()
  let data = new Buffer(result, 'binary')
  ctx.set('Content-Type', 'application/vnd.openxmlformats')
  ctx.set('Content-Disposition', 'attachment; filename=' + 'result-' + Date.now() + '.xlsx')
  ctx.body = data
}
