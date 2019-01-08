const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const crtTimeFtt = function (val, row) {
  
  if (val != null) {
    var date = new Date(val * 1000);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  crtTimeFtt: crtTimeFtt
}
