const nodeExcel = require('excel-export')

module.exports = function (_headers, rows) {
  var conf = {}
  conf.name = 'sheet1'
  conf.cols = []
  for (var i = 0; i < _headers.length; i++) {
    var col = {}
    col.caption = _headers[i].caption
    col.type = _headers[i].type
    conf.cols.push(col)
  }
  conf.rows = rows
  var result = nodeExcel.execute(conf)
  return result
}
