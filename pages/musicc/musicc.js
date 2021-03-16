Page({
  data: {
    mush:[
      { dataUrl: 'https://m801.music.126.net/20210303001140/ac348444d83e674c9a5ad475425a8ac3/jdyyaac/550f/035a/0008/be2fc579744073f1a3597b5b0ea18935.m4a', title: '大眠（完整版）', coverImgUrl: 'http://img3.kuwo.cn/star/albumcover/300/27/41/2794992887.jpg', name:'王茗' },
    ],
    number:'0',
    interval:'',
    widthx:'0',
    duration:'',
    playback:'',
    play:false,
    bgmusic:'',
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