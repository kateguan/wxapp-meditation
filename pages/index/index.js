//index.js
//获取应用实例
var app = getApp();

var playing = false,
    setime = 10,
    intervalfoo,
    meditationDate,
    audioUrls = [
        'http://cdn.calm.com/scenes/scene-Qqkzy9k7Eo.m4a?v=1418162240715',
        'https://dn-working-noise.qbox.me/noise/min/Ocean.mp3',
        'https://dn-working-noise.qbox.me/noise/min/Forest.mp3',
        'https://dn-working-noise.qbox.me/noise/min/Rain.mp3',
        'https://dn-working-noise.qbox.me/noise/min/CoffeeShop.mp3',
    ];

Page({
    data: {
        imgUrls: [
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD//gAPTGF2YzU2LjYwLjEwMP/bAEMAAwICAwICAwMDAwQDAwQFCAUFBAQFCgcHBggMCgwMCwoLCw0OEhANDhEOCwsQFhARExQVFRUMDxcYFhQYEhQVFP/bAEMBAwQEBQQFCQUFCRQNCw0UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFP/AABEIACQAQAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAABwUGCAMBBP/EADMQAAEDBAADBQUIAwAAAAAAAAECAwQABQYRBxIhCBMxMkEUIiMzUSRCQ1NhYnGRY4Gh/8QAGAEBAQEBAQAAAAAAAAAAAAAABQYHBAj/xAAkEQACAgEEAgEFAAAAAAAAAAABAwAEBQIGETMTFCMiJDEyQ//aAAwDAQACEQMRAD8Axtj0VaUtuM+/r7tODFstjt9wzOaUE+Xm14UqcZCozo5tpHr/ADTDQ5EcaTop3R+N3Fcw7ft9ckbuKr3l+Nkedqw1m7xUyIxS6hXUKR6VKscOlEj4Z3S14b509iUpDqFl2KVe+yrwIrWGKZliOQWVdxVMai90jmdbcOiP4rc8dvdN1YOr95mF3bNisz4vrXFdE4ckfhn+qmofD87A7uqxxJ7UNmx15xmwstyynp3ivWk+e2PkdvvPtq0MGNrXs/L0pJm4yZyL27YbNRReHJcHyz/VVzMbBZcca5rpNjwx/kWAaznlfb6yqZFUzbYseHsa50DrWaM84o5DnU9yVdLk/JcUd6Kzof6qfbudquuMUtoa29svdpdQpWvGrIyzoBfL/wBpdWbI2IvvrSTU2vPO90G2a88eq1zPjmyeuB2RkWx1oBKBok+gNPvAOFrd8xqTImKEdxSPhNleuasw41mMS2LEiShC3fFKfpV7a7Qb7KEoQ7yJHQAGtNxGBAX5Hs4kpeuFbPFXXIXiXjLuNT3UPQ0J0Top2aVk8svu8ojBavpo05ZvGGLfU8s5tt8/vG64wL/jabgiV7AyXAPDXSqhmOB62Q5dkq7FxB3Itwwea3gD9Umq3LnxgT9lbFbGN5xS9MlEi2RjseISKU2c8JbJcZK5FtfTHQevdgbo2zh3/wAzEq2R0DsiSYUdjrUil5YA0aKKmMcBKC4TPDMd35q5Ga9vzmiiqDkwzidWbjIB89ScW6SfzDRRXYomc5AkpEvUsHo6a+xy+TNfONFFLgnj8w/gT//Z',
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD//gAPTGF2YzU2LjYwLjEwMP/bAEMAAwICAwICAwMDAwQDAwQFCAUFBAQFCgcHBggMCgwMCwoLCw0OEhANDhEOCwsQFhARExQVFRUMDxcYFhQYEhQVFP/bAEMBAwQEBQQFCQUFCRQNCw0UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFP/AABEIACQAQAMBIgACEQEDEQH/xAAZAAACAwEAAAAAAAAAAAAAAAAFBgAHCAT/xAAtEAAABgEDAgQFBQAAAAAAAAAAAQIDBAURBxIhInEGMUFRExQjQoIyU4GRof/EABkBAQADAQEAAAAAAAAAAAAAAAUBAwYEB//EACQRAAIBAwMDBQAAAAAAAAAAAAADAQIEEQUTFRQhUyIxMlRj/9oADAMBAAIRAxEAPwDSECuByHWnxwOKvnRjx1kGSvmxuOsh5uzVKDcL05h0Q6c1Y4BRvw/jkdNdNYPBZIOdZWMy2iPJDi5LqWbdBU2Kbb5lfvUYFTKcyzwLKuIbMFJnuIJljZxyM+shVyu0zaYWrX1MZWJsytwRgBMruQ22FnGL7yC/PtIv7hBFeqUE8cwz9V+N7Xf9RC09jDLF1DlMt9aZH4lkZgi6w2p+rYNwNY7JOMk2ruNAy1V4ylbWeQ0hF1ceSpBJRK/ksBzp9c5TDOEqlJ2l3GY6fWVa3C+NBZdFn+E9faupMzeoY7+S9eQIxS1M7IFVqrYvv6yyp2tMqwQra44ZJ89wQrvVmY2TiyM/7C74j10hSnHHWKhhjd9iSFeXetzSDMvkGE9yEotlzOZQWOVFNPavA12usto6vY2r/DMCHtSrh79Zq/EjFe2mtxNoNxEWOhPvtILEvXZbp9LrKOxEH120fXAWT+5WqrB9ptO1WOQRTZSDeT1+hCCB6QqB5o3FGkjzyaQagzHSM+r3EEAjfc1qZxC8HBdznUxTcJWFZ8xX9nYPuNG4peVZwIIOq2D76RamSnDeU2asoMvIDHkoSxkkJzn2EEC+TKNP/9k=',
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD//gAPTGF2YzU2LjYwLjEwMP/bAEMAAwICAwICAwMDAwQDAwQFCAUFBAQFCgcHBggMCgwMCwoLCw0OEhANDhEOCwsQFhARExQVFRUMDxcYFhQYEhQVFP/bAEMBAwQEBQQFCQUFCRQNCw0UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFP/AABEIACQAQAMBIgACEQEDEQH/xAAaAAACAwEBAAAAAAAAAAAAAAAFCAAEBwYB/8QAMBAAAAUCBQEGBQUAAAAAAAAAAAECAwQFEQYHEhMhCCIxMlFhYhRCUnGBFSMzQcH/xAAZAQADAQEBAAAAAAAAAAAAAAAEBQYDAgf/xAAkEQACAQMDAwUAAAAAAAAAAAAAAwECBAUTIVMRM1EUIzJBUv/aAAwDAQACEQMRAD8AXdmlNu9haXEfgE4tAMi22iJSFBq2ciqavW4moQ3D+VJ2IX4eREdTOpPwxr9iiG85CgrbaztuQWGm0B4m9mOyol/UZcAtCwbKcQajjKec9O4NFT8irNXQppC/UyBGPkvUUcMuMpL0sF05FZQrt7bkFhawFNNntI0exKf9FtnLmSSCc2FavtcNfTslp5fzPNLB9vKtKGNB7eoCMztCg302P/Yl8rCsiGrWbJlbzIcBVsSMvTX4jTel9o7LK1rh6cS5cxI8VzfaKxEZmYQ/MamQomYjjFDkOSFuKPe1F2mivzbzDCzz0s+AryOHtW+4uTj6bVc4EOFokHb3OApVMc5x4fpj0xNQ0NNldRIWZmOwjYya2/kHkzFiJlNcYc2zQr0HLK6/BKqt1+TDS6mc3bSEIq0zteLv7P2FvDnUlnUh1LcSsTnDP6rmO5jQoVpS9Df7noDGEmolPkoWlLf5SBGMXxjtWL1N9Q9pWZfUVUWWn0Vp1JK50q4BR/H/AFGvWWqtGhKCuZlwNNpOK0MtNluNkX9cAvJxqhFNf0E06vQZaTLvCutsde0P14W2ZHcqFFxv1L5v0qUuFNxGqQSiMlbZ3L7DDp2Y2IZVQclOTnkvrM9S0nYxuuOqNSotZfkT5cWKbxmvabTewwytVKlNVKUhhreYM7IV3Btb6fGR+QTXbbQ01xqpyNvxj39Uk6Lbh2EEBYKosRqi/o8YIQarJR3OCCDFg9tZC8XEU5KOHjAXHmYVbpNENUWSTalcGZFyIIAV9woq5mLVnSRdK1X59dkqemyVvOeZmBBGYggb/R5O6Zmd5P/Z',
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD//gAPTGF2YzU2LjYwLjEwMP/bAEMAAwICAwICAwMDAwQDAwQFCAUFBAQFCgcHBggMCgwMCwoLCw0OEhANDhEOCwsQFhARExQVFRUMDxcYFhQYEhQVFP/bAEMBAwQEBQQFCQUFCRQNCw0UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFP/AABEIACQAQAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQAGAwcIAQL/xAAtEAABAwMCBQMDBQEAAAAAAAABAgMEAAURBhIHEyExUSJBYRQjcRUWMlKBof/EABkBAQEAAwEAAAAAAAAAAAAAAAMAAQQFAv/EABsRAQEAAwADAAAAAAAAAAAAAAADARETIzEy/9oADAMBAAIRAxEAPwDjfXnDCZp1KpRb5MN1wpZbWcmqvYrtO0veEN42KI2kjqoA+K7Kf4fN8VlNMOSERVR8qSt44Sn5rl7iTpePpbV62or6prbThQqSoYS4od8fFajkTr0Ita2V4XISUIcWiQnegr6rJ96RRLLIeSHXPQjOCpVXBDkt7UcSXJYcRGSAPSCRt81adYcNXnIUJy1vGeJfrQ1HGSfyPNR94ayQlqCgtFlLildd4pxpWFi4crll1p0jcyOmSe1MU2VfM5Mu0vRxHTsWeygfJrd/BPg+m9iO+wUPvk4SFePJ/FTzSikW2zhrVrUQRSgNI2qQrqBnuDTL9kufXyn3Wy1GZ6oCfc1vVfCCfpjVyru7FE2EFDnKb6pJHzT/AFTpC3XCW1cH3P0q0TkHljHUEfFXNz+iqaelsssOKeUUK7Y80t1bwjia8kxpbqkR4bSTtabGOvk1nkSmXGQWEDf/AFpzC1CtERDTicp2/wAU0VPYQnDzSNusGkLzZ7tFizVLJEV91IK0p8CjuHVmhaJJdeT9ttSi2vaCUg+KDubz8cJdUypoKG5GfcVngu/XxvvSEtJ8qpWd5a115e4StQXadHil5YQdwWnCTRnC3WrJUhuMhUGSoZU2noP8ovX1uVLioZhttqUpX3FgY3CgrNp5u2liRsw4gYSsD/hozb8bcM3Wtwat5tzSuTGeT60Zzn5oPU2pBLsFqgSWcrjHKFE5BHjFUuLKkyFnOXAn38U0Zk2d+1SW3S6ueMFo56DzWyAmkrLEdtxHRVAxLi+ZavXUqUaOZNwkS2wh1wqSBgCvJDYZ+k25wruKlSsUTNJjNvRX3VDCkEYA7V9OTFG2NNbEbU9R6eualSqnwix1xTbo2HZu74oEnlS1bfepUpZJ/9k=',
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD//gAPTGF2YzU2LjYwLjEwMP/bAEMAAwICAwICAwMDAwQDAwQFCAUFBAQFCgcHBggMCgwMCwoLCw0OEhANDhEOCwsQFhARExQVFRUMDxcYFhQYEhQVFP/bAEMBAwQEBQQFCQUFCRQNCw0UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFP/AABEIACQAQAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQgDBAYCCf/EAC0QAAAGAQIDBQkAAAAAAAAAAAABAgMEBREGEgcTMQgiIzJBITNCUVJhcZGh/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAUEAQP/xAAhEQACAQMDBQAAAAAAAAAAAAAAAwIBBBMFETMSIzEyUv/aAAwDAQACEQMRAD8A+X4AHQABv1tLPt3NkKM7IX9LaDUf8GeBXNrY5y1eb4Rbfsra/wBKcP5EBk4jFhbT17T3JLwiI/XIw3F3j44FRFnkp3CoVpp+wplkmdDdiKP2kTqDTn9iPF8e2LqXTvF+waar65mnmwD5RukkiQ8WOuSFNb/Sh07K1ud1fp8jHEXcGeTrNPmpeQ5gAAbyUAACAEiUs1RWkF3dueg910mbCkIfim4l1PlUnORqsy0N4yjI6Oh1hHrXPEjpWX3IZG1nD0gV1Y58jNjHI1dePtrZfeecbWeTJeRis7t6xi8t7dhCCItx5Enc61izvcxUtn+BzEq0TJzksDMvf4PVrIUptk6yPAD6gKhDAAAAAAAAAAAAAAA//9k='
        ],
        duration: 1000,
        event: '',
        src: audioUrls[0],
        userInfo: {},
        noteStyle: 'display:none',
        topRotate: 0,
        bottomRotate: 0,
        timedata: '',
        btnBeginVal: {
            type: '',
            text: '开始'
        },
        areaVal: '',
    },

    onLoad: function () {
        this.setData({
            userInfo: app.globalData.userInfo,
            timedata: (setime < 10 ? '0' + setime : setime) + ":00"
        })

    },

    onReady: function (e) {
        // 使用 wx.createAudioContext 获取 audio 上下文 context
        this.audioCtx = wx.createAudioContext('myAudio')
    },

    intervalChange: function(e) {

        if ( playing ) {
            return;
        }

        this.audioCtx.pause();
        playing = false;

        clearInterval(intervalfoo);

        this.setData({
            src: audioUrls[e.detail.current],
            timedata: (setime < 10 ? '0' + setime : setime) + ":00",
            btnBeginVal: {
                type: '',
                text: '开始'
            },
        });
    },

    beginFoo: function(e) {

        if ( playing ) {

            clearInterval(intervalfoo);

            this.audioCtx.pause();
            playing = false;

            this.setData({
                event: '',
                noteStyle: 'display:block',
            })

            return;
        }

        this.audioCtx.play();
        this.setData({
            event: 'event',
            btnBeginVal: {
                type: 'over',
                text: '结束'
            },
        })
        playing = true;

        this.timeUpdate();
    },

    bindViewTap: function () {
      wx.navigateTo({
        url: '../logs/logs'
      })
    },

    bindTextAreaBlur: function (e) {
        console.log('bindblur');
        this.setData({
            areaVal: e.detail.value
        })
    },

    timeUpdate: function () {
        var that = this;
        var time =  new Date(0);
        time.setMinutes(setime);
        intervalfoo = setInterval(function () {
            time =  new Date(time.getTime() - 1000);
            var min = parseInt(time.getMinutes());
            var sec = parseInt(time.getSeconds());
            var Ntime = (min < 10 ? '0' + min : min)  + ':' + (sec < 10 ? '0' + sec : sec);
            that.setData({
                timedata: Ntime
            });
            if ( min === 0 && sec === 0 ) {
                clearInterval(intervalfoo);
                that.setData({
                    noteStyle: 'display:block'
                })
            }
        },1000)
    },

    saveNote: function () {
        var that = this;

        setTimeout(function () {

            console.log( 'saveNote + ' + that.data.areaVal );

            meditationDate = [{
                date: new Date().getTime(),
                duration: that.data.timedata,
                text: that.data.areaVal
            }];

            var oldData = wx.getStorageSync('meditationDate') || [];

            var newData = oldData.concat(meditationDate);

            wx.setStorage({
                key: 'meditationDate',
                data: newData
            })

            that.setData({
                noteStyle: 'display:none',
                timedata: (setime < 10 ? '0' + setime : setime) + ":00",
                btnBeginVal: {
                    type: '',
                    text: '开始'
                },
                areaVal: '',
            });

        },0)

    },

    btnCancelNote: function () {
        this.setData({
            noteStyle: 'display:none',
        })  
    },

})
