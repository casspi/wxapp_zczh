//index.js
//获取应用实例
var API_URL="https://api.douban.com//v2/movie/top250";
var app = getApp()
Page({
  data: {
    
  },
  onShow:function(){
    var that=this;
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  }  
})
