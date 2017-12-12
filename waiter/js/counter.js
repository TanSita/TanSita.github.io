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
                var mytotalprice = 0;

                $("#mybuyList").append(maketable(mytablenum));

                $.each(myorders,function(index,order) 
                {
                    var myfood = tsjson[order.id];
                    var myname = myfood.name;
                    var myprice = myfood.price;
                    var mycount = order.count;
                    var mytprice = parseFloat(myprice) * mycount;
                    mytotalprice += mytprice;

                    // console.log(myname,mycount,myscount);
                    $("#mytable" + mytablenum).append(makeElement(myname,myprice,mycount,mytprice));
                });

                $("#total" + mytablenum).text(mytotalprice + "元");
            });
        }).done(function() 
        {
        });
    });

});

function maketable(tablenum)
{
    var myhtml = 
    '<div>' +
        '<div class="tabletitle">' + 
            '<span class="btn btn-black disableClick form-setting form-control text-center">' + tablenum + "桌" + '</span>' + 
            '<span id="' + "total" + tablenum + '" ' + 
            'class="btn btn-green disableClick text-center">' + "" + '</span>' + 
            '<span class="btn btn-danger" ' +
                    'onclick="delList(' + "this"  + ');">Ｘ'+
            '</span>' +
        '</div>' +
        '<table class="table table-striped" id="' + "mytable" + tablenum + '">' +
            '<thead>' + 
                '<tr>' +
                    '<th class="text-center" width="40%">名稱</th>' +
                    '<th class="text-center" width="15%">單價</th>' +
                    '<th class="text-center" width="15%">份數</th>' +
                    '<th class="text-center" width="15%">總價</th>' +
                    '<th class="text-center" width="15%">設定</th>' +
                '</tr>' +
            '</thead>'+
            '<tbody id="mytablebody">' +
            
            '</tbody>' +
        '</table>' +
    '</div>';

    return myhtml;
}


function makeElement(name,price,count,tprice)
{

    var myhtml = 
    '<tr class="text-center">' +
        '<td class="scrolltd">' + name + '</td>' +
        '<td>' + price + '</td>' +
        '<td>' + count + '</td>' +
        '<td>' + tprice + '</td>' +
        '<td>' + 
        '<span class="btn btn-danger btn-xs" ' +
                'onclick="delfromList(' + "this"  + ');">Ｘ'+
                '</span>' +
        '</td>' +
    '</tr>';

    return myhtml;
}

function delList(delbutton)
{
    delbutton.parentElement.parentElement.replaceWith('');
}

function delfromList(delbutton)
{
    delbutton.parentElement.parentElement.replaceWith('');
}


