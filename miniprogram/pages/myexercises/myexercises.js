//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isFold: true,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    "lessons": [{
      "id": "1",
      "imageUrl": "../images/nanjing1.png",
      "title": "南京话-基础班-红楼梦第一章01",
      "state": "已有",
    },
  ],
  },
  //事件处理函数
  bindViewTap: function() {
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
  showAll: function (e) {
    this.setData({
      isFold: !this.data.isFold,
    })
  },
})
