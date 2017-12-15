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
                var mytotalprice = 0;

                $("#mybuyList").append(maketable(mytableNum));

                $.each(myorders,function(index,order) 
                {
                    var myfood = tsjson[order.id];
                    var myname = myfood.name;
                    var myprice = myfood.price;
                    var mycount = order.count;
                    var mytprice = parseFloat(myprice) * mycount;
                    mytotalprice += mytprice;

                    $("#mytable" + mytableNum).append(makeElement(myname,myprice,mycount,mytprice));
                });

                $("#total" + mytableNum).text(mytotalprice + "元");
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
            '<span id="' + "total" + tableNum + '" ' + 
            'class="btn btn-green disableClick text-center">' + "" + '</span>' + 
            '<span class="btn btn-danger" ' +
                    'onclick="delList(' + "this"  + ');">Ｘ'+
            '</span>' +
        '</div>' +
        '<table class="table table-striped" id="' + "mytable" + tableNum + '">' +
            '<thead>' + 
                '<tr>' +
                    '<th class="text-center" width="40%">名稱</th>' +
                    '<th class="text-center" width="20%">單價</th>' +
                    '<th class="text-center" width="20%">份數</th>' +
                    '<th class="text-center" width="20%">總價</th>' +
                '</tr>' +
            '</thead>'+
            '<tbody id="mytablebody">' +
            
            '</tbody>' +
        '</table>' +
    '</div>';

    return myhtml;
}

// submit按下去後，不重新整理的魔法 >3<
$('#QRcodeMakerForm').submit(function () 
{
    makeQRcode();
    return false;
});


function makeQRcode()
{
    var peopleNum = $("#peopleNum").val();
    var tableNum = $("#tableNum").val();

    if(peopleNum.length==0 || tableNum.length==0)
    {

    }
    else
    {
        $("#QRcodeImg").attr({"src":"images/QRcode.png"});
        console.log(peopleNum,tableNum);
    }
}

function makeElement(name,price,count,tprice)
{

    var myhtml = 
    '<tr class="text-center">' +
        '<td class="scrolltd">' + name + '</td>' +
        '<td>' + price + '</td>' +
        '<td>' + count + '</td>' +
        '<td>' + tprice + '</td>' +
    '</tr>';

    return myhtml;
}

function delList(delbutton)
{
    swal(
    {
        title: '確定刪除？',
        text: '按下確定此訂單將會被刪除...',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#f0ad4e',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
    }).then(function () 
    {
        delbutton.parentElement.parentElement.replaceWith('');
    },function (dismiss) 
    {
        if (dismiss === 'cancel') 
        {

        }
    });
}



