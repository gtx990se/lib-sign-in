// miniprogram/pages/main/main.js
const app = getApp()
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  db: undefined,
  lib: undefined,
  data: {
    name: '',
    VOLID: '',
    recordId: '',
    nameResult: '',
    VOLIDResult: '',
    date: '',
    nowtime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    //  调用login云函数获取openid
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.cloud.init({ env: 'lib-jlu' })
        that.db = wx.cloud.database()
        that.lib = that.db.collection('date')
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })

  },

  // 单击“插入数据”按钮调用该函数
  insertData: function () {
    var that = this
    try {
      // 获取时间
      var date = new Date()
      var nowtime = date.toLocaleString()
      //  将ID转换为整数类型值
      var VOLID = parseInt(that.data.VOLID)
      //  如果输入的年龄不是数字，会显示错误对话框，并退出该函数
      if (isNaN(VOLID)) {
        //  显示错误对话框
        wx.showModal({
          title: '错误',
          content: '请输入正确的志愿者ID',
          showCancel: false
        })
        return
      }
      //  向lib数据集添加记录
      this.lib.add({
        // data 字段表示需新增的 JSON 数据
        data: {
          name: that.data.name,
          VOLID: VOLID
        },
        //  数据插入成功，调用该函数
        success: function (res) {
          console.log(res)
          wx.showModal({
            title: '成功',
            content: '签到成功，时间为' + nowtime,
            showCancel: false
          })
          that.setData({
            name: '',
            VOLID: ''
          })
        }
      })
    }
    catch (e) {
      wx.showModal({
        title: '错误',
        content: e.message,
        showCancel: false
      })

    }
  },
  //  单击“查询数据”按钮执行该函数
  queryData: function () {
    var that = this
    //  根据记录ID搜索数据集  
    this.db.collection('lib').doc(this.data.recordId).get({
      // 找到记录集调用
      success: function (res) {
        //  将查询结果显示在页面上  
        that.setData({
          nameResult: res.data.name,
          VOLIDResult: res.data.VOLID
        })

      },
      //  未查到数据时调用
      fail: function (res) {
        wx.showModal({
          title: '错误',
          content: '没有找到记录',
          showCancel: false
        })
      }
    })

  },
  //  下面的函数用于当更新input组件中的值时同时更新对应变量的值
  bindKeyInputName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindKeyInputVOLID: function (e) {
    this.setData({
      VOLID: e.detail.value
    })
  },
  bindKeyInputId: function (e) {
    this.setData({
      recordId: e.detail.value
    })
  },

})