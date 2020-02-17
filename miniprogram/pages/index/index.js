// pages/index3/index3.js
Page({
  data: {

  },
  qiandao: function () {
    wx.navigateTo({
      url: '../qiandao/qiandao',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  qiantui: function () {
    wx.navigateTo({
      url: '../qiantui/qiantui',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
})