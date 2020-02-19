import { network } from "../../utils/network.js"
//获取应用实例
const app = getApp()

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 3000,
  },
  //事件处理函数
  onLoad(){
    var that = this;
    // 轮播
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/coming_soon?count=4',
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success(res) {
        // console.log(res.data.subjects[0])
        var items = res.data.subjects;
        var imgUrls = [];
        for (var i = 0; i < items.length;i++){
          var obj = {};
          obj.url = items[i].images.small;
          obj.id = items[i].id;
          imgUrls.push(obj);
        }
        that.setData({
          imgUrls: imgUrls,
        })
        // console.log(imgUrls)
      }
    })

    // 列表
    // 电影
    network.getMovieList({
      success(movies) {
        that.setData({
          movies: movies
        })
      }
    });
    // 电视剧
    network.getTvList({
      success(tvs) {
        that.setData({
          tvs: tvs
        })
      }
    });
    // 综艺
    network.getShowList({
      success(shows) {
        that.setData({
          shows: shows
        })
      }
    })
  }
})
