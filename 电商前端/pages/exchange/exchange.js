Page({
  data:{
    width:0,
    height:0,
    key:true,
  },
  onLoad:function(options){
      var that=this;
    // 页面初始化 options为页面跳转所带来的参数
    //获取屏幕信息
    wx.getSystemInfo({
        success: function(res) {
            console.log(res.model)
            console.log(res.pixelRatio)
            console.log(res.windowWidth)
            console.log(res.windowHeight)
            console.log(res.language)
            console.log(res.version)
            that.setData({
                width:res.windowWidth*2,
                height:res.windowHeight*2,
            })
        }
    })
  },
  //兑换按钮
    exchange:function(){
         var that=this;
         that.setData({
             key:false,//显示模态层
         })
    },
    //取消按钮
    del:function(){
         var that=this;
         that.setData({
             key:true,//隐藏模态层
         })
    },
    //确定按钮
    confirm:function(){
         var that=this;
         that.setData({
             key:true,//隐藏模态层
         })
    }
})