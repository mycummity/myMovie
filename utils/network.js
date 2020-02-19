import { globalUrls } from "urls.js"
const network = {
  getMovieList(params) {
    params.type = "movie";
    this.getItemList(params)
  },
  getTvList(params) {
    params.type = "tv";
    this.getItemList(params)
  },
  getShowList(params) {
    params.type = "show";
    this.getItemList(params)
  },
  // 列表元素
  getItemList(params) {
    var url = "";
    var count = params.count ? params.count : 7;
    if (params.type === "movie") {
      url = globalUrls.movieList
    } else if (params.type === "tv") {
      url = globalUrls.tvList
    } else {
      url = globalUrls.showList
    };
    wx.request({
      url: url,
      data: {
        count: count
      },
      success(res){
        var items = res.data.subject_collection_items;
        var itemsCount = items.length;
        var spare = itemsCount%3;
        if(itemsCount === 2){
          items.push(null)
        };
        if(params && params.success){
          params.success(items)
        }
      }
    })
  },
  // 详情
  getItemDetail(params) {
    var id = params.id;
    var url = globalUrls.detailList(id);
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success(res) {
        // console.log(res)
        var item = res.data;
        if (params && params.success) {
          params.success(item);
        }
      }
    })
  },
  // 评论
  getItemComments(params) {
    var id = params.id;
    var start = params.start ? params.start : 0;
    var count = params.count ? params.count : 3;
    var url = globalUrls.commentList(id, start, count);
    wx.request({
      url: url,
      method: "GET",
      header: {
        'content-type': 'json'
      },
      success(res) {
        // console.log(res)
        var data = res.data;
        if (params && params.success) {
          params.success(data);
        }
      }
    })
  },
  // 搜索
  getSearch(params) {
    var q = params.q;
    var start = params.start ? params.start : 0;
    var count = params.count ? params.count : 6;
    var url = globalUrls.searchList(q, start, count);
    wx.request({
      url: url,
      success(res) {
        // console.log(res)
        var subjects = res.data.subjects;
        if (params && params.success) {
          params.success(subjects);
        }
      }
    })
  }
}

export { network }