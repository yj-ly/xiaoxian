const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      changeModel:{
        frontCover:'',    //用户的心情封面
        tags:'',      //标签
        signs:'',    //个性签名
      },
      strLength:0,   //输入的修改签名的长度
      tagList:[],    //用户的修改标签
    numClass:'', //用户点击的id
    imgSrc:'',   //用户的心情封面
  },

  //监听input修改的值的变化
  changeText(e){
    var str = 'changeModel.signs';
      this.setData({
       [str]:e.detail.value,
        strLength: e.detail.cursor
      })
  },

  //获取用户的标签
  getUserTag(res){
      if(res.data.code == 200){
        this.setData({
          tagList: res.data.result
        })
      }
    wx.hideLoading();
  },

  //用户点击每个标签设置的值
  setTab(e){
    this.setData({
      'changeModel.tags': e.target.dataset.title,
        // numClass: e.target.dataset.id
    })
  },

  //选择图片
  chooseImage(e) {
    wx.chooseImage({
      count: 1, // 图片数量 
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        wx.showLoading({
          title: '上传中...',
          mask: true,
        })
        wx.uploadFile({
          url: app.globalData.sourceUrl+'common/uploads',
          filePath: res.tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            "token": app.globalData.token
          },
          success: (res) => {
            wx.hideLoading();
            const data = JSON.parse(res.data);
            console.log(data)
            if(data.code == 200){
              this.setData({
                "changeModel.frontCover": app.globalData.imgUrl + data.result.url,
                imgSrc: app.globalData.imgUrl + data.result.url
              })
            }else{
              wx.showToast({
                title: data.message,
                icon: 'none',
                mask: true,
                duration: 2000,
              })
            }
            
          }
        })

      }
    })
  },

  //修改个人资料
  changeUserMsg(){
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    app.postAjax('/v1/user/editInfo', this.data.changeModel, this.getUserChangeMsg);
  },

  //修改个人资料的回调
  getUserChangeMsg(res){
      if(res.data.code == 200){
          wx.showToast({
            title:'修改成功',
            icon:'success',
            mask:true,
            duration: 2000,
          })

          setTimeout(() => {
            wx.navigateTo({
              url: "/pages/my/my"
            })
          },2000  )


      }else{
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration:2000,
          mask: true,
        }) 
      }
      // wx.hideLoading();
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
    this.setData({
      imgSrc: app.globalData.userInfo.frontCover
    })
    if (app.globalData.userInfo.signs != ''){
        this.setData({
          "changeModel.signs": app.globalData.userInfo.signs,
          strLength: app.globalData.userInfo.signs.length
        })
    }
    if (app.globalData.userInfo.tags != '') {
      this.setData({
        "changeModel.tags": app.globalData.userInfo.tags,
      })
    }
    wx.showLoading({
      title: '正在加载'
    });
    app.getAjax('v1/user/tagsList', { type: 1 }, this.getUserTag); 
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