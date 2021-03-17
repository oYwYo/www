// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "lessons": [{
        "id": "1",
        "imageUrl": "../images/nanjing1.png",
        "title": "南京话-基础班-红楼梦第一章01",
        "homework": "有",
        "state": 1,
      },
      {
        "id": "2",
        "imageUrl": "../images/nanjing2.png",
        "title": "南京话-基础班-红楼梦第一章02",
        "homework": "有",
        "state": 0,
      },
    ],
  },

  currentTab: function (e) {
    if (this.data.currentTab == e.currentTarget.dataset.idx) {
      return;
    }
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    if (e.currentTarget.dataset.idx == 0) {
      this.setData({
        tab1: "tabshow"
      });
      this.setData({
        tab2: "tabhide"
      });
    } else if (e.currentTarget.dataset.idx == 1) {
      this.setData({
        tab1: "tabhide"
      });
      this.setData({
        tab2: "tabshow"
      });
    }
  },
  gotole: function (event) {
    var courseid = event.currentTarget.dataset.courseid;
    console.log(courseid)
    wx.showModal({
      content: '确定要学习该章节？',
      showCancel: true, //是否显示取消按钮
      cancelText: "否", //默认是“取消”
      confirmText: "是", //默认是“确定”
      confirmColor: '#f5a614', //确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
          console.log("进入章节")
          wx.navigateTo({
            url: '../lesson/lesson?id=' + courseid,
          })
        }

      },
    })
  },

  onLoad: function (options) {
    this.data.parameter[0].checked = true;
    this.setData({
      chosen_items: this.data.items,
      parameter: this.data.parameter,
    })
  },
  parameterTap: function (e) {
    var that = this
    var this_checked = e.currentTarget.dataset.id
    var parameterList = this.data.parameter
    if (this_checked != -1) {
      this.setData({
        chosen_items: [this.data.items[this_checked]]
      })
    } else {
      this.setData({
        chosen_items: this.data.items
      })
    }
    for (var i = 0; i < parameterList.length; i++) {
      if (parameterList[i].id == this_checked) {
        parameterList[i].checked = true;
      } else {
        parameterList[i].checked = false;
      }
    }
    that.setData({
      parameter: parameterList
    })
  },

  gotolesson: function (event) {
    var courseid = event.currentTarget.dataset.courseid;
    console.log(courseid)
    wx.showModal({
      content: '确定要报名该课程？',
      showCancel: true, //是否显示取消按钮
      cancelText: "否", //默认是“取消”
      confirmText: "是", //默认是“确定”
      confirmColor: '#f5a614', //确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
          console.log("进入课程")
          wx.navigateTo({
            url: '../lesson/lesson?id=' + courseid,
          })
        }

      },
    })
  },

})