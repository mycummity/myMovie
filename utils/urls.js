const globalUrls = {
  movieList: "https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items",
  tvList: "https://m.douban.com/rexxar/api/v2/subject_collection/tv_hot/items",
  showList: "https://m.douban.com/rexxar/api/v2/subject_collection/tv_variety_show/items",
  detailList(id){
    return "https://douban.uieee.com/v2/movie/subject/"+id
  },
  commentList(id,start,count) {
    return "https://douban.uieee.com/v2/movie/subject/"+id+"/comments?start="+start+"&count="+count+"&apikey=0df993c66c0c636e29ecbb5344252a4a"
  },
  searchList(q, start, count) {
    return "https://m.douban.com/rexxar/api/v2/search?type=movie&q="+q+"&start=" + start + "&count=" + count
  } 
}

export { globalUrls }