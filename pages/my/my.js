const app = getApp()
var template = require('../compontent/footertab/footertab.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
      showSginModel:false,
    configNum:0,   //签到积分的数量
  },
  // 展示签到方法
  showSign(){
      this.setData({
        showSginModel:true
      })
  },

  //关闭签到的弹框
  closeSignModel(){
    this.setData({
      showSginModel:false
    })
  },

  //跳转到用户修改信息
  goChangeUserMsg(){
    wx.navigateTo({
      url: '/pages/changeUserMsg/changeUserMsg'
    })
  },

  //判断用户有没有签到
  judegUserSigin(res){
      if(res.data.code == 200){
        wx.showToast({
          title: '签到成功',
          icon: 'success',
          duration: 2000
        })
        app.getAjax('v1/user/info', {}, this.getUserInfoCall);
      }else{
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
      }
      this.setData({
        showSginModel:false
      })
  },

  //展示签到签到框
  showSigIn(){
      this.setData({
        showSginModel:true
      })
  },

  //签到btn
  siginBtn(){
    app.postAjax('v1/user/signIn', {}, this.judegUserSigin);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    template.tabbar("tabBar", 2, this)//0表示第一个tabbar
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  //获取配置信息的回调
  getConfigtNum(res) {
    if (res.data.code == 200) {
      this.setData({
        configNum: res.data.result.value
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.postAjax('/common/config', { 'filed': 'registerIntegral'}, this.getConfigtNum); 
    app.getAjax('v1/user/info', {}, this.getUserInfoCall);
   
  },
  /** 
     * 获取个人信息回调
     */
  getUserInfoCall(res) {
    if (res.data.code == 200) {
      app.globalData.userInfo = res.data.result;
      this.setData({
        userModel: res.data.result
      });
    }
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