var app = getApp();
Page({
  data:{
    indicatorDots:true,    
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1200,
    buyCar:"none",
    good:[],
    goodUrl:'/m.php?g=api&m=wxshop&a=goods&goods_id=',
    serverSrc:app.globalData.serverUrl
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: app.globalData.serverUrl+that.data.goodUrl+app.globalData.requestId, //详情页数据
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          good:res.data.data
        })
        console.log(that.data.good)   
      }
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  // 返回首页
back:function(){
  wx.navigateBack({
  delta: 1
  })
  
},
//立即购买
submit:function(){
  wx.navigateTo({
    url: '../order/order',
    success: function(res){
    // success
  },
  fail: function() {
    // fail
  },
  complete: function() {
    // complete
  }
})
},
// buy:function(){
//    this.setData({
//      buyCar:"block"
//    })
// },
//分享
onShareAppMessage: function () {
    return {
      title: '商城',
      desc: '为你服务!',
      path: 'pages/index/index'
    }
  }
})