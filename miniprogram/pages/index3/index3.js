const db = wx.cloud.database();
const qiantui = db.collection('datelist')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
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
  onReachBottom:function(){
    this.getdata();
  },
  onPullDownRefresh: function () {
    this.data.list=[];
    this.pageData.skip = 0;
    this.getdata(res=>{
      wx.stopPullDownRefresh()
    });
  },

  getdata:function(callback){
    if(!callback){
      callback=res=>{}
    }
    wx.showLoading({
      title: '加载中',
    })
    qiantui.skip(this.pageData.skip).get().then(res => {
      let oldData=this.data.list;
      this.setData({
        list: oldData.concat(res.data)
      },
      res=>{
        this.pageData.skip = this.pageData.skip+20
        wx.hideLoading()
        callback();
      })
    })
  },
  pageData:{
    skip:0
  }
})