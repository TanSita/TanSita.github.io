
$(window).on('load' , function()
{
    makeselect("peoplenum",20);
    makeselect("tablenum",200);
    
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
                    var myprice = myfood.price;
                    var mycount = order.count;
                    var myscount = order.scount;
                    var mytprice = parseFloat(myprice) * mycount;

                    // console.log(myname,mycount,myscount);
                    $("#mytable" + mytablenum).append(makeElement(myname,myprice,mycount,myscount,mytprice));
                });

            });
        }).done(function() 
        {
            // $("#mybuylist").append(maketotal(mytotalprice));
        });
    });

});

function makeselect(myid,num)
{
    for (var i=1;i<=num;i++) 
    {
        var sel = document.getElementById(myid);
        sel.options[sel.options.length] = new Option(i,i);
    }
}

function maketable(tablenum)
{
    var myhtml = 
    '<table class="table table-striped" id="' + "mytable" + tablenum + '">' +
        '<h4 class="form-setting form-control text-center">' + tablenum + "桌" + '</h4>' + 
        '<thead>' + 
            '<tr>' +
                '<th class="text-center" width="30%">名稱</th>' +
                '<th class="text-center" width="14%">單價</th>' +
                '<th class="text-center" width="14%">份數</th>' +
                '<th class="text-center servecount" width="14%">待上</th>' +
                '<th class="text-center" width="14%">總價</th>' +
                '<th class="text-center" width="14%">設定</th>' +
            '</tr>' +
        '</thead>'+
        '<tbody id="mytablebody">' +
        
        '</tbody>' +
    '</table>';

    return myhtml;
}


function makeElement(name,price,count,scount,tprice)
{

    var myhtml = 
    '<tr class="text-center">' +
        '<td class="scrolltd">' + name + '</td>' +
        '<td>' + price + '</td>' +
        '<td>' + count + '</td>';
        if(scount==0)
        {
            myhtml += '<td class="overcount">' + "X" + '</td>';
        }
        else
        {
            myhtml += '<td class="servecount">' + scount + '</td>';
        }
    myhtml +=
        '<td>' + tprice + '</td>' +
        '<td>' + 
        '<span class="btn btn-danger btn-xs" ' +
                'onclick="delfromList(' + "this"  + ');">Ｘ'+
                '</span>' +
        '</td>' +
    '</tr>';

    return myhtml;
}

function delfromList(delbutton)
{
    delbutton.parentElement.parentElement.replaceWith('');
}


