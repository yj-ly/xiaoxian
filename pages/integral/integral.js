const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],   //用户的积分列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  
  },

  // 获取用户的积分列表
  getUserList(res){
    if(res.data.code == 200){
        this.setData({
          list:res.data.result.data
        })
      console.log(this.data.list)
    }
    wx.hideLoading();
  },


//money转换为数字
resetMoneyNum(money){
  return Number(money);
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
    wx.showLoading({
      title: '正在加载'
    });
    app.getAjax('v1/user/accout/flowList', {type:1}, this.getUserList); 
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
    // 显示顶部刷新图标
    // wx.showNavigationBarLoading();
    // var that = this;

    // app.getAjax('v1/user/regret/list', {}, this.getUserList); 
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