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
    this.getdata(res=>{});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onPullDownRefresh: function () {
    this.getdata(res=>{
      wx.stopPullDownRefresh();
    });
  },

  getdata:function(callback){
    if(!callback){
      callback=res=>{}
    }
    wx.showLoading({
      title: '加载中',
    })
    qiantui.get().then(res => {
      this.setData({
        time: res.data
      },
      res=>{
        wx.hideLoading()
        callback();
      })
    })
  }
})