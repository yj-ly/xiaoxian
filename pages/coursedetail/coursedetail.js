const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
var template = require('../compontent/footertab/footertab.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexClass: 0,   //更换tab的样式
    list: [],    //优惠券列表
    detailMsg: {},     //详情的数据
    showDiscountModel: false,   //展示优惠券的弹出层
    showPayModel: false,   //展示支付的弹出层
    payModel:{
      courseId:'',   //系列课的id
      userCouponId:'',   //优惠券的id
      payMoney:'',    //需要支付的钱
    },
    deductionMoney:0,    //优惠抵扣的钱
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    app.getAjax('v1/course/getInfo', { 'courseId': options.courseId }, this.getUserListCall);
  },
  //获取系统课程的详情
  getUserListCall(res) {
    if (res.data.code == 200) {
      this.setData({
        detailMsg: res.data.result,
        'payModel.money': res.data.result.money
      })
      var article = this.data.detailMsg.detaile;
      WxParse.wxParse('article', 'html', article, this, 5);
    }
  },
  //展示支付弹框 
  showPayModelChnage(){
    this.setData({
      showPayModel:true,
    })
  },

  //展示优惠券的弹框 
  showDiscountChange(){
    this.setData({
      showDiscountModel:true
    })
  },


  //选中优惠券
  setDiscount(e){
    console.log(e.currentTarget.dataset);
  },
  //获取用户的优惠券
  getUserList(res) {
    if (res.data.code == 200) {
      this.setData({
        list: res.data.result
      })
      for(let i = 0; i < this.data.list.length; i++){
        this.setData({
          'list[i].selectBoole':false
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.getAjax('v1/user/coupon/list', {}, this.getUserList);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})