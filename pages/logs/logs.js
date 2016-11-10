//logs.js
var app = getApp(),
    judgeDate = [];

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
  onUnload: function() {
    judgeDate = [];
    console.log('page unload');
  },
  setDate: function () {
    var _that = this;

    wx.getStorage({
      key: 'meditationDate',

      success: function(res) {
        console.log(res.data);
        var nextDate = null,
            newDate,
            currentDate,
            newDuration = 0,
            firstDay = false,
            newText;

        for(var i = res.data.length-1 ; i>=0 ; i--){

          currentDate = new Date(res.data[i].date);

          if(i == 0){
            firstDay = true;
          }

          if(i>0)
          {
            nextDate = new Date(res.data[i-1].date);
          }
          else{
            nextDate = null;
          }

          var year = currentDate.getFullYear();

          var month = currentDate.getMonth()+1;

          var day = currentDate.getDate();

          var dateFlag = true;

          newDate = year+'.'+month+'.'+day;

          newText = res.data[i].text;

          newDuration = 10-(res.data[i].duration);

          if(nextDate){

            if(nextDate.getMonth() == currentDate.getMonth()){

              if(currentDate.getDate() - nextDate.getDate() >1){

                dateFlag = false;

              }

              else{

                dateFlag = true;

              }
            }
            else{

              dateFlag = false;

            }
          }

          judgeDate.push({
            firstDay : firstDay,
            dateFlag : dateFlag,
            newDate : newDate,
            newDuration : newDuration,
            newText : newText
          });
        }
        _that.setData({
          history:res.data,
          judgeDate :judgeDate
        });

      }

    })
  }
})
