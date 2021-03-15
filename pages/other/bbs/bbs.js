// pages/other/bbs/bbs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blogtype: 0,
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

  },

  // onPageScroll(e) {
  //   this.setData({
  //     scrollTop: e.scrollTop
  //   });
  // },

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})