const db = wx.cloud.database();
const qiantui = db.collection('datelist')
Page({
  data: {
    list: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getnotice();
    this.getdata(res => {});
  },
  getnotice:function() {
    var that = this;
    wx.cloud.getTempFileURL({
      fileList: ['cloud://lib-jlu.6c69-lib-jlu-1301111455/jiezhiriqi.txt'],
    }),
    wx.request({
      url: 'https://6c69-lib-jlu-1301111455.tcb.qcloud.la/jiezhiriqi.txt', 
      success:function (res) {
        that.setData({
          notice:res.data
        })
      }
    })
  },
  onReachBottom: function() {
    this.getdata();
  },
  onPullDownRefresh: function() {
    this.data.list = [];
    this.pageData.skip = 0;
    this.getdata(res => {
      wx.stopPullDownRefresh()
    });
  },
  getdata: function(callback) {
    if (!callback) {
      callback = res => {}
    }
    wx.showLoading({
      title: '加载中',
    })
    qiantui.skip(this.pageData.skip).get().then(res => {
      let oldData = this.data.list;
      this.setData({
          list: oldData.concat(res.data)
        },
        res => {
          this.pageData.skip = this.pageData.skip + 20
          wx.hideLoading()
          callback();
        })
    })
  },
  pageData: {
    skip: 0
  }
})