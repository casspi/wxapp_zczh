var app = getApp();
Page({
    data:{
      serverSrc:app.globalData.serverUrl,
      this_order:{},
      serverSrc:app.globalData.serverUrl
    },
    onLoad:function(){
        app.getUserInfo()
        var that=this;
        console.log(app.globalData.order_id)
        wx.request({
          url: 'https://www.ahzczh.com/m.php?g=api&m=wxshop&a=my_order_detail',
          data: {
            sess_id:wx.getStorageSync('sess_id'),
            order_id:app.globalData.order_id
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {"content-type":'application/x-www-form-urlencoded'}, // 设置请求的 header
          success: function(res){
            // success
            console.log(res.data.data)
            that.setData({
              this_order:res.data.data
            })
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
        // that.setData({
        //     this_order:
        // })
    },
    pay:function(){
          var that=this;
          wx.request({
            url: 'https://www.ahzczh.com/m.php?g=api&m=wxshop&a=pay&sess_id='+wx.getStorageSync('sess_id'),
            data: {
              open_id:wx.getStorageSync('openid'),
              body:that.data.this_order.msg,
              out_trade_no:that.data.this_order.order_no,
              total_fee:that.data.this_order.total_price  
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {"content-type":'application/x-www-form-urlencoded'}, // 设置请求的 header
            success: function(res){
              // success
                console.log(res.data)
                // console.log('ok'+that.data.this_order.order_no)
                var data=res.data
                //微信支付API
                wx.requestPayment(
                {
                'timeStamp': data.timeStamp,
                'nonceStr':data.nonceStr,
                'package':data.package,
                'signType': 'MD5',
                'paySign':data.paySign,
                'success':function(res){
                  // console.log('ok'+that.data.this_order.order_no)
                  console.log('=================')
                  console.log(res)
                  wx.request({//发送支付成功请求
                    url: 'https://www.ahzczh.com/m.php?g=api&m=wxshop&a=pay_success&sess_id='+wx.getStorageSync('sess_id'),
                    data: {
                      order_no:that.data.this_order.order_no
                    },
                    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                    header: {"content-type":'application/x-www-form-urlencoded'}, // 设置请求的 header
                    success: function(res){
                      // // 支付完成跳到订单页
                      // wx.navigateTo({
                      //     url: '../orderList/orderList?type=payed',
                      //     success: function(res){
                      //     // success
                      //     },
                      //     fail: function() {
                      //     // fail
                      //     },
                      //     complete: function() {
                      //     // complete
                      //     }
                      // })
                    },
                    fail: function() {
                      // fail
                    },
                    complete: function() {
                      // 支付完成跳到订单页
                      wx.redirectTo({
                          url: '../orderList/orderList?type=payed',
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
                    }
                  })
                },
                'fail':function(res){
                  // wx.showToast({
                  //   title: '已取消支付',
                  //   icon: 'success',
                  //   duration: 2000
                  // })
                }
                }) 
            },
            fail: function() {
              // fail
            },
            complete: function() {
              // complete
            }
          })
    }
})   