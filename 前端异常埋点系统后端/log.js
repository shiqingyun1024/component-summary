const path = require('path')
const log4js = require('log4js');

log4js.configure({
  appenders: {
    info: {
      type: "dateFile",
      filename: path.join(__dirname, 'logs', 'info', 'info'),
      pattern: "yyyy-MM-dd.log", 
      encoding: 'utf-8', 

      alwaysIncludePattern: true, 
    },
    error: {// 错误日志
      type: 'dateFile',
      filename: path.join(__dirname, 'logs', 'error', 'error'),
      pattern: 'yyyy-MM-dd.log',
      encoding: 'utf-8', 
      alwaysIncludePattern: true
    }
  },
  categories: {
    default: { appenders: ['info'], level: 'info' },
    info: { appenders: ['info'], level: 'info' },
    error: { appenders: ['error'], level: 'error' }
  }
});


/**
 * 错误日志记录方式
 * @param {*} content 日志输出内容
 */
function logError(content) {
  const log = log4js.getLogger("error");
  log.error(content)
}
/**
 * 日志记录方式
 * @param {*} content 日志输出内容
 */
function logInfo(content) {
  const log = log4js.getLogger("info");
  log.info(content)
}

module.exports = {
  logError,
  logInfo
}