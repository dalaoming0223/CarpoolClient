// pages/search/search.js
const { config } = require('../../config')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showType: 0,
    // 拼车信息
    msgList: [],
    userInfo: '',
    page: 1,
    allowload: true  //是否允许下拉刷新
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  onClick: function (e){
    console.log(e.detail.index)
    if(e.detail.index == 0){
      this.setData({
        showType: 0
      })
      this.getpassengerPublish().then().catch(err=> console.log(err))
    }else{
      this.setData({
        showType: 1
      })
      this.getdriverPublish().then().catch(err=> console.log(err))
    }
  },
  getpassengerPublish: async function() {
    this.setData({
      msgList: [],
      page: 1
    })
    console.log('获取乘客发布')
  },

  getdriverPublish: async function() {
    if(this.data.showType == 0){
      this.setData({
        msgList: [],
        page: 1
      })
    }
    let _this = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url:  config.api_base_url + 'driverPublish' + '?page=' + _this.data.page,
      method: 'GET',
      header: {
        'content-type':'application/json'
      },
      success: (res)=> {
        console.log(res.data.ret_data.queryResult)
        let queryResult = res.data.ret_data.queryResult
        if( _this.data.msgList.length != queryResult.rows.length){
          _this.setData({
            msgList: _this.data.msgList.concat(queryResult.rows),
            allowload: true,
            msglistLength: queryResult.count
          })
        }

        // _this.msgList = res.data.queryResult.rows
        wx.hideLoading()
      },
      fail: (err)=> {
        console.log(err)
        this._show_error(1)
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // console.log(this.data.showType)
    if(this.data.showType == 1){
      wx.showLoading({
        title: '正在刷新',
      })
      this.getdriverPublish().then(console.log('刷新成功')).catch(err=> console.log(err))
    }else{
      console.log('jiji')
    }
    // this.getdriverPublish()
    // wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('当前加载的数量：',this.data.msgList.length)
    console.log('当前第几页',this.data.page)
    if(this.data.msgList.length != this.data.msglistLength){
      console.log('现在加载第几页',this.data.page + 1)
      this.setData({
        page: this.data.page + 1
      })
      this.getdriverPublish().then(console.log('刷新成功')).catch(err=> console.log(err))
    }else{
      console.log('没有更多了')
    }
    // this.getdriverPublish().then(console.log('刷新成功')).catch(err=> console.log(err))
    // this.setData({
    //   page: this.data.page + 1
    // })   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})