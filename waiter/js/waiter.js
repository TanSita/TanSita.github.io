
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
                var mytablenum = item.Tnum;
                var myorders = item.order;

                $("#mybuyList").append(maketable(mytablenum));

                $.each(myorders,function(index,order) 
                {
                    var myfood = tsjson[order.id];
                    var myname = myfood.name;
                    var mycount = order.count;
                    var myscount = order.scount;

                    // console.log(myname,mycount,myscount);
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
    '<table class="table table-striped" id="' + "mytable" + tablenum + '">' +
        '<h4 class="form-setting form-control text-center">' + tablenum + "桌" + '</h4>' + 
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


function makeElement(name,count,scount)
{

    var myhtml = 
    '<tr class="text-center">' +
        '<td class="scrolltd">' + name + '</td>' +
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
        '<td>' + 
        '<span class="btn btn-success btn-xs" ' +
                'onclick="calculate(' + "this" + "," + "true" + ');">＋'+
                '</span>' +

                '<span class="btn btn-warning btn-xs" ' +
                'onclick="calculate(' + "this" + "," + "false" + ');">－'+
                '</span>' +
        '</td>' +
    '</tr>';

    return myhtml;
}

function calculate(setting,addorminus)
{
    var scount = setting.parentElement.previousElementSibling;

    var num = scount.innerText;
    if(num == "X") num = 0;
    else num = parseInt(num);

    if(addorminus == true)
    {
        num += 1;
        scount.innerText = num;
        scount.setAttribute("class","servecount");
    }
    else
    {
        if(num > 0)
        {
            num -= 1;
            if(num==0)
            {
                scount.innerText = "X";
                scount.setAttribute("class","overcount");
            }
            else
                scount.innerText = num;
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
        swal
        (
            '刪除成功！',
            '服務鈴已被刪除！',
            'success'
        )
        bell.replaceWith('');
    },function (dismiss) 
    {
        if (dismiss === 'cancel') 
        {

        }
    });

}


function makeBell(tablenum)
{
    var myhtml = 
    '<button class="bellbutton btn btn-danger" onclick="delBell(this);">'+
        + tablenum +
    '</button>';

    return myhtml;
}