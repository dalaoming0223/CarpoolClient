// pages/other/bbs/bbs.js
const { config } = require('../../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blogtype: 0,
    blogList: [],
    page: 1,
    dynamicCard: [
      {
        title: '动态插入数据示例',
        content: '点击下面按钮动态插入一条数据，模拟上拉加载更多的业务场景'
      },
      {
        title: '动态插入数据示例',
        content: '点击下面按钮动态插入一条数据，模拟上拉加载更多的业务场景'
      },
      {
        title: '动态插入数据示例',
        content: '点击下面按钮动态插入一条数据，模拟上拉加载更多的业务场景'
      },
      {
        title: '动态插入数据示例',
        content: '点击下面按钮动态插入一条数据，模拟上拉加载更多的业务场景'
      },
      {
        title: '动态插入数据示例',
        content: '点击下面按钮动态插入一条数据，模拟上拉加载更多的业务场景'
      },
      {
        title: '动态插入数据示例',
        content: '点击下面按钮动态插入一条数据，模拟上拉加载更多的业务场景'
      },
      {
        title: '动态插入数据示例',
        content: '点击下面按钮动态插入一条数据，模拟上拉加载更多的业务场景'
      },
      {
        title: '动态插入数据示例',
        content: '点击下面按钮动态插入一条数据，模拟上拉加载更多的业务场景'
      },
      {
        title: '动态插入数据示例',
        content: '点击下面按钮动态插入一条数据，模拟上拉加载更多的业务场景'
      },
      {
        title: '动态插入数据示例',
        content: '点击下面按钮动态插入一条数据，模拟上拉加载更多的业务场景'
      },
      {
        title: '动态插入数据示例',
        content: '点击下面按钮动态插入一条数据，模拟上拉加载更多的业务场景'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getbbslist()
  },

  getbbslist: async function() {
    let _this  = this
    wx.showLoading({
      title: '加载中...',
    })


    wx.request({
      url: config.api_base_url + 'bbs' + '?page=' + _this.data.page,
      method: 'GET',
      header: {
        'content-type':'application/json'
      },
      success: (res)=>{
        // console.log(res.data.ret_data.data)

        if(_this.data.blogList.length != res.data.ret_data.data.length){
          _this.setData({
            blogList: _this.data.blogList.concat(res.data.ret_data.data),
            bloglistLength: res.data.ret_data.total
          })
        }
        wx.hideLoading()
        
      },
      fail: (err)=>{
        console.log(err)
      }
    })
  },

  // onPageScroll(e) {
  //   this.setData({
  //     scrollTop: e.scrollTop
  //   });
  // },

  lookBlogDetail: function(e) {
    console.log(e.currentTarget.dataset.item)
    const bbsDetail = e.currentTarget.dataset.item
    wx.navigateTo({
      // url: '../../pages/driverPublishDetail/driverPublishDetail?course=' + JSON.stringify(courseObj) + '&showType=' + this.data.showType
      url: './bbsDetail?bbsDetail=' + JSON.stringify(bbsDetail)
    })
  },

  tabchange: function(e) {
    // console.log(e.detail.currentIndex)
    this.setData({
      blogtype: e.detail.currentIndex
    })
  },

  onPageScroll: function(res) {
    this.setData({
      scrollTop: res.scrollTop
    })
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
    this.getbbslist().then(console.log('刷新成功')).catch(err=> console.log(err))
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('当前加载数量:', this.data.blogList.length)
    console.log('当前第几页',this.data.page)
    if(this.data.blogList.length != this.data.bloglistLength){
      console.log()
      this.setData({
        page: this.data.page + 1
      })
      this.getbbslist().then(console.log('刷新成功')).catch(err=> console.log(err))
    }else{
      console.log('没有更多了')
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})