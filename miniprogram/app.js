//app.js
App({
  onLaunch: function () {
      //存储数据，测试使用
      if (!wx.cloud) {
        console.error('请使用 2.2.3 或以上的基础库以使用云能力')
      } else {
        wx.cloud.init({
          env: 'clp-env-7g9v8n7qd52bb686',
          traceUser: true,
        })
      }
  },
  setUserInfo: function (userInfo) {
      var that = this;
      that.globalData.userInfo = userInfo;
      that.globalData.hasLogin = true;
  },
  getUserInfo: function () {
      var that = this;
      return that.globalData.userInfo;
  },
  checkLogin: function () {
      var that = this;
      if (that.globalData.hasLogin) {
          return true;
      } else {
          return false;
      }
  },
  loginOut: function (obj) {
      var that = this;
      that.globalData.userInfo = null;
      that.globalData.hasLogin = false;
      wx.removeStorage({
          key: 'utoken',
          success: function () {
              wx.navigateTo({
                  url: '../login/login'
              });
          }
      })
  },
  globalData: {
      userInfo: null,
      hasLogin: false
  }
});