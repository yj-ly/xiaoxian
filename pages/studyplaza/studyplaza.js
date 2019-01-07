const app = getApp();
var template = require('../compontent/footertab/footertab.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],   //系列的列表
    listModel: {
      type: 1,
      page: 1,
      pageSize: 15
    },
    imgUrl:'',    //图片的前面部份
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    template.tabbar("tabBar", 1, this)//0表示第一个tabbar
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  // 获取系列课的列表
  getListCall(res) {
    if (res.data.code == 200) {
      this.setData({
        list: res.data.result.data
      })
    }
    console.log(this.data.list);
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    wx.showLoading({
      title: '加载中...',
    })
    app.getAjax('v1/course/getList', this.data.listModel, this.getListCall);
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