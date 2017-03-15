// pages/cart/cart.js
Page({
  data:{
    goods:[
      {name:"有机食物大礼包",num:3,price:288.00},
      {name:"有机食物大礼包",num:1,price:288.00},
      {name:"有机食物大礼包",num:5,price:288.00}
    ],
    total:0,//总价
    total_nums:0,//总数

  },
  pay:function(){
    wx.navigateTo({
      url: '../ticket/ticket',
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
  //总价与总数
  sum:function(){
    var goods = this.data.goods;
    // 计算总金额
    var total = 0;
    var total_nums = 0;
    for (var i = 0; i < goods.length; i++) {
      total += goods[i].num * goods[i].price;
      total_nums+=goods[i].num;
    }
    //保留小数点后两位
    // total=total.toString().replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
    // 写回经点击修改后的数组
    this.setData({
      goods: goods,
      total: total,
      total_nums:total_nums
    });
    console.log(total)
  },
  //增加数量
  add:function(e){
    var index = parseInt(e.currentTarget.dataset.index);
    var num = this.data.goods[index].num;
    num+=1;
    // 购物车数据
    var goods = this.data.goods;
    goods[index].num = num;
    // 将数值写回
    this.setData({
      goods:goods
    });
    this.sum();
  },
  //减少数量
  min: function(e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var num = this.data.goods[index].num;
    // 如果只有1件了，就不允许再减了
    if (num > 1) {
      num --;
    }
    // 购物车数据
    var goods = this.data.goods;
    goods[index].num = num;
    // 将数值写回
    this.setData({
      goods:goods
    });
    this.sum();
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
        this.sum();
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})