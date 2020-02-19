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
    // console.log(options)
    var that = this;
    var id = options.id;
    that.setData({
      id: id
    });
    // 详情
    network.getItemDetail({
      id: id,
      success(item) {
        // console.log(item)
        var genres = item.genres;
        genres = genres.join("/");
        var tags = item.tags;
        if (tags.length > 8) {
          tags = tags.slice(0, 8);
          item.tags = tags;
        }
        var actors = item.casts;
        var actorNames = [];
        if (actors.length > 3) {
          actors = actors.slice(0, 3);
        }
        for (var i = 0; i < actors.length; i++) {
          var actor = actors[i]
          actorNames.push(actor.name);
        }
        actorNames = actorNames.join("/");
        that.setData({
          item: item,
          actorNames: actorNames
        })
      }
    });
    // 评论
    network.getItemComments({
      id: id,
      success(data){
        // console.log(data)
        var comments = data.comments;
        var totalComment = data.total;
        that.setData({
          comments: comments,
          totalComment: totalComment,
        })
      }
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
    wx.pageScrollTo({
      scrollTop: 0,
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