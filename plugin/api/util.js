const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function randomString(str) {
  var d, e, b = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    c = ""
  for (d = 0; str > d; d += 1) {
    e = Math.random() * b.length
    e = Math.floor(e)
    c += b.charAt(e)
  }
  return c
}

function randomString2(str) {
  var d, e, b = "0123456789", c = ""
  for (d = 0; str > d; d += 1) {
    e = Math.random() * b.length
    e = Math.floor(e)
    c += b.charAt(e)
  }
  return c
}

function formAtText(sentences) {
  var res = ''
  for (var i = 0; i < sentences.length; i++) {
    res += sentences[i].text
  }
  return res
}

function recordTime(date) {

  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()

  return [month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
}
//由日期格式2018-11-20转换为2018年11月20日
function dateTimeFormat(date) {
  var date = date.replace(/^(\d{4})-(\d{1,2})-(\d{1,2})$/, "$1年$2月$3日");
  return date
}

//由日期格式2018-12-04 12:00:00 转换成2018年12月04日 12:00

function fullTimeFormat(remind_time){
  let date_time = remind_time.split(" ")
  let date = dateTimeFormat(date_time[0])
  let time = date_time[1].slice(0,5)
  return date+" "+time
}

//秒转换成 分：秒
function secondToMinute(seconds) {
  var minute = seconds / 60 >= 10 ? parseInt(seconds / 60) : '0' + parseInt(seconds / 60)
  var sec = seconds % 60 >= 10 ? parseInt(seconds % 60) : '0' + parseInt(seconds % 60)
  return minute + ':' + sec
  // console.log(minute + ':' + sec)
}


//日期转换成星期如：2019-01-10  转换成周几
function date2Week(date){
  var weekArray = ['周日','周一','周二','周三','周四','周五','周六']
  return weekArray[new Date(Date.parse(date.replace(/-/g,"/"))).getDay()]
}
module.exports = {
  formatTime: formatTime,
  randomString: randomString,
  formAtText: formAtText,
  recordTime: recordTime,
  dateTimeFormat: dateTimeFormat,
  secondToMinute: secondToMinute,
  randomString2: randomString2,
  fullTimeFormat: fullTimeFormat,
  date2Week: date2Week
}