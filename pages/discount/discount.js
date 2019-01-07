const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,    //0 为我的优惠券 1待领取优惠券 2兑换
    list:[],    //优惠券列表
    code:'',    //兑换的code

  },
  //更换展示不同的状态
  chageType(e){
      this.setData({
        type: e.target.dataset.num
      })
  },
  //获取用户的优惠券
  getUserList(res){
    if(res.data.code == 200){
      this.setData({
        list: res.data.result
      })
      console.log(this.data.list);
    }
  },

  //领取优惠券
  getMoney(e){
    console.log(e);
    // app.getAjax('v1/user/coupon/list', {}, this.getUserList);
  },

  //实名获取用户input输入的值
  changeText(e){
   this.setData({
     code:e.detail.value
   })
  },

  //兑换优惠券
  exchange(){
    if(this.data.code == ''){
      wx.showToast({
        title: '兑换码为空',
        icon: 'none',
        duration:2000
      })
      return;
    }
    if (this.data.code.length != 6) {
      wx.showToast({
        title: '兑换码格式错误',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    app.postAjax('v1/user/coupon/exchange', { code: this.data.code }, this.exchangeCall);
 
  },

  //兑换的回调函数
  exchangeCall(res){
   
    if(res.data.code == 200){
      wx.showToast({
        title: '兑换成功',
        icon: 'success',
        duration: 2000
      })
      this.setData({   //兑换成功后把code在清除掉
        code:''
      })
      app.getAjax('v1/user/coupon/list', {}, this.getUserList);   //成功之后在重新的获取一次优惠券接口
    }else{
      wx.showToast({
        title: res.data.message,
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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