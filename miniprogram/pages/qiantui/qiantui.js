var util = require('../../utils/util.js');
const db = wx.cloud.database();
const qiantui = db.collection('datelist')
Page({
  data: {},

  onLoad: function(options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      time: time
    });
  },



  qiantuisubmit: function(event) {
    var time = util.formatTime(new Date());
    this.setData({
      time: time
    });

    if (!event.detail.value.title) {
      wx.showModal({
        title: '错误',
        content: '请输入姓名！',
        showCancel: false
      })
      return
    }
    qiantui.add({
      data: {
        name: event.detail.value.title,
        date: time,
        sign: "签退",
      }
    }).then(res => {
      wx.showToast({
        title: '签退成功!',
        icon: 'success'
      })
    })
  },
})