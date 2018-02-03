var prd = null;
$(function(){
    prd = new Prodcut();
    prd.productDowninit();
})

function Prodcut(){

}
Prodcut.prototype={
    productDowninit:function(){
        mui.init({
            pullRefresh: {
                container: '.mui-scroll-wrapper',
                down: {
                    callback: pulldownRefresh
                },
                up: {
                    contentrefresh: '正在加载...',
                    callback: pullupRefresh
                }
            }
        });
         function pulldownRefresh(){
             $.ajax({
                url:'/product/queryProduct',
                data:{page:1,pageSize:2},
                success:function(data){
                    // console.log(data);
                    var html = template('productTmp',data);
                    // console.log(html);
                    $('.mui-table-view').html(html);
                    // mui('.mui-scroll-wrapper').pullRefresh().endPulldown(true);
                    mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                }
             })
         }
         function pullupRefresh(){
            $.ajax({
                url:'/product/queryProduct',
                data:{page:1,pageSize:4},
                success:function(data){
                    // console.log(data);
                    var html = template('productTmp',data);
                    // console.log(html);
                    $('.mui-table-view').html(html);
                    // mui('.mui-scroll-wrapper').pullRefresh().endPulldown(true);
                    mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                }
             })  
         }
    }
}