$('footer>div').on('click',function(){
    $(this).addClass('active').siblings().removeClass('active')
    var index = $(this).index()
    $('section').eq(index).show().siblings().hide()
})
var index = 0
var isloading = false

start()
function start(){
    if(isloading) return
    isloading = true
    $('.loading').show()
    $.ajax({
        url: 'https://api.douban.com/v2/movie/top250',
        type: 'GET',
        data: {
            start: index,
            count: 20
        },
        dataType: 'jsonp'
    }).done(function(ret){
        setData(ret)
        console.log(ret)
        index += 20
    }).fail(function(){
        console.log('error....')
    }).always(function(){
        isloading = false
        $('.loading').hide()
    })
}

var clock
$('main').scroll(function(){
    if(clock){
        clearTimeout(clock)
    }
    clock = setTimeout(function(){
        if($('section').eq(0).height()===$('main').scrollTop() + $('main').height()){
            start()
        }
    },300)
     
})

function setData(data){
    data.subjects.forEach(function(movie){
        var tpl = `<div class="item">
        <a href="#">
            <div class="cover">
                <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
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
    // console.log(movie.images.medium)
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
    $('#top250').append($node)
    })
}
