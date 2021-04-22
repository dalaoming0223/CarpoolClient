// pages/other/bbs/bbsDetail.js
const { config } = require('../../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bbsDetail: [],
    commentList: [],
    hasComment: false,
    modalShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    let bbsDetail = JSON.parse(options.bbsDetail)
    this.setData({
      bbsDetail
    })
    // console.log(bbsDetail)
    this.getComment()
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

  onComment: function() {
    this.setData({
      modalShow: true
    })
  },

  onSend: function(event) {
    let _this = this
    let content = event.detail.value.content
    let bbs_id = this.data.bbsDetail.bbs_id
    let user_id = wx.getStorageSync('userid')
    console.log(content,bbs_id,user_id)
    if (content.trim() == '') {
      wx.showToast({
        title: '评论内容不能为空',
        icon: 'none'
      })
      return
    }

    wx.showLoading({
      title: '评论中',
      mask: true,
    })


    wx.request({
      url: config.api_base_url + 'bbs/addcomment',
      method: 'POST',
      header: {
        'content-type':'application/json'
      },
      data: {
        content,
        bbs_id,
        user_id
      },
      success: (res)=>{
        wx.hideLoading()
        wx.showToast({
          title: '评论成功！',
        })
        _this.setData({
          modalShow: false
        })
        event.detail.value.content = ''
        this.getComment()
        // console.log(res.data)
      },
      fail: (err)=>{
        console.log(err)
      }
    })
  },

  getComment: function() {
    wx.request({
      url: config.api_base_url + 'bbs/getcomment/' + this.data.bbsDetail.bbs_id,
      method: 'GET',
      header: {
        'content-type':'application/json'
      },
      success: (res)=>{
        console.log('打印commentlist',res.data.ret_data.bbscomment_list.length)
        if(res.data.ret_data.bbscomment_list.length != 0){
          this.setData({
            hasComment: true,
            commentList: res.data.ret_data.bbscomment_list
          })
        }


      },
      fail: (err)=>{
        console.log(err)
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