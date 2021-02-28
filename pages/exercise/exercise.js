// pages/exercise/exercise.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath : "",
    imgs: [],
    exercise_record:[{
      "index": "1",
      "title": "南京话-基础班-红楼梦第一章01",
      "url": "../images/nanjing1.png",
    },
    {
      "index": "2",
      "title": "南京话-基础班-红楼梦第一章02",
      "url": "../images/nanjing1.png",
    }

    ]
,
    button1:"show",
    button2:"hide",
    navTab: ['录音', '创作'],
    currentTab: 0,
    sendList: ['AA', 'BB'],
    tab1: 'tabshow',
    tab2: 'tabhide',
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
  
  // pic: function (options) {
  //   var _this=this;
	// 	wx.chooseImage({
	// 		success : (res) => {
	// 		  //1、取出路径
	// 		  const path = res.tempFilePaths[0]

	// 		  //2、设置imagePath
	// 		  this.setData({
	// 			imagePath : path
	// 		  })
	// 		}
	// 	})
  // },
  chooseImg: function (e) {
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 9) {
      this.setData({
        lenMore: 1
      });
      setTimeout(function () {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs;
        // console.log(tempFilePaths + '----');
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 9) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        // console.log(imgs);
        that.setData({
          imgs: imgs
        });
      }
    });
  },
  // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs
    });
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
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