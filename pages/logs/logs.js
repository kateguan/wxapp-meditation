//logs.js
var app = getApp(),
    judgeDate;

Page({
  data: {
    logs: [],
    userInfo: {}
  },
  onReady: function (e) {
    this.setDate();

  },
  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  setDate: function () {
    var _that = this;

    wx.getStorage({
      key: 'meditationDate',
      success: function(res) {
        console.log(res.data);
        for(var i = 0 ; i<res.data.length ; i++){
          var oldDate = new Date(res.data[i].date);
          if(i<res.data.length-1)
          {
            var nextDate = new Date(res.data[i+1].date);
            console.log('next:'+ nextDate);
          }
          console.log('old'+ oldDate);
          var year = oldDate.getFullYear();
          var month = oldDate.getMonth()+1;
          var day = oldDate.getDate();
          var newDate = year+'.'+month+'.'+day;
          console.log('newDate:'+ res.data[i].date );

          var dateFlag = true;

          /*if(nextDate.getMonth() == oldDate.getMonth()){
            if(nextDate.getDay() - oldDate.getDay() >1){
              dateFlag = false;
            }
            else{
              dateFlag = true;
            }
          }*/
          judgeDate = [{
            dateFlag : dateFlag,
            newDate : newDate
          }];
          console.log('dateFlag:'+ dateFlag);
          var oldFLag = wx.getStorageSync('judgeDate') || [];

          var newFLag = oldFLag.concat(judgeDate);

          wx.setStorage({
            key: 'judgeDate',
            data: newFLag
          })
        }

        _that.setData({
          history:res.data,
          judgeDate :judgeDate
        })
      }

    })
  }
})
