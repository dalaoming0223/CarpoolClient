const app = getApp()
var QQMapWX = require('../../utils/qqmap/qqmap-wx-jssdk.js')
var qqmap = new QQMapWX({
  key: 'DUZBZ-HGJCW-VT7R7-OCVXO-YFYCK-ASFCL'
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // Star 数量
    starCount: null,
    userInfo: {},
    isShow: false,
    courseInfo: {},
    course: '',
    mapWidth: 750,
    mapHeight: 600,
    latitude: '23.36525',
    longitude: '116.7054',
    scale: 20, //地图缩放级别
    markers: [], //标记坐标
    polyline: [], //绘制路线
    includePoints: [], //缩放视野以包含所有给定的坐标点
  },

  onLoad(options) {
    // console.log(options)
    let _this = this
    let course = JSON.parse(options.course)
    wx.showLoading({
      title: '加载中...',
    });
    this.setData({
      showType: options.showType,
      courseInfo: course,
      markers: [{
        id: 1,
        latitude: course.start_latitude,
        longitude: course.start_longitude,
        width: 50,
        height: 50,
        label: '起点'
      }, {
        id: 2,
        latitude: course.end_latitude,
        longitude: course.end_longitude,
        width: 50,
        height: 50,
        label: '终点'
      }]
    });
    // // console.log(this.data.markers)
    // //网络请求设置
    let startPos = course.start_latitude + ',' + course.start_longitude;
    let endPos = course.end_latitude + ',' + course.end_longitude;
    qqmap.direction({
      mode: 'driving',
      from: startPos,
      to: endPos,
      success: function (res) {
        var ret = res
        // if (ret.status != 0) return; //服务异常处理
        var coors = ret.result.routes[0].polyline,
          pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({
            latitude: coors[i],
            longitude: coors[i + 1]
          })
        }
        //设置polyline属性，将路线显示出来
        _this.setData({
          polyline: [{
            points: pl,
            color: '#00b26a',
            width: 8,
            arrowLine: true
          }],
          longitude: pl[0].longitude,
          latitude: pl[0].latitude,
          isShow: true,
          includePoints: [{
            latitude: course.start_latitude,
            longitude: course.start_longitude,
          }, {
            latitude: course.end_latitude,
            longitude: course.end_longitude,
          }]
        })
        wx.hideLoading()
      },
      fail: function (err) {
        console.error(err)
      },
      complete: function (res) {
        console.log(res)
      }
    })
  },

  onShareAppMessage: function () {

  },

  /**
   * 获取 Star 数量，有些网络无法访问，暂时不用
   */
  getStarCount() {
    const that = this;
    wx.request({
      url: 'https://api.github.com/repos/TaleLin/lin-ui',
      success(res) {
        let starCount = res.data.stargazers_count;
        starCount = (starCount / 1000).toFixed(1);
        that.setData({starCount});
      }
    });
  },

  /**
   * 监听：长按左侧按钮
   */
  onLongPressLeft() {
    wx.vibrateShort();
    wx.showModal({
      title: '提示',
      content: '长按左侧按钮事件被触发'
    });
  },

  /**
   * 监听：长按右侧按钮
   */
  onLongPressRight() {
    wx.vibrateShort();
    wx.showModal({
      title: '提示',
      content: '长按右侧按钮事件被触发'
    });
  },

  /**
   * 监听：点击 Star 卡片
   */
  onTapStarCard() {
    wx.vibrateShort();
    wx.setClipboardData({
      data: 'https://github.com/TaleLin/lin-ui'
    });
  },

  /**
   * 监听：点击公众号卡片
   */
  onTapPublicCard() {
    wx.vibrateShort();
    wx.setClipboardData({
      data: '林间有风'
    });
  }
});
