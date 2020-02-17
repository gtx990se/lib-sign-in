//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'lib-jlu',
      traceUser:true
    })
  }
})
