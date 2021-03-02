//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.setData({
        userInfo: userinfo,
        avatarUrl: userinfo.avatarUrl,
        nickName: userinfo.nickName,
        hasUserInfo: true
      })
    }
    console.log(this.data.userInfo)
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})