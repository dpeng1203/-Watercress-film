
var top250 = {
    init: function(){
        this.$element = $('#top')
        this.$content = this.$element.find('#top250')
        this.isloading = false
        this.index = 0
        this.isFinish = false
        this.bind()
        this.start()
        
    },
    bind: function(){
        var _this = this
        this.$element.scroll(function(){
            if(!_this.isFinish && _this.isToEnd()){
                _this.start()
            }
            
        })
    },
    start: function(){
        var _this = this
        this.getData(function(data){
            _this.render(data)
        })
    },
    getData: function(callback){
        var _this = this
        if(_this.isloading) return;
        _this.isloading = true
        _this.$element.find('.loading').show()
        $.ajax({
            url: 'https://api.douban.com/v2/movie/top250',
            type: 'GET',
            data: {
                start: _this.index||0,
                count: 20
            },
            dataType: 'jsonp'
        }).done(function(ret){
             //console.log(ret)
            _this.index += 20
            if(_this.index >= ret.total){
                _this.isFinish = true
            }
            callback&&callback(ret)
        }).fail(function(){
            console.log('error....')
        }).always(function(){
            _this.isloading = false
            _this.$element.find('.loadong').hide()
        })
    },
    render: function(data){
        var _this = this
        data.subjects.forEach(function(movie){
            var tpl =`<div class="item">
            <a href="#">
                <div class="cover">
                    <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt=""/>
                </div>
                <div class="detail">
                    <h2>霸王别姬</h2>
                    <div class="extra"><span class="score">9.3分</span> / <span class = "collect">1000</span>收藏</div>
                    <div class="extra"><span class = "year">1994</span> / <span class = "type">剧情、爱情</span></div>
                    <div class="extra">导演: <span class = "director">张艺谋</span></div>
                     <div class="extra">主演: <span class ="actor">张艺谋、张艺谋、张一摸</span></div>
                </div>
            </a>
        </div>`
            var $node = $(tpl)
            $node.find('.cover img').attr('src',movie.images.medium)
            $node.find('.detail h2').text(movie.title)
            $node.find('.score').text(movie.rating.average)
            $node.find('.collect').text(movie.collect_count)
            $node.find('.year').text(movie.year)
            $node.find('.type').text(movie.genres.join(' / '))
            $node.find('.director').text(function(){
                var directorsArr = []
                movie.directors.forEach(function(item){
                    directorsArr.push(item.name)
                })
                return directorsArr.join('、')
            })
            $node.find('.actor').text(function(){
                var actorAll = []
                movie.casts.forEach(function(item){
                    actorAll.push(item.name)
                })
                return actorAll.join('、')
            })
            _this.$element.find('#top250').append($node)
            })
    },
    isToEnd: function(){
        return this.$content.height() <= this.$element.height() + this.$element.scrollTop() 
    }

} 


var usBox = {
    init: function(){
        this.$element = $('#beimei')
        this.start()
    },
    start: function(){
        var _this = this
        this.getData(function(data){
            _this.render(data)
        })
    },
    getData: function(callback){
        var _this = this
        $.ajax({
            url: 'https://api.douban.com/v2/movie/us_box',
            type: 'GET',
            dataType: 'jsonp'
        }).done(function(ret){
             console.log(ret)
            callback&&callback(ret)
        }).fail(function(){
            console.log('error....')
        })
    },
    render: function(data){
        var _this = this
        data.subjects.forEach(function(movie){
            movie = movie.subject
            var tpl =`<div class="item">
            <a href="#">
                <div class="cover">
                    <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt=""/>
                </div>
                <div class="detail">
                    <h2>霸王别姬</h2>
                    <div class="extra"><span class="score">9.3分</span> / <span class = "collect">1000</span>收藏</div>
                    <div class="extra"><span class = "year">1994</span> / <span class = "type">剧情、爱情</span></div>
                    <div class="extra">导演: <span class = "director">张艺谋</span></div>
                     <div class="extra">主演: <span class ="actor">张艺谋、张艺谋、张一摸</span></div>
                </div>
            </a>
        </div>`
            var $node = $(tpl)
            $node.find('.cover img').attr('src',movie.images.medium)
            $node.find('.detail h2').text(movie.title)
            $node.find('.score').text(movie.rating.average)
            $node.find('.collect').text(movie.collect_count)
            $node.find('.year').text(movie.year)
            $node.find('.type').text(movie.genres.join(' / '))
            $node.find('.director').text(function(){
                var directorsArr = []
                movie.directors.forEach(function(item){
                    directorsArr.push(item.name)
                })
                return directorsArr.join('、')
            })
            $node.find('.actor').text(function(){
                var actorAll = []
                movie.casts.forEach(function(item){
                    actorAll.push(item.name)
                })
                return actorAll.join('、')
            })
            _this.$element.find('#bei').append($node)
            })
    }

}

var search = {
    init: function(){
        this.$element = $('#sousuo')
        this.keyWord = ''
        this.bind()
        this.start()
    },
    bind: function(){
        _this = this
        this.$element.find('button').click(function(){
            _this.keyWord = _this.$element.find('input').val()
            _this.start()
        })
    },
    start: function(){
        var _this = this
        this.getData(function(data){
            _this.render(data)
        })
    },
    getData: function(callback){
        var _this = this


        $.ajax({
            url: 'https://api.douban.com/v2/movie/search',
            type: 'GET',
            data: {
                q: _this.keyWord
            },

            dataType: 'jsonp'
        }).done(function(ret){
             console.log(ret)
            

            callback&&callback(ret)
        }).fail(function(){
            console.log('error....')
        })
    },
    render: function(data){
        console.log(data)
        var _this = this
        data.subjects.forEach(function(movie){
            var tpl =`<div class="item">
                <a href="#">
                    <div class="cover">
                        <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt=""/>
                    </div>
                    <div class="detail">
                        <h2>霸王别姬</h2>
                        <div class="extra"><span class="score">9.3分</span> / <span class = "collect">1000</span>收藏</div>
                        <div class="extra"><span class = "year">1994</span> / <span class = "type">剧情、爱情</span></div>
                        <div class="extra">导演: <span class = "director">张艺谋</span></div>
                        <div class="extra">主演: <span class ="actor">张艺谋、张艺谋、张一摸</span></div>
                    </div>
                </a>
            </div>`
            var $node = $(tpl)
            $node.find('.cover img').attr('src',movie.images.medium)
            $node.find('.detail h2').text(movie.title)
            $node.find('.score').text(movie.rating.average)
            $node.find('.collect').text(movie.collect_count)
            $node.find('.year').text(movie.year)
            $node.find('.type').text(movie.genres.join(' / '))
            $node.find('.director').text(function(){
                var directorsArr = []
                movie.directors.forEach(function(item){
                    directorsArr.push(item.name)
                })
                return directorsArr.join('、')
            })
            $node.find('.actor').text(function(){
                var actorAll = []
                movie.casts.forEach(function(item){
                    actorAll.push(item.name)
                })
                return actorAll.join('、')
            })
            _this.$element.find('.sou').append($node)
            })
    }
}




var app = {
    init: function(){
        this.$tabs = $('footer>div')
        this.$panels = $('section')
        this.bind()

        top250.init()
        usBox.init()
        search.init()

    },
    bind: function(){
        var _this = this
        this.$tabs.on('click',function(){
            $(this).addClass('active').siblings().removeClass('active')
            _this.$panels.eq($(this).index()).show().siblings().hide()
        })
    }
}
app.init()
