const db = wx.cloud.database();
const qiantui = db.collection('qiantuidate')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qiantui.get().then(res=>{
      this.setData({
        time:res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  }

})