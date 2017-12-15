var forhuding = [];

$(window).on('load' , function()
{
    var tsjson;

    // 名稱 單價 份數 總價
    $.getJSON("./tsjson.json",function(data)
    {
        tsjson = data;
    }).done(function() 
    {
        $.getJSON("./belljson.json",function(data)
        {
            $.each(data,function(i,item) 
            {
                $("#mybellList").append(makeBell(item));
            });
        });

        $.getJSON("./hudingjson.json",function(data)
        {
            $.each(data,function(i,item) 
            {
                var mytableNum = item.tableNum;
                var myorders = item.order;

                $("#mybuyList").append(maketable(mytableNum));

                $.each(myorders,function(index,order) 
                {
                    var myorderID = order.id;
                    var myfood = tsjson[myorderID];
                    var myname = myfood.name;
                    var mycount = order.count;
                    var myscount = order.scount;

                    $("#mytable" + mytableNum).append(makeElement(mytableNum,myorderID,myname,mycount,myscount));
                });

            });
        }).done(function() 
        {
            // $("#mybuylist").append(maketotal(mytotalprice));
        });
    });

});

function maketable(tableNum)
{
    var myhtml = 
    '<div class="tabletitle">' + 
        '<span class="btn btn-black disableClick form-setting form-control text-center">' + tableNum + "桌" + '</span>' + 
    '</div>' +
    '<table class="table table-striped" id="' + "mytable" + tableNum + '">' +
        '<thead>' + 
            '<tr>' +
                '<th class="text-center" width="40%">名稱</th>' +
                '<th class="text-center" width="15%">份數</th>' +
                '<th class="text-center servecount" width="15%">待上</th>' +
                '<th class="text-center" width="30%">設定</th>' +
            '</tr>' +
        '</thead>'+
        '<tbody id="mytablebody">' +
        
        '</tbody>' +
    '</table>';

    return myhtml;
}

function delfromList(tableNum,orderID,delbutton)
{
    swal(
    {
        title: '確定刪除？',
        text: '按下確定此餐點將會被刪除...',
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
        editOrder(tableNum,orderID,-1);
    },function (dismiss) 
    {
        if (dismiss === 'cancel') 
        {

        }
    });
}

function makeElement(tableNum,orderID,name,count,scount)
{
    var myhtml = 
    '<tr class="text-center">' +
        '<td class="scrolltd">' + name + '</td>' +
        '<td>' + count + '</td>';
        
        if(scount==0) 
            myhtml += '<td class="overcount">' + scount + '</td>';
        else
            myhtml += '<td class="servecount">' + scount + '</td>';
    
    myhtml+=
        '<td>' + 
            '<span class="btn btn-success btn-xs" ' +
            'onclick="calculate(' + tableNum + ',' 
            + orderID + ',' + count + ',' +
            "this" + "," + "true" + ');">＋'+
            '</span>' +

            '<span class="btn btn-warning btn-xs" ' +
            'onclick="calculate(' + tableNum + ',' 
            + orderID + ',' + count + ',' +
            "this" + "," + "false" + ');">－'+
            '</span>' +

            '<span class="btn btn-danger btn-xs" ' +
            'onclick="delfromList(' + tableNum + ',' 
            + orderID + ',' + "this"  + ');">Ｘ'+
            '</span>' +
        '</td>' +
    '</tr>';

    return myhtml;
}

function calculate(tableNum,orderID,count,setting,addorminus)
{
    var scount = setting.parentElement.previousElementSibling;

    var num = scount.innerText;
    num = parseInt(num);

    if(addorminus == true)
    {
        if(num < count)
        {
            num += 1;
            scount.innerText = num;
            scount.setAttribute("class","servecount");

            editOrder(tableNum,orderID,num);
        }
    }
    else
    {
        if(num > 0)
        {
            num -= 1;
            scount.innerText = num;

            if(num==0)
                scount.setAttribute("class","overcount");

            editOrder(tableNum,orderID,num);
        }
    }
}

function delBell(bell)
{
    swal(
    {
        title: '確定刪除？',
        text: '按下確定服務鈴將會被刪除...',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#f0ad4e',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
    }).then(function () 
    {
        bell.replaceWith('');
    },function (dismiss) 
    {
        if (dismiss === 'cancel') 
        {

        }
    });

}


function makeBell(tableNum)
{
    var myhtml = 
    '<button class="bellbutton btn btn-danger" onclick="delBell(this);">'+
        + tableNum +
    '</button>';

    return myhtml;
}


// for huding json


function editOrder(tableNum , foodID , scount)
{
    for(var i=0;i<forhuding.length;i++)
    {
        var itemtableNum = forhuding[i].tableNum;

        // order
        if(itemtableNum == tableNum)
        {
            var itemOrder = forhuding[i].order;
            for(var j=0;j<itemOrder.length;j++)
            {
                var itemfoodID = itemOrder[j].id;

                if(itemfoodID == foodID)
                {

                    itemOrder[j].scount = scount;
                    return 1;
                }
            }
            itemOrder.push({"id":foodID,"scount":scount});
            return 1;
        }
    }

    // 如果沒這ㄍtableNum
    forhuding.push({"tableNum" : tableNum,"order":[{"id" : foodID,"scount" : scount}]});
    return 0;
}


function SaveValue()
{
    console.log(forhuding);
    forhuding = [];
}