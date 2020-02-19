import { network } from "../../utils/network.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取已经保存到本地的影片标题
    wx.getStorage({
      key: 'searched',
      success: function(res) {
        var data = res.data;
        // console.log(data)
        that.setData({
          histories: data
        })
      },
    })
  },
  // 搜索内容
  onSearchInputEvent(e) {
    // console.log(e)
    var that = this;
    var value = e.detail.value;
    if (!value || value === "") {
      that.setData({
        subjects: null
      })
      return;
    }
    network.getSearch({
      q: value,
      success(subjects) {
        // console.log(subjects)
        that.setData({
          subjects: subjects
        })
      },
    });
  },
  // 点击影片保存影片标题
  onItemTapEvent(e) {
    // console.log(e)
    var that = this;
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    var histories = that.data.histories;
    // console.log(histories)
    var isExsited = false;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
    // 判断是否重复点击影片
    if (!isExsited) {
      // 判断历史纪录是否存在
      if (!histories) {
        histories = [];
      }
      histories.push({ id: id, title: title });
      // 将点击的影片标题保存到本地
      wx.setStorage({
        key: 'searched',
        data: histories,
        success() {
          console.log("保存成功")
        }
      })
    }
    // 影片去重
    for (var i = 0; i < histories.length; i++) {
      var movie = histories[i];
      if (movie.id === id) {
        isExsited = true;
        return;
      }
    }   
  },
  // 清除历史纪录
  onClearEvent(e) {
    // 清除本地已经保存的影片标题
    wx.removeStorage({
      key: 'searched',
      success: function (res) {
        console.log("删除成功")
      },
    });
    this.setData({
      histories: ""
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