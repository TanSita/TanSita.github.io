$(window).on('load' , function()
{
    var tsjson;

    // 名稱 單價 份數 總價
    $.getJSON("./tsjson.json",function(data)
    {
        tsjson = data;
    }).done(function() 
    {
        $.getJSON("./hudingjson.json",function(data)
        {
            $.each(data,function(i,item) 
            {
                var mytableNum = item.tableNum;
                var myorders = item.order;
                var trashCount = 0;

                $("#mybuyList").append(maketable(mytableNum));

                $.each(myorders,function(index,order) 
                {
                    var myfood = tsjson[order.id];
                    var myname = myfood.name;
                    var mycount = order.count;
                    var myscount = order.scount;

                    if(myscount > 0)
                        $("#mytable" + mytableNum).append(makeElement(myname,mycount,myscount));
                    else
                        trashCount++;
                });

                if(trashCount==myorders.length)
                    $("#mytable" + mytableNum).parent().replaceWith('');

            });
        }).done(function() 
        {

        });
    });

});

function maketable(tableNum)
{
    var myhtml = 
    '<div>' + 
        '<div class="tabletitle">' + 
            '<span class="btn btn-black disableClick form-setting form-control text-center">' + tableNum + "桌" + '</span>' + 
        '</div>' +
        '<table class="table table-striped" id="' + "mytable" + tableNum + '">' +
            '<thead>' + 
                '<tr>' +
                    '<th class="text-center" width="40%">名稱</th>' +
                    '<th class="text-center" width="30%">份數</th>' +
                    '<th class="text-center servecount" width="30%">待上</th>' +
                '</tr>' +
            '</thead>'+
            '<tbody id="mytablebody">' +
            
            '</tbody>' +
        '</table>' +
    '</div>';

    return myhtml;
}


function makeElement(name,count,scount)
{
    var myhtml = 
    '<tr class="text-center">' +
        '<td class="scrolltd">' + name + '</td>' +
        '<td>' + count + '</td>' +
        '<td class="servecount">' + scount + '</td>' +
    '</tr>';

    return myhtml;
}
