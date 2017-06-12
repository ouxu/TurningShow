
module.exports = (type) => {
  const verifyMap = {
    mobile: /^1[3|4|5|7|8][0-9]\d{8}$/,
    password: /^\w{6,18}$/,
    mail: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
    phone: /^1\d{10}$/g,
    stuCode: /^\d{2,}$/,
    qq: /[1-9][0-9]{4,}/,
    number: /^[0-9]\d*$/,
    age: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/,
    chinese: /[\u4E00-\u9FA5\uF900-\uFA2D]/,
    IDCard: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
  }
  return verifyMap[type]
}
