window.addEventListener('load',function(){
    var gate = new Gategory();
    gate.getCateLeft();
    gate.getCateRight();
    gate.scrollInit();
})

function Gategory(){

}

Gategory.prototype={
    scrollInit:function(){
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    // 渲染分类页面左边的方法
    getCateLeft:function(){
        $.ajax({
            url:"/category/queryTopCategory",
            success:function(backData){
                console.log(backData);
                var html = template("categoryLeftTmp",backData);
                $('#main .left-content ul').html(html);
                $('#main .left-content ul li').children().eq(0).addClass('active');
            }
        })
    },
    // 渲染分类页面右边的方法
    getCateRight:function(){
        getData(1);
        $('#main .left-content ul').on('click','li a',function(){
            // console.log($('#main .left-content ul li').children());
            $('#main .left-content ul li').children().removeClass('active');
            $(this).addClass('active');
            var id = $(this).data('id');
            console.log(id);
            getData(id);
        })
       function getData(id){
            $.ajax({
                url:"/category/querySecondCategory",
                data:{id:id},
                success:function(backData){
                    console.log(backData);
                    var html = template('categoryRightTmp',backData);
                    $('.mui-scroll').html(html);
                }
            })
       }
    }
}