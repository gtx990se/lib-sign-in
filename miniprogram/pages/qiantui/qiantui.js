var util = require('../../utils/util.js');
const db = wx.cloud.database();
const qiantui = db.collection('datelist')
Page({
  data: {},
  pageData: {
    locationObj: {}
  },
  onLoad: function(options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      time: time
    });
    wx.getLocation({
      success: res => {
        let locationObj = {
          latitude: res.latitude,
          longitude: res.longitude
        }
        this.pageData.locationObj = locationObj
      },
    })
  },
  qiantuisubmit: function(event) {
    var time = util.formatTime(new Date());
    this.setData({
      time: time
    });
    wx.getLocation({
      success: res => {
        let locationObj = {
          latitude: res.latitude,
          longitude: res.longitude
        }
        this.pageData.locationObj = locationObj
      },
    })
    if (!event.detail.value.name) {
      wx.showModal({
        title: '错误',
        content: '请输入姓名！',
        showCancel: false
      })
      return
    }
    if (!this.pageData.locationObj.latitude || !this.pageData.locationObj.longitude) {
      wx.showModal({
        title: '错误',
        content: '请打开定位！',
        showCancel: false
      })
      return
    }

    qiantui.add({
      data: {
        name: event.detail.value.name,
        date: time,
        sign: "签退",
      }
    }).then(res => {
      wx.showToast({
        title: '签退成功!',
        icon: 'success',
        success: function() {
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          }, 1000);
        }
      })
    })
  }
})