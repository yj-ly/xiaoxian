const app = getApp();
var md5 = require('../../utils/md5.js');
var util = require('../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js');
var template = require('../compontent/footertab/footertab.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexClass: 0, //更换tab的样式
    list: [], //优惠券列表
    detailMsg: {}, //详情的数据
    showDiscountModel: false, //展示优惠券的弹出层
    showPayModel: false, //展示支付的弹出层
    payModel: {
      courseId: '', //系列课的id
      userCouponId: '', //优惠券的id
      payMoney: 0, //需要支付的钱
    },
    deductionMoney: 0, //优惠抵扣的钱
    judgeAudios: true, //判断用户有没有点击播放音频 
    imgUrl:'',      //图片的前面部份
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      'payModel.courseId': options.courseId
    })
    app.getAjax('v1/course/getInfo', {
      'courseId': this.data.payModel.courseId
    }, this.getUserListCall);
  },
  //获取系统课程的详情
  getUserListCall(res) {
    if (res.data.code == 200) {
      this.setData({
        detailMsg: res.data.result,
        'payModel.payMoney': res.data.result.money,
        'detailMsg.starTime': util.crtTimeFtt(res.data.result.starTime)
      })
      var article = this.data.detailMsg.detaile;
      WxParse.wxParse('article', 'html', article, this, 5);
    }
  },
  //展示支付弹框 
  showPayModelChnage() {
    if (this.data.showPayModel) {
      this.setData({
        showPayModel: false,
      })
    } else {
      this.setData({
        showPayModel: true,
      })
    }
  },

  //展示优惠券的弹框 
  showDiscountChange() {
    if (this.data.showDiscountModel) {
      this.setData({
        showDiscountModel: false
      })
    } else {
      this.setData({
        showDiscountModel: true
      })
    }

  },


  //选中优惠券
  setDiscount(e) {
    // let strIndex = this.data.;
    for (let i = 0; i < this.data.list.length; i++) {
      var up = "list[" + i + "].selectBoole"; //先用一个变量，把(info[0].selcetBoole)用字符串拼接起来
      this.setData({
        [up]: false
      })

    }
    var item = "list[" + e.currentTarget.dataset.index + "].selectBoole"
    this.setData({
      [item]: true,
      'payModel.userCouponId': e.currentTarget.dataset.id
    })
    let money = Number(this.data.detailMsg.money) - Number(e.currentTarget.dataset.money);
    if (money <= 0) {
      this.setData({
        'payModel.payMoney': 0,
        deductionMoney: this.data.detailMsg.money
      })

    } else {
      this.setData({
        'payModel.payMoney': money,
        deductionMoney: money,
      })
    }

  },

  //支支付
  pay() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    app.postAjax('v1/order/pay', this.data.payModel, this.payCall);
  },
  //支付函数的回调
  payCall(res) {
    wx.hideLoading();
    if (res.data.code == 200) { //200 是直接支付成功
      wx.showToast({
        title: res.data.message,
        mask: true,
        icon: 'none'
      })
      this.showPayModelChnage();
      app.getAjax('v1/course/getInfo', {
        'courseId': this.data.payModel.courseId
      }, this.getUserListCall);
      app.getAjax('v1/user/coupon/list', {}, this.getUserList);
    } else if (res.data.code == 208) { // 去接真正的支付
    let that = this;
      var timeStamp = (Date.parse(new Date()) / 1000).toString();
      var pkg = 'prepay_id=' +  res.data.result.prepay_id;
      var nonceStr = res.data.result.nonce_str;
      var paySign = md5.hexMD5(`appId=${res.data.result.appid}&nonceStr=${nonceStr}&package=${pkg}&signType=MD5&timeStamp=${timeStamp}&key=45c52253b41e84e7b3bfda9d25219815`).toUpperCase();
      console.log(paySign);
      wx.requestPayment({
        timeStamp: timeStamp,
        nonceStr: nonceStr,
        package: pkg,
        signType: 'MD5',
        paySign: paySign,
        success: function(res) {
          console.log(res);
          that.showPayModelChnage();
          app.getAjax('v1/course/getInfo', {
            'courseId': that.data.payModel.courseId
          }, that.getUserListCall);
          app.getAjax('v1/user/coupon/list', {}, that.getUserList);
          wx.showToast({
            title: '支付成功',
          })
        },
        fail: function(res) {
          // fail
          console.log(res);
        }
      })

    } else if (res.data.code == 203) { // 还没有到购买的时间
      wx.showToast({
        title: res.data.message,
        mask: true,
        icon: 'none'
      })
    }
  },

  //播放音频
  audioPlay() {

   
    if (this.data.judgeAudios) {
      this.audioCtx.play();
      this.setData({
        judgeAudios: false
      })
      console.log(this.audioCtx.pay());
      console.log('触发');
    } else {
      this.audioCtx.pause();
      this.setData({
        judgeAudios: true
      })
    }

  },



  //获取用户的优惠券
  getUserList(res) {
    if (res.data.code == 200) {
      this.setData({
        list: res.data.result
      })
      for (let i = 0; i < this.data.list.length; i++) {
        var up = "list[" + i + "].selectBoole"; //先用一个变量，把(info[0].selcetBoole)用字符串拼接起来
        this.setData({
          [up]: false
        })

      }
    }
  },

  //更换tab
  changeTab(e) {
    if (this.data.detailMsg.isBuy != 0) {
      this.setData({
        indexClass: e.target.dataset.type
      })
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.audioCtx = wx.createAudioContext('my_audio')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    app.getAjax('v1/user/coupon/list', {}, this.getUserList);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})