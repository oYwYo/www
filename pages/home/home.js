// pages/mine/mine.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    imgs1: [
      '../images/main.png', '../images/main.png',
    ],
    imgs2: [
      '../images/fake_index.png', '../images/fake_index.png',
    ],
    imgUrls: [
      '../images/main.png', '../images/main.png',
    ],
    "items": [
      {
        "id": "1",
        "imageUrl": "../images/shanghai.jpg",
        "content": "上海话",
        "view_count": "100",
      },
      {
        "id": "2",
        "imageUrl": "../images/nanjing.jpg",
        "content": "南京话",
        "view_count": "200",
      },
      {
        "id": "3",
        "imageUrl": "../images/sichuan.jpg",
        "content": "四川话",
        "view_count": "300",
      },
      {
        "id": "4",
        "imageUrl": "../images/yue.jpg",
        "content": "粤语",
        "view_count": "400",
      },
    ],
      "lessons": [
        {
          "id": "1",
          "imageUrl": "../images/01.jpg",
          "title": "南京话-基础班-红楼梦第一章01",
          "date_count": "5",
          "state": 1,
        },
        {
          "id": "2",
          "imageUrl": "../images/02.jpg",
          "title": "南京话-基础班-红楼梦第一章02",
          "date_count": "4",
          "state": 0,
        },
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    parameter: [{ id: 1, name: '上海话' }, { id: 2, name: '南京话' },{ id: 3, name: '四川话' },{ id: 4, name: '粤语' }],
    navTab: ['自主学习', '今日练习'],
    currentTab: 0,
    sendList: ['AA','BB'],
    tab1:'tabshow',
    tab2:'tabhide',
  },
 
  currentTab: function (e) {
    if (this.data.currentTab == e.currentTarget.dataset.idx) {
      return;
    }
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    if (e.currentTarget.dataset.idx==0)
    {
      this.setData({ tab1: "tabshow" });
      this.setData({ tab2: "tabhide" });
    } else if (e.currentTarget.dataset.idx == 1)
    {
      this.setData({ tab1: "tabhide" });
      this.setData({ tab2: "tabshow" });
    }
  },
 

    onLoad: function (options) {
     this.data.parameter[0].checked = true;
      this.setData({
        parameter: this.data.parameter,
      })
    },
    parameterTap:function(e){
      var that=this
      var this_checked = e.currentTarget.dataset.id
      var parameterList = this.data.parameter
      for (var i = 0; i < parameterList.length;i++){
        if (parameterList[i].id == this_checked){
          parameterList[i].checked = true;
        }
        else{
          parameterList[i].checked = false;
        }
      }
      that.setData({
        parameter: parameterList
      })
    }

})

