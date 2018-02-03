var sea = null;
$(function(){
    sea = new Search();
    sea.addSearchData();
    sea.getSearchData();
    sea.deleteSearchData();
    sea.deleteAll();
})

function Search(){

}

Search.prototype={
    //添加历史记录
    addSearchData:function(){
        
        // var historyData = [];
        $('.btn-search').on('click',function(){
          var search = $('.search-input input').val();
        //   console.log(search);
           var historyData = JSON.parse(localStorage.getItem("data") || '[]');
            // console.log(historyData);
                if(!search){
                    alert("请输入您要搜索的商品");
                    return false;
                }
                var id = 0;
                if(historyData.length==0){
                    id = 1
                }else{
                   id = historyData[historyData.length-1].id+1
                }
                var obj = {id:id,"search":search}
                historyData.push(obj);
                console.log(historyData);
                localStorage.setItem("data",JSON.stringify(historyData));
                // obj = {"data":historyData}
                // console.log(obj);
                sea.getSearchData();
        })       
    },
    //渲染历史记录
    getSearchData:function(){
        
        var historyData = JSON.parse(localStorage.getItem("data") || '[]');
       
        console.log(historyData);
        historyData.reverse();
        var html = template("searchTmp",{"data":historyData});
        // console.log(html);
         $('.mui-table-view').html(html);
    },
    //点击删除的方法
    deleteSearchData:function(){
        $('.mui-table-view').on('click','.fa-close',function(){
           var id = $(this).data("id");
           console.log(id);
           var historyData = JSON.parse(localStorage.getItem("data") || '[]');
           for(var i = 0 ; i <= historyData.length-1;i++){
               if(historyData[i].id==id){
                historyData.splice(i,1);
               }
           }
            
           console.log(historyData);
           localStorage.setItem("data",JSON.stringify(historyData));
           
           sea.getSearchData();
        })
    },
    //全部清空的方法
    deleteAll:function(){
        $('.fa-trash').click(function(){
            // console.log('123');
            localStorage.setItem("data",'[]');

            sea.getSearchData();
        })
    }
}