import { network } from "../../utils/network.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalComment: 0,
    start: 1,
    count: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(options);
    this.getComments(1);
  },
// 评论
  getComments(start){
    var that = this;
    var id = that.data.id;
    // loading判断
    if (start > that.data.start) {
      that.setData({
        preloading: true
      })
    } else {
      that.setData({
        nextloading: true
      })
    }
    network.getItemComments({
      id: id,
      start: start,
      count: 20,
      success(data) {
        // console.log(data)
        var comments = data.comments;
        var totalComment = data.total;
        that.setData({
          comments: comments,
          totalComment: totalComment,
          start: start,
          preloading: false,
          nextloading: false
        })
        wx.pageScrollTo({
          scrollTop: 0,
        })
      }
    })
  },
  // 上一页
  onPrePageTap(){
    var oldStart = this.data.start;
    var count = this.data.count;
    var start = oldStart - count;
    if (start > 0) {
      this.getComments(start);
    }
  },
  // 下一页
  onNextPageTap(){
    var oldStart = this.data.start;
    var start = oldStart + this.data.count;
    this.getComments(start);
  },
  // 点击头部返回
  onItemTagEvent(e) {
    wx.navigateBack({})
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