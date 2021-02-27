//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  mylesson: function () {
    console.log("我的课程")
    wx.navigateTo({
      url: '../mylessons/mylessons',
    })
  },

  myrecent: function () {
    console.log("最近学习")
    wx.navigateTo({
      url: '../myrecents/myrecents',
    })
  },

  myexercise: function () {
    console.log("我的练习")
    wx.navigateTo({
      url: '../myexercises/myexercises',
    })
  },

  mymessage: function () {
    console.log("消息通知")
    wx.navigateTo({
      url: '../mymessages/mymessages',
    })
  },
  myquestion:function()
  {
    console.log("联系客服")
    wx.navigateTo({
      url: '../myquestions/myquestions',
    })
  },


})
