module.exports = (pattern) => {
  return async (ctx, next) => {
    await next()
    const reg = new RegExp(pattern)
    const download = /^((?!download).)+$/
    if (download.test(ctx.originalUrl) && reg.test(ctx.originalUrl) && ctx.status === 200) {
      ctx.body = {
        success: true,
        data: ctx.body
      }
    }
  }
}
