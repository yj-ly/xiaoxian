//获取应用实例
const app = getApp();
Page({
  data: {
    isShow: false,
    loginModel: [],
    page: '',
    url: ''
  },
  onLoad: function (options) {
    console.log(this.data.url)

    this.data.page = options.page
    let keyArray = []
    if (JSON.stringify(options) != '{}') {
      for (var i in options) {
        keyArray.push(i)
      }
      let isFirstValue = true
      for (let i = 0; i < keyArray.length; i++) {
        if (keyArray[i] == 'page') {
          this.data.url = options.page + this.data.url
        } else if (isFirstValue) {
          this.data.url = this.data.url + `?${keyArray[i]}=${options[keyArray[i]]}`
          isFirstValue = false
        } else {
          this.data.url = this.data.url + `&${keyArray[i]}=${options[keyArray[i]]}`
        }
        // if (i == 0) {
        //   this.data.url += options.page
        // } else if (i == 1) {
        //   this.data.url +=`?${keyArray[i]}=${options[keyArray[i]]}`
        // } else {
        //   this.data.url +=`&${keyArray[i]}=${options[keyArray[i]]}`
        // }
      }
      console.log(this.data.url)
    }
  },
  /**
   * 用户授权登录
   */
  applyLogin() {
    wx.getSetting({
      success: res => {
        wx.showLoading({
          title: '登陆中'
        });
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              //获取用户token
              var data = {
                openid: this.data.loginModel.openid,
                unionid: this.data.loginModel.unionid,
                nick: res.userInfo.nickName,
                sex: res.userInfo.gender,
                picture: res.userInfo.avatarUrl,
                loginType: 4
              }
              app.postAjax('v1/user/login', data, this.loginCall)
            }
          })
        }
      }
    })

  },
  onShow: function () {
    console.log('触发');
    wx.showLoading({
      title: '正在加载'
    });
    // 登录
    
    wx.login({
      success: res => {
   
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        app.postAjax('common/wechatApply', {
          code: res.code
        }, this.applyCall);
      }
    })
  },
  /**
   * 授权回调 
   */
  applyCall(res) {
    //判断用户是否存在
    if (res.data.code == 200) {
      app.globalData.token = res.data.token;
      app.getAjax('v1/user/info', {}, this.getUserInfoCall);
      app.getAjax('v1/user/info', {}, this.getUserInfoCall);
      return false;
    }
    this.setData({
      isShow: true,
      loginModel: res.data.result
    });
    wx.hideLoading()
  },
  /**
   * 登陆回调
   */
  loginCall(res) {
    if (res.data.code == 200) {
      app.globalData.token = res.data.token;
      app.getAjax('v1/user/info', {}, this.getUserInfoCall);
      return false;
    }
    wx.hideLoading()
  },
  /** 
   * 获取个人信息回调
   */
  getUserInfoCall(res) {
    if (res.data.code == 200) {
      app.globalData.userInfo = res.data.result;
      let page = this.data.page
      if (page) {
        let barPage = page.split('/')[2]
        wx.setStorageSync('jumpPage', this.data.url)
        wx.redirectTo({
          url: `/pages/${barPage}/index/index`,
        })
      } else {
       console.log(1);
        wx.redirectTo({
          url: '/pages/my/my'
        })
      }
    }
  },
})