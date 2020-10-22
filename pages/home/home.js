// pages/home/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    district:"西乡塘区",
    street:'大学东路',
    weather:{},
    weekday:["周日","周一","周二","周三","周四","周五","周六",],
    day:3,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that=this;
    wx.getLocation({
      type:'gcj02',
      success: function(res) {
        var lat=res.latitude;
        var lng=res.longitude;
        that.getCityInfo(lat,lng);
      }
    })
    var d=new Date();
    d.setDate(d.getDate()+2);
    that.setData({
      day:d.getDay()
    })
  },
  getCityInfo:function(lat,lng){
    var that=this;
    wx.request({
      url:'https://api.map.baidu.com/reverse_geocoding/v3/',
      data:{
        ak:'',
        output:'json',
        location:lat+','+lng
      },
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        that.setData({
          district: res.data.result.addressComponent.district,
          street: res.data.result.addressComponent.street,
        })
        that.getWeatherInfo(res.data.result.addressComponent.district)
    }
  })
  },
  getWeatherInfo(district){
    var that=this;
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/',
      data:{
        key:'',
        output:'json',
        location:district
      },
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        that.setData({
          weather:res.data.HeWeather6[0]
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