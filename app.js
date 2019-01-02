//app.js
App({
  onLaunch: function (options) {
    // Do something initial when launch.
    // console.log('onLaunch')

  },
  onShow: function (options) {
    // Do something when show.
    // console.log('onShow')

  },
  onHide: function () {
    // Do something when hide.
    // console.log('onHide')

  },
  onError: function (msg) {
    console.log(msg)
    console.log('onError')

  },
  /*公共post请求封装*/
  postAjax: function (url, data, callback = function () { }) {

    var token = this.globalData.token;
    var source = this.globalData.source;
    wx.request({
      url: this.globalData.sourceUrl + url,
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "token": token,
        "source": source
      },
      success: function (res) {
        if (res.data.code == -1) {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          });
        }
        callback(res);
      },
      fail: function (err) {
        callback(err);
      }
    })
  },
  getAjax: function (url, data, callback = function () { }) {

    var token = this.globalData.token;
    var source = this.globalData.source;
    wx.request({
      url: this.globalData.sourceUrl + url,
      method: 'Get',
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "token": token,
        "source": source

      },
      success: function (res) {
        callback(res);
      },
      fail: function (err) {
        callback(err);
      }
    })
  },
  globalData: {
    userInfo: null,
    sourceUrl: 'https://apis.minyijiaren.com/',
    token: '',
    source: 'wxApp',
    imgUrl:'http://file.kuailaixiaoxian.com/',
    configData:{},    //配置的信息
  }
})