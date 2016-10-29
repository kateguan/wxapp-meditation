//index.js
//获取应用实例
var app = getApp();

var imgIndex = 0,
    playing = false,
    audioUrls = [
        'https://dn-working-noise.qbox.me/noise/min/JapaneseGarden.mp3',
        'https://dn-working-noise.qbox.me/noise/min/Ocean.mp3',
        'https://dn-working-noise.qbox.me/noise/min/Forest.mp3',
        'https://dn-working-noise.qbox.me/noise/min/Rain.mp3',
        'https://dn-working-noise.qbox.me/noise/min/CoffeeShop.mp3',
    ];

Page({
    data: {
        imgUrls: [
            'https://dn-working-noise.qbox.me/images/garden.jpg',
            'https://dn-working-noise.qbox.me/images/ocean.png',
            'https://dn-working-noise.qbox.me/images/forest.jpg',
            'https://dn-working-noise.qbox.me/images/rain.jpg',
            'https://dn-working-noise.qbox.me/images/cafe.jpg'
        ],
        duration: 1000,
        src: audioUrls[0],
        userInfo: {},
        noteStyle: [],
    },

    onLoad: function () {
        this.setData({
            userInfo: app.globalData.userInfo
        })

    },

    onReady: function (e) {
        // 使用 wx.createAudioContext 获取 audio 上下文 context
        this.audioCtx = wx.createAudioContext('myAudio')
    },

    intervalChange: function(e) {
        console.log('111');
        imgIndex = e.detail.current;
        
        this.audioCtx.pause();
        playing = false;

        this.setData({
            src: audioUrls[imgIndex],
        });
    },

    tapImgItem: function () {
        if ( playing ) {
            this.audioCtx.pause();
            playing = false;
        }
    },

    changeIndicatorDots: function(e) {
        if ( playing ) {
            return;
        }
        console.log(audioUrls[imgIndex])

        this.setData({
            src: audioUrls[imgIndex],
        });

        this.audioCtx.play();
        playing = true;
    },

    bindViewTap: function () {
      wx.navigateTo({
        url: '../logs/logs'
      })
    },

    saveNote: function () {
        this.setData({
            noteStyle: 'display:none'
        })
    },

})
