
$(window).on('load' , function()
{
    var tsjson;
    var mytotalprice = 0;

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
                var myfood = tsjson[item.id];
                var myname = myfood.name;
                var myprice = myfood.price;
                var mycount = item.count;
                var myscount = item.scount;
                var mytprice = parseFloat(myfood.price) * item.count;
                mytotalprice += mytprice;

                $("#mytablebody").append(maketable(myname,myprice,mycount,myscount,mytprice));
            });
        }).done(function() 
        {
            $("#mybuylist").append(maketotal(mytotalprice));
        });
    });

});

function maketotal(totalprice)
{
    var myhtml = 
    '<hr>' +
    '<strong class="totalfont pull-right">' +
    '總共 : ' + totalprice + '元' + 
    '</strong>';

    return myhtml;
}


function maketable(name,price,count,scount,tprice)
{
    var myhtml = 
    '<tr class="text-center">' +
        '<td class="scrolltd">' + name + '</td>' +
        '<td>' + price + '</td>' +
        '<td>' + count + '</td>' +
        '<td class="servecount">' + scount + '</td>' +
        '<td>' + tprice + '</td>' +
    '</tr>'

    return myhtml;
}


// Service Bell
function servicebell()
{
    swal
    (
        '您點了服務鈴',
        '服務人員將會盡快為您服務！',
        'success'
    )
}
