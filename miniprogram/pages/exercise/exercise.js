// pages/exercise/exercise.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mush:[
      { dataUrl: 'https://m801.music.126.net/20210303001140/ac348444d83e674c9a5ad475425a8ac3/jdyyaac/550f/035a/0008/be2fc579744073f1a3597b5b0ea18935.m4a', title: '南京话-基础班-红楼梦第一章01', coverImgUrl: 'http://img3.kuwo.cn/star/albumcover/300/27/41/2794992887.jpg', name:'XXX老师' },
    ],
    number:'0',
    interval:'',
    widthx:'0',
    duration:'',
    playback:'',
    play:false,
    bgmusic:'',
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

  },
  onShow:function(e){
    let that = this
    setTimeout(function () {  
      that.data.bgmusic.pause();
    },1000)
  },
  onLoad: function (options) {
    let that = this
    wx.playBackgroundAudio({
      dataUrl: that.data.mush[that.data.number].dataUrl,
      title: that.data.mush[that.data.number].title,
      coverImgUrl: that.data.mush[that.data.number].coverImgUrl,
    })
    that.setData({
      bgmusic: wx.getBackgroundAudioManager()
    })
    that.data.bgmusic.play();
    setTimeout(function () {  
      if (getCurrentPages().length != 0) {
        getCurrentPages()[getCurrentPages().length - 1].scheduled()
      }
    },300)
  },
  music:function(e){
    let that = this
    if(!that.data.play){
      that.data.bgmusic.play();
      if (getCurrentPages().length != 0) {
        getCurrentPages()[getCurrentPages().length - 1].scheduled()
      }
    }else{
      that.data.bgmusic.pause();
      clearInterval(that.data.interval)
    }
    that.setData({
      play: !that.data.play,
    })
  },
  song:function(e){
    let that = this
    let song = e.currentTarget.dataset.song
    if(song == 'next'){
      if (that.data.number < (that.data.mush.length-1)){
        that.data.number++
      }else{
        that.data.number = 0
      }
    } else if (song == 'last'){
      if (0 < that.data.number) {
        that.data.number--
      } else {
        that.data.number = (that.data.mush.length - 1)
      }
    }else{
      wx.showToast({
        title: '系统异常~',
        icon: 'none',
        duration: 3000
      })
    }
    that.setData({
      number: that.data.number,
      play: true,
      widthx: '0',
      duration:'',
    })
    if (getCurrentPages().length != 0) {
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }
  },
  scheduled: function (e) {
    let that = this
    that.data.interval = setInterval(function () {
      let a = '00'
      let b = '00'
      wx.getBackgroundAudioPlayerState({
        success(res) {
          if (res.status == '2' && that.data.widthx == '100.00') {
            if (that.data.number < (that.data.mush.length - 1)) {
              that.data.number++
            } else {
              that.data.number = 0
            }
            that.setData({
              number: that.data.number,
              play: true,
              widthx: '0',
              duration: '',
            })
            if (getCurrentPages().length != 0) {
              getCurrentPages()[getCurrentPages().length - 1].onLoad()
            }
          }
          that.data.widthx = (res.currentPosition / (res.duration / 100)).toFixed(2)
          if (res.currentPosition > 59) {
            a = parseInt(res.currentPosition / 60) ? parseInt(res.currentPosition / 60) : '00'
            b = res.currentPosition - (a * 60) ? res.currentPosition - (a * 60) : '00'
          } else {
            a = '00'
            b = res.currentPosition ? res.currentPosition : '00'
          }
          a == undefined ? '00' : a
          if (JSON.stringify(a).length < 2) {
            a = '0' + JSON.stringify(a)
          }
          b == undefined ? '00' : b
          if (JSON.stringify(b).length < 2) {
            b = '0' + JSON.stringify(b)
          }
          that.data.play = res.status == 1 ? true : false
          if (that.data.duration == '' || that.data.duration == '00:00') {
            let c = parseInt(res.duration / 60) ? parseInt(res.duration / 60) : '00'
            let d = res.duration - (c * 60) ? res.duration - (c * 60) : '00'
            if (JSON.stringify(c).length < 2) {
              c = '0' + JSON.stringify(c)
            }
            if (JSON.stringify(d).length < 2) {
              d = '0' + JSON.stringify(d)
            }
            that.setData({
              duration: c + ':' + d,
            })
          }
          that.setData({
            widthx: that.data.widthx,
            playback: a + ':' + b,
            play: that.data.play,
          })
        }
      })
    }, 300)
  },
})