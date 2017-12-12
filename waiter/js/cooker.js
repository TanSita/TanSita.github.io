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
                var mytablenum = item.Tnum;
                var myorders = item.order;

                $("#mybuyList").append(maketable(mytablenum));

                $.each(myorders,function(index,order) 
                {
                    var myfood = tsjson[order.id];
                    var myname = myfood.name;
                    var mycount = order.count;
                    var myscount = order.scount;

                    if(myscount > 0)
                        $("#mytable" + mytablenum).append(makeElement(myname,mycount,myscount));
                });

            });
        }).done(function() 
        {
            // $("#mybuylist").append(maketotal(mytotalprice));
        });
    });

});

function maketable(tablenum)
{
    var myhtml = 
    '<div class="tabletitle">' + 
        '<span class="btn btn-black disableClick form-setting form-control text-center">' + tablenum + "桌" + '</span>' + 
    '</div>' +
    '<table class="table table-striped" id="' + "mytable" + tablenum + '">' +
        '<thead>' + 
            '<tr>' +
                '<th class="text-center" width="40%">名稱</th>' +
                '<th class="text-center" width="30%">份數</th>' +
                '<th class="text-center servecount" width="30%">待上</th>' +
            '</tr>' +
        '</thead>'+
        '<tbody id="mytablebody">' +
        
        '</tbody>' +
    '</table>';

    return myhtml;
}


function makeElement(name,count,scount)
{
    var myhtml = 
    '<tr class="text-center">' +
        '<td class="scrolltd">' + name + '</td>' +
        '<td>' + count + '</td>';
        
    if(scount==0)
    {
        myhtml += 
        '<td class="overcount">' + "X" + '</td>';
    }
    else
    {
        myhtml += 
        '<td class="servecount">' + scount + '</td>';
    }

    myhtml += 
    '</tr>';

    return myhtml;
}
