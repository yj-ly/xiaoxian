const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,    //0 为我的后悔药   2兑换
    list:[],    //用户的后悔药列表
    userModel:{},   //用户信息
    configNum:0,   //配置的积分
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  //更换展示不同的状态
  chageType(e) {
    this.setData({
      type: e.target.dataset.num
    })
  },

  //获取用户的后悔药
  getUserList(res){
    if(res.data.code == 200){
        this.setData({
          list: res.data.result
        })
    }
  },

  //兑换后悔药
  exchange(){
    // if (this.data.userModel.integral < this.data.configNum ){
    //   wx.showToast({
    //     title: '当前积分不足',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return;
    // }
    wx.showLoading({
      title: '加载中', 
      mask:true
    })

    app.postAjax('v1/user/regret/exchange', { 'filed': 'regretIntegral'}, this.exchangeSuccess)
  },

  //兑换积分成功的回调
  exchangeSuccess(res){
      if(res.data.code == 200){
        wx.showToast({
          title: '兑换成功',
          icon: 'success',
          duration: 2000
        })  
        app.postAjax('/common/config', { 'filed': 'regretIntegral' }, this.getConfigtNum);  //获取后台配置的积分列表
        app.getAjax('v1/user/info', {}, this.getUserInfoCall);    //获取用户的积分信息
        app.getAjax('v1/user/regret/list', {}, this.getUserList);  //获取用户的list 
      }else{
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })   
        console.log('else');
      }
      // wx.hideLoading()
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

  //获取配置信息的回调
  getConfigtNum(res){
      if(res.data.code == 200){
          this.setData({
            configNum: res.data.result.value
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
    app.postAjax('/common/config', { 'filed': 'regretIntegral'}, this.getConfigtNum);  //获取后台配置的积分列表
    app.getAjax('v1/user/info', {}, this.getUserInfoCall);    //获取用户的积分信息
    app.getAjax('v1/user/regret/list', {}, this.getUserList);  //获取用户的list
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