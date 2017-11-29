var mypanel_colors = ["info","warning","danger","success"];
var mypanel_colorsLen = mypanel_colors.length;

var json;
var fsrc = "";
var shoppingitems = [];
var alreadyClick = [];

var HudingnewList = 
{
    "action":"new",
    "food":
    [
    ]
}

var HudingeditList = 
{
    "action":"edit",
    "food":
    [
    ]
}

var HudingdelList = 
{
    "action":"delete",
    "food":
    [
    ]
}

// --------------------------------


var TSnewList = 
{
    "action":"new",
    "food":
    [
    ]
}

var TSeditList = 
{
    "action":"edit",
    "food":
    [
    ]
}

var TSdelList = 
{
    "action":"delete",
    "food":
    [
    ]
}



mysmoothTouchScroll();

function mysmoothTouchScroll()
{
    $("#touchScroller").smoothTouchScroll();
}

function readURL(input) 
{
    var limitSize = 10485760;
    var CanUpload = true;
    if (input.files && input.files[0])
    {   
        var reader = new FileReader();

        if(!(input.files[0].type=="image/jpeg" || 
             input.files[0].type=="image/png" ||
             input.files[0].type=="image/gif"))
        {
            alert("上傳的圖片格式必須是jpg/png/gif :D");
            CanUpload = false;
        }

        if(input.files[0].size > limitSize)
        {
            alert("上傳的圖片大小必須<=10MB");
            CanUpload = false;
        }

        reader.onload = function (e) 
        { 
            fsrc = e.target.result;
            $('#img_prev').attr('src', e.target.result);
        };

        if(CanUpload) reader.readAsDataURL(input.files[0]); 
    } 
    else 
    { 
        //IE下 
        var docObj = document.getElementById('uploader'); 
        docObj.select(); 
        
        //解决IE9下document.selection拒絕
        docObj.blur(); 
        var imgSrc = document.selection.createRange().text; 
        var localImagId = document.getElementById("IEImag"); 
        $('#IEImag').width(200).height(200); //必须設置初始大小 
        
        //圖片異常
        try 
        { 
            localImagId.style.filter ="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)"; 
            localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc; 
        } 
        catch (e) 
        { 
            alert("您上傳的圖片格式不正確，請重新選擇!"); 
            return false; 
        } 
        $('#img_prev').hide(); 
        document.selection.empty(); 
    } 
}

function uploadImage(name , price , src , intro , top10)
{
    // top10 不用 ' '

    var myhtml = 
    '<input id="myname" type="text" class="form-control" placeholder="菜名... " value="' + name + '" required>'+

    '<div class="row alignleft">' +
        '<input id="myprice" type="text" class="customTextbox" ' +
        'placeholder="價錢... " value="' + price + '" required>' +
    '</div>' +

    '<div class="alignright">' +
        addStar(top10) +
    '</div>' +

    '<br>' +
    '<img id="img_prev" src="' + src + '" width="50%">' +
    '<br>' + 

    '<div class="monkeyb-cust-file">' + 
    '<input type="file" id="uploader" onchange="readURL(this);">' + 
    '   <span>選擇照片</span>' +
    '</div>' + 
    '<br><br>' +

    '<textarea class="form-control" rows="5" id="myintro">' + 
    intro +
    '</textarea>';
    

    return myhtml;
}

function add3buttons(hudingID , tsID , imageID , name , price , src , intro , top10 , category)
{
    var myhtml = 
    '<br><br>'+
    '<span class="myCorfirmButton" onclick="myConfirm(' + 
    hudingID + "," + tsID + ",'" + imageID + "','" +
    name + "'," + price + ",'" + src + "','" + 
    intro + "'," + top10 + ",'" + category + "'" + 
    ');">' + 
    '修改</span>' +
    '<span class="myDeleteButton" onclick="myDelete(' +
    hudingID + "," + tsID + ",'" + imageID + "'" +
    ');">刪除</span>' +
    '<span class="myCancelButton" onclick="myCancel();">取消</span>';


    return myhtml;        
}

function myConfirm(hudingID , tsID , imageID , name , price , src , intro , top10 , category)
{
    var fname = $("#myname").val();
    var fprice = $("#myprice").val();
    var fintro = $("#myintro").val();
    var ftop10 = false;
    
    var fcategoryID = imageID.split("_")[0];
    var fnum = fcategoryID.replace("category","");
    var fcategoryTitleID = "categoryTitle" + fnum;
    var fcategory = $("#" + fcategoryTitleID)[0].innerHTML;

    if($(".star")[1].getAttribute("id")=="fullstar")
    {
        ftop10 = true;
    }

    if(fname.length>0 && fprice.length>0 && fintro.length>0)
    {
        //如果有更新圖片
        if(fsrc.length > 0) 
        {
            //更改圖片
            $("#" + imageID).replaceWith(addImage(hudingID,tsID,imageID,fname,fprice,fsrc,fintro,ftop10,fcategory)); 
            $("." + imageID).replaceWith(addtop10(hudingID,tsID,imageID,fname,fprice,fsrc,fintro,ftop10,fcategory)); 

            //如果之前沒有放到top10就放過去
            if(top10==false && ftop10==true)
            {
                $(".scrollableArea").append(addtop10(hudingID,tsID,imageID,fname,fprice,fsrc,fintro,ftop10,fcategory));
                mysmoothTouchScroll();
            }
            //如果之前放在top10 就移除
            else if(top10==true && ftop10==false)
            {
                $("." + imageID).replaceWith('');
            }

            if(tsID>=0)
            {
                TSeditListedit(tsID,fname,fprice,fsrc,fintro,ftop10,fcategory);
                // console.log(TSeditList);
            }
            else
            {
                TSnewListadd(imageID,fname,fprice,fsrc,fintro,ftop10,fcategory);
                // console.log(TSnewList);
            }

            if(hudingID>=0)
            {
                HudingeditListedit(hudingID,fname,fprice,fsrc,fintro,ftop10,fcategory);
                // console.log(HudingeditList);
            }
            else
            {
                HudingnewListadd(imageID,fname,fprice,fsrc,fintro,ftop10,fcategory);
                // console.log(HudingnewList);
            }

            fsrc = "";
        }
        //沒更新圖片的話，就只要把其他資訊改一改就好惹
        else
        {
            $("#" + imageID).replaceWith(addImage(hudingID,tsID,imageID,fname,fprice,src,fintro,ftop10,fcategory)); 
            $("." + imageID).replaceWith(addtop10(hudingID,tsID,imageID,fname,fprice,src,fintro,ftop10,fcategory)); 

            if(top10==false && ftop10==true)
            {
                $(".scrollableArea").append(addtop10(hudingID,tsID,imageID,fname,fprice,src,fintro,ftop10,fcategory));
                mysmoothTouchScroll();
            }
            else if(top10==true && ftop10==false)
            {
                $("." + imageID).replaceWith('');
            }


            if(tsID>=0)
            {
                TSeditListedit(tsID,fname,fprice,src,fintro,ftop10,fcategory);
                // console.log(TSeditList);
            }
            else
            {
                TSnewListadd(imageID,fname,fprice,src,fintro,ftop10,fcategory);
                // console.log(TSnewList);
            }

            if(hudingID>=0)
            {
                HudingeditListedit(hudingID,fname,fprice,src,fintro,ftop10,fcategory);
                // console.log(HudingeditList);
            }
            else
            {
                HudingnewListadd(imageID,fname,fprice,src,fintro,ftop10,fcategory);
                // console.log(HudingnewList);
            }
        }
    }
    swal.close();
}

function myDelete(hudingID,tsID,imageID)
{
    swal.close();

    swal(
    {
        title: '確認刪除嗎？',
        text: "刪除後的圖片無法恢復！",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#f0ad4e',
        confirmButtonText: '確定',
        cancelButtonText: '取消'
    }).then(function () 
    {
        $("#" + imageID).replaceWith('');
        $("." + imageID).replaceWith('');

        if(tsID>=0)
        {
            TSeditListdel(tsID);
            // console.log(TSeditList);
        }
        else
        {
            TSnewListdel(imageID);
            // console.log(TSnewList);
        }

        if(hudingID>=0)
        {
            HudingeditListdel(hudingID);
            // console.log(HudingeditList);
        }
        else
        {
            HudingnewListdel(imageID);
            // console.log(HudingnewList);
        }

        swal
        (
            '成功刪除',
            '圖片已經被移除了！',
            'success'
        )
    },function (dismiss) 
    {
        if (dismiss === 'cancel') 
        {

        }
    });
}

function myCancel()
{
    swal.close();
}


// alert box (add / edit /show)

function addAlert(num)
{
    // I = initial
    // f = function 
    var Iname = "";
    var Iprice = "";
    var Isrc = "images/nothing_here.png";
    var Iintro = "";
    var Itop10 = false;

    swal(
    {
        title: '新增餐點',
        html:  uploadImage(Iname,Iprice,Isrc,Iintro,Itop10)

    }).then(function () 
    {
        var fcategoryID = "category" + num;
        var fcategoryTitleID = "categoryTitle" + num;
        var fcategoryLen = $("#" + fcategoryID)[0].children.length;
        var fimageLastID;
        var fimagenum = 0; //如果啥都沒 就從0開始
        var fcategory = $("#" + fcategoryTitleID)[0].innerHTML;

        if(fcategoryLen > 0)
        {
            fimageLastID = $("#" + fcategoryID + " > div:last").attr('id');
            fimagenum = parseInt(fimageLastID.replace(fcategoryID + "_" + "image",""));
            fimagenum += 1;
        }
        
        var fimageID = fcategoryID + "_" + "image" + fimagenum;

        var fname = $("#myname").val();
        var fprice = $("#myprice").val();
        var fintro = $("#myintro").val();
        var ftop10 = false;

        if($(".star")[1].getAttribute("id")=="fullstar")
        {
            ftop10 = true;
        }

        if( fname.length>0 && fprice.length>0 && 
            fintro.length>0 && fsrc.length>0 )
        {

            $("#" + fcategoryID).append(addImage(-1,-1,fimageID,fname,fprice,fsrc,fintro,ftop10,fcategory)); //新增圖片到某個分類

            if(ftop10==true)
            {
                $(".scrollableArea").append(addtop10(-1 , -1 , fimageID , fname , fprice , fsrc , fintro , ftop10 , fcategory));
                mysmoothTouchScroll();
            }

            // json
            TSnewListadd(fimageID,fname,fprice,fsrc,fintro,ftop10,fcategory);
            // console.log(TSnewList);

            HudingnewListadd(fimageID,fname,fprice,fsrc,fintro,ftop10,fcategory);
            // console.log(HudingnewList);

            fsrc = ""; 
        }
    })
}

function editAlert(hudingID , tsID , imageID , name , price , src , intro , top10 , category)
{
    // name 是原本資料的
    // fname 是改之後的

    swal(
    {
        title: '編輯餐點',
        showConfirmButton: false,
        html:   uploadImage(name,price,src,intro,top10) +
                add3buttons(hudingID,tsID,imageID,name,price,src,intro,top10,category)

    }).then(function () 
    {
        // code都在add3buttons的onclick事件裡
    },
    function (dismiss) 
    {
        if (dismiss === 'cancel') 
        {

        }
    });
}

function showAlert(imageID , name , price , src , intro , top10)
{
    if(alreadyClick.indexOf(imageID) < 0)
    {
        swal(
        {
            title: '熱門美食',
            html: showImage(name,price,src,intro,top10),
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#f0ad4e',
            confirmButtonText: '放購物車',
            cancelButtonText: '取消',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger'
            // buttonsStyling: false
        }).then(function () 
        {
            shoppingitems.push(name + "," + price);
            alreadyClick.push(imageID);

            swal
            (
                '已加入購物車！',
                '感謝你的購買 m(____)m',
                'success'
            )
        });
    }
    else
    {
        swal(
        {
            title: '熱門美食',
            html: showImage(name,price,src,intro,top10),
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonColor: '#f0ad4e',
            cancelButtonText: '本產品已經在購物車！',
            cancelButtonClass: 'btn btn-danger'
        }).then(function () 
        {

        },
        function (dismiss) 
        {
            if (dismiss === 'cancel') 
            {

            }
        });
    }
}

// 關於top10的星星

function changeStar(star)
{
    var fstarid = star.getAttribute("id");

    if(fstarid=="emptystar")
    {
        $("#" + fstarid).replaceWith(addStar(true));
    }
    else
    {
        $("#" + fstarid).replaceWith(addStar(false));
    }
}

function addStar(top10)
{
    var myhtml = '';

    if(top10)
    {
        myhtml = '<span id="fullstar" class="glyphicon glyphicon-star star" onclick="changeStar(this);"></span>';
    }
    else
    {
        myhtml = '<span id="emptystar" class="glyphicon glyphicon-star-empty star" onclick="changeStar(this);"></span>';
    }

    return myhtml;
}

function showStar(top10)
{
    var myhtml = '';

    if(top10)
    {
        myhtml = '<span id="fullstar" class="glyphicon glyphicon-star showstar alignright"></span>';
    }
    else
    {
        myhtml = '<span id="emptystar" class="glyphicon glyphicon-star-empty showstar"></span>';
    }

    return myhtml;
}

//關於新增Image

function addImage(hudingID , tsID , imageID , name , price , src , intro , top10 , category)
{
    var myhtml = 
    '<div class="col-xs-4 text-center"' +  
        ' hudingID = ' + hudingID + 
        ' tsID = ' + tsID + 
        ' imageID = "' + imageID + '"' +
        ' name = "' + name + '"' +
        ' price = "' + price + '"' +
        ' src = "' + src + '"' +
        ' intro = "' + intro + '"' +
        ' top10 = ' + top10 + 
        ' category = "' + category + '"' +
        ' id="' + imageID + '">' +
        '<a onclick="' +  
            'editAlert(' + hudingID + "," + tsID +  ",'" + 
            imageID + "','" + name + "','" + price + "','" + src + "','" + 
            intro + "'," + top10 + ",'" + category + "'" + 
            ');">' + 
            '<img class="img-rounded" src="' + src + '" width="100%">' +
        '</a>' +
    '</div>';

    return myhtml;
}

function showImage(name , price , src , intro , top10)
{
    var myhtml = 
    '<div class="panel panel-info">' + 
        '<div class="mypanel-heading">' +
            '<strong class="alignleft">' + name + '</strong>' +
            showStar(top10) +
            '<strong class="text-danger alignmid">' + price + '</strong>' +
        '</div>' +

        '<div class="panel-body">' +
            '<img id="img_prev" src="' + src + '" width="100%">' +
        '</div>' +
        
        '<div class="panel-body">' +
            '<article class="myarticle">' + intro +
            '</article>' +
        '</div>' +

    '</div>';

    return myhtml;
}

function addtop10(hudingID , tsID , imageID , name , price , src , intro , top10 , category)
{
    var myhtml = 
    '<a class="' + imageID + '"' + 
        ' hudingID = ' + hudingID + 
        ' tsID = ' + tsID + 
        ' imageID = "' + imageID + '"' +
        ' name = "' + name + '"' +
        ' price = "' + price + '"' +
        ' src = "' + src + '"' +
        ' intro = "' + intro + '"' +
        ' top10 = ' + top10 + 
        ' category = "' + category + '"' +
        ' onclick="' +  
        'editAlert(' + hudingID + "," + tsID +  ",'" + 
            imageID + "','" + name + "','" + price + "','" + src + "','" + 
            intro + "'," + top10 + ",'" + category + "'" + 
            ');">' + 
        '<img src="' + src + '" class="img-circle Stories"/>' +
    '</a>';

    return myhtml;
}

// about shopping cart


function calculate(num,price,addorminus) // true = add , false = minus
{
    var itemIDCount = "itemIDCount" + num;
    var itemIDPrice = "itemIDPrice" + num;

    var mycount = parseInt($("#"+itemIDCount).text());
    var myprice = parseInt($("#"+itemIDPrice).text());

    if(addorminus==true)
    {
        mycount += 1;
        myprice = price * mycount;
        $("#" + itemIDCount).text(mycount);
        $("#" + itemIDPrice).text(myprice);
    }
    else
    {
        if(mycount>0)
        {
            mycount -= 1;
            myprice = price * mycount;
            $("#" + itemIDCount).text(mycount);
            $("#" + itemIDPrice).text(myprice);
        }
    }
}

function showItems()
{
    var myhtml = 
    '<table class="table table-bordered">' + 
    '<thead>' + 
        '<tr>' +
            '<th class="text-center">餐點名稱</th>'+
            '<th class="text-center">價錢</th>'+
            '<th class="text-center">份數</th>'+
            '<th class="text-center">設定</th>'+
        '</tr>'+
    '</thead>' +
    '<tbody>';

    for(var i=0;i<shoppingitems.length;i++)
    {
        // itemPrice 原本的錢
        // itemIDPrice 會存放 * count 之後的錢

        var splitItems = shoppingitems[i].split(",");
        var itemName = splitItems[0];
        var itemPrice = splitItems[1];
        var itemIDPrice = "itemIDPrice" + i;
        var itemIDCount = "itemIDCount" + i;

        myhtml +=
        '<tr>' +
            '<td class="scrolltd">' + itemName + '</td>' +
            '<td id="' + itemIDPrice + '">' + itemPrice + '</td>' +
            '<td id="' + itemIDCount + '">' + 1 + '</td>' +
            '<td>' +
                '<span class="btn btn-danger btn-xs" ' +
                'onclick="calculate(\''+ i + "','" + itemPrice + "'," + false + ');">－'+
                '</span>' +

                '<span class="btn btn-success btn-xs" ' +
                'onclick="calculate(\''+ i + "','" + itemPrice + "'," + true + ');">＋'+
                '</span>' +
            '</td>'+
        '</tr>';
    }

    myhtml += 
    '</tbody>' + 
    '</table>';

    return myhtml;
}


function showResult()
{
    var mytotal = 0;

    var myhtml = 
    '<table class="table table-bordered">' + 
    '<thead>' + 
        '<tr>' +
            '<th class="text-center">餐點名稱</th>'+
            '<th class="text-center">價錢</th>'+
            '<th class="text-center">份數</th>'+
        '</tr>'+
    '</thead>' +
    '<tbody>' +
    '<tr>';

    for(var i=0;i<shoppingitems.length;i++)
    {
        var splitItems = shoppingitems[i].split(",");
        var itemName = splitItems[0];
        var itemIDPrice = "itemIDPrice" + i;
        var itemIDCount = "itemIDCount" + i;
        var myprice = parseInt($("#"+itemIDPrice).text());
        var mycount = parseInt($("#"+itemIDCount).text());

        mytotal += myprice;

        myhtml +=
        '<tr>' +
            '<td class="scrolltd">' + itemName + '</td>' +
            '<td>' + myprice + '</td>' +
            '<td>' + mycount + '</td>' +
        '</tr>';
    }

    myhtml += 
    '</tbody>' + 
    '</table>';

    myhtml += '<br><hr>';
    myhtml += '<strong>總共 ' + mytotal + '</strong>';


    return myhtml;
}

function shoppingcart()
{
    swal(
    {
        title: '購物車',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#f0ad4e',
        confirmButtonText: '我要點餐',
        cancelButtonText: '取消',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        html: showItems()
    }).then(function () 
    {
        swal(
        {
            title:'點餐成功！',
            html: showResult()
        });
    },function (dismiss) 
    {
        if (dismiss === 'cancel') 
        {
            // swal
            // (
            //     'Cancelled',
            //     'Your imaginary file is safe :)',
            //     'error'
            // )
        }
    });
}



// 關於List編輯 刪除
function addListTextbox()
{
    var num = 0; //如果沒進去底下的if 代表說根本沒li 所以從0開始的異世界生活
    // 有一個是button 所以要-1
    var categoriesLen = $("#categories").children().length - 1;

    if(categoriesLen > 0)
    {
        var categoriesLastID = $("#categories > li:last").attr("ID");
        num = parseInt(categoriesLastID.replace("list",""));
        num += 1;
    }

    $("#" + "addCategoryTextButton").before(makeListTextbox(num,'new',false,false));
    $("body").append(makeCategory(num,''));

    $(".navbar li a").css({"display" : "inline-block" , "width" : "calc(100% - 90px)"});
}

function makeListTextbox(num,new_or_edit,huding,ts)
{
    var myhtml = 
    '<li id="' + "list" + num + '">' + 
        '<input type="text" '+
        'class="form-control ' + new_or_edit + 'CategoryTextbox' + 
        '" id="' + new_or_edit + 'CategoryTextbox' + num +
        '" placeholder="輸入餐點分類">';
    
    myhtml += makeOKDeleteButton(num,new_or_edit,huding,ts);

    myhtml += '</li>';

    return myhtml;
}

function makeList(num , listText , huding , ts)
{
    var listID = "list" + num;
    var categoryID = "category" + num;

    var myhtml = 
    '<li id="' + listID + '">' +
        '<a href="#' + categoryID + '">' + listText +
        '</a>' + 
        makeEditDeleteButton(num,huding,ts) +
    '</li>';

    return myhtml;
}

function makeCategory(num , listText)
{
    var categoryID = "category" + num;
    var categoryTitleID = "categoryTitle" + num;

    var myhtml = 
    '<div class="panel panel-' + mypanel_colors[num%mypanel_colorsLen] + '">' +
        '<div class="panel-heading">' +
             '<div class="row">' + 
                '<div class="alignleft">' +
                    '<strong class="panel-title" id="' + categoryTitleID + '">' + listText + '</strong>' +
                '</div>' +
                '<div class="alignright">' +
                    '<button class="btn btn-success " onclick="addAlert(' + num + ')">' + '新增</button>' +
                '</div>' +
            '</div>' +
        '</div>' +

        '<div id ="' + categoryID + '" class="panel-body color-' + mypanel_colors[num%mypanel_colorsLen] + '">' +

        '</div>' +
    '</div>';


    return myhtml;
}

function OKItem(num,new_or_edit,huding,ts)
{
    var mylistID = "list" + num;
    var mycategoryTitleID = "categoryTitle" + num;

    var myTextboxID = new_or_edit + "CategoryTextbox" + num;

    var mylistText = $("#" + myTextboxID).val();

    if(mylistText.length>0)
    {
        $("#" + mylistID).replaceWith(makeList(num,mylistText,huding,ts));
        $("#" + mycategoryTitleID)[0].innerHTML = mylistText;

        if(new_or_edit=='edit')
        {
            if(huding==true)
            {
                var mycategoryID = "category" + num;
                var mycategoryLen = $("#" + mycategoryID)[0].children.length;

                for(var i=0;i<mycategoryLen;i++)
                {
                    var myfood = $("#" + mycategoryID)[0].children[i];
                    var myimageID = myfood.getAttribute("imageID");
                    var myhudingID = parseInt(myfood.getAttribute("hudingID"));
                    var myname = myfood.getAttribute("name");
                    var myprice = parseInt(myfood.getAttribute("price"));
                    var mysrc = myfood.getAttribute("src");
                    var myintro = myfood.getAttribute("intro");
                    var mytop10 = myfood.getAttribute("top10") == "true";
                    var mycategory = mylistText;
                    myfood.setAttribute("category" , mylistText);
                    $("." + myimageID).attr("category" , mylistText);

                    HudingeditListedit(myhudingID,myname,myprice,mysrc,myintro,mytop10,mycategory);
                    
                    console.log(HudingeditList);
                }
            }
            else
            {
                var mycategoryID = "category" + num;
                var mycategoryLen = $("#" + mycategoryID)[0].children.length;

                for(var i=0;i<mycategoryLen;i++)
                {
                    var myfood = $("#" + mycategoryID)[0].children[i];
                    var myimageID = myfood.getAttribute("imageID");
                    var myname = myfood.getAttribute("name");
                    var myprice = parseInt(myfood.getAttribute("price"));
                    var mysrc = myfood.getAttribute("src");
                    var myintro = myfood.getAttribute("intro");
                    var mytop10 = myfood.getAttribute("top10") == "true";
                    var mycategory = mylistText;
                    myfood.setAttribute("category" , mylistText);
                    $("." + myimageID).attr("category" , mylistText);


                    HudingnewListadd(myimageID,myname,myprice,mysrc,myintro,mytop10,mycategory);
                    console.log(HudingnewList);
                }
            }

            if(ts==true)
            {
                var mycategoryID = "category" + num;
                var mycategoryLen = $("#" + mycategoryID)[0].children.length;

                for(var i=0;i<mycategoryLen;i++)
                {
                    var myfood = $("#" + mycategoryID)[0].children[i];
                    var myimageID = myfood.getAttribute("imageID");
                    var mytsID = parseInt(myfood.getAttribute("tsID"));
                    var myname = myfood.getAttribute("name");
                    var myprice = parseInt(myfood.getAttribute("price"));
                    var mysrc = myfood.getAttribute("src");
                    var myintro = myfood.getAttribute("intro");
                    var mytop10 = myfood.getAttribute("top10") == "true";
                    var mycategory = mylistText;
                    myfood.setAttribute("category" , mylistText);
                    $("." + myimageID).attr("category" , mylistText);

                    TSeditListedit(mytsID,myname,myprice,mysrc,myintro,mytop10,mycategory);
                    
                    console.log(TSeditList);
                }
            }
            else
            {
                var mycategoryID = "category" + num;
                var mycategoryLen = $("#" + mycategoryID)[0].children.length;

                for(var i=0;i<mycategoryLen;i++)
                {
                    var myfood = $("#" + mycategoryID)[0].children[i];
                    var myimageID = myfood.getAttribute("imageID");
                    var myname = myfood.getAttribute("name");
                    var myprice = parseInt(myfood.getAttribute("price"));
                    var mysrc = myfood.getAttribute("src");
                    var myintro = myfood.getAttribute("intro");
                    var mytop10 = myfood.getAttribute("top10") == "true";
                    var mycategory = mylistText;
                    myfood.setAttribute("category" , mylistText);
                    $("." + myimageID).attr("category" , mylistText);

                    TSnewListadd(myimageID,myname,myprice,mysrc,myintro,mytop10,mycategory);
                    console.log(TSnewList);
                }
            }
        }
        else if(new_or_edit=='new')
        {

        }
    }

    $(".navbar li a").css({"display" : "inline-block" , "width" : "calc(100% - 90px)"});
}

function EditItem(num , huding , ts)
{
    var mylistID = "list" + num;

    $("#" + mylistID).replaceWith(makeListTextbox(num,'edit',huding,ts));
}

function DeleteItem(num , huding , ts)
{
    if(huding==true)
    {
        var mycategoryID = "category" + num;
        var mycategoryLen = $("#" + mycategoryID)[0].children.length;

        for(var i=0;i<mycategoryLen;i++)
        {
            var myfood = $("#" + mycategoryID)[0].children[i];
            var myhudingID = parseInt(myfood.getAttribute("hudingID"));
            var myimageID = myfood.getAttribute("imageID");

            $("." + myimageID).replaceWith('');
            HudingeditListdel(myhudingID);
        }
    }
    else
    {
        var mycategoryID = "category" + num;
        var mycategoryLen = $("#" + mycategoryID)[0].children.length;

        for(var i=0;i<mycategoryLen;i++)
        {
            var myfood = $("#" + mycategoryID)[0].children[i];
            var myimageID = myfood.getAttribute("imageID");
            
            $("." + myimageID).replaceWith('');
            HudingnewListdel(myimageID);
        }
    }

    if(ts==true)
    {
        var mycategoryID = "category" + num;
        var mycategoryLen = $("#" + mycategoryID)[0].children.length;

        for(var i=0;i<mycategoryLen;i++)
        {
            var myfood = $("#" + mycategoryID)[0].children[i];
            var mytsID = parseInt(myfood.getAttribute("tsID"));
            var myimageID = myfood.getAttribute("imageID");

            console.log(myimageID);
            $("." + myimageID).replaceWith('');
            TSeditListdel(mytsID);
        }
    }
    else
    {
        var mycategoryID = "category" + num;
        var mycategoryLen = $("#" + mycategoryID)[0].children.length;

        for(var i=0;i<mycategoryLen;i++)
        {
            var myfood = $("#" + mycategoryID)[0].children[i];
            var myimageID = myfood.getAttribute("imageID");

            $("." + myimageID).replaceWith('');
            TSnewListdel(myimageID);
        }
    }

    var mylistID = "list" + num;
    var mycategoryID = "category" + num;

    $("#" + mylistID).replaceWith('');
    $("#" + mycategoryID).parent().replaceWith('');
}

function makeOKDeleteButton(num,new_or_edit,huding,ts)
{
    var myhtml = 
    '<button class="btn nothing"></button>' + 
    '<button class="btn btn-danger pull-right"' + 
    'onclick="DeleteItem(' + num + ',' + huding + ',' + ts + ');" >' + 
    '   <span class="glyphicon glyphicon-trash"></span>' + 
    '</button>' + 
    '<button class="btn btn-success pull-right"' + 
    'onclick="OKItem(' + num + ",'" + new_or_edit + "'," + huding + "," + ts + ');" >' + 
    '   <span class="glyphicon glyphicon-ok"></span>' + 
    '</button>';

    return myhtml;
}

function makeEditDeleteButton(num , huding , ts)
{
    var myhtml = 
    '<button class="btn nothing"></button>' + 
    '<button class="btn btn-danger pull-right"' + 
    'onclick="DeleteItem(' + num + ',' + huding + ',' + ts + ');" >' + 
    '   <span class="glyphicon glyphicon-trash"></span>' + 
    '</button>' + 
    '<button class="btn btn-info pull-right"' + 
    'onclick="EditItem(' + num + ',' + huding + ',' + ts + ');" >' + 
    '   <span class="glyphicon glyphicon-pencil"></span>' + 
    '</button>';

    return myhtml;
}










// about output json 

function HudingnewListsearch(imageID)
{
    var HudingnewListfood = HudingnewList["food"];
    var HudingnewListfoodLen = HudingnewListfood.length;

    for(var i=0;i<HudingnewListfoodLen;i++)
    {
        if(HudingnewListfood[i]["imageID"]==imageID)
        {
            return i;
        }
    }
    return -1;
}

function HudingnewListadd(imageID,name,price,src,intro,top10,category)
{
    var HudingnewListfood = HudingnewList["food"];

    var element = 
    {
        "imageID" : imageID,
        "name" : name,
        "price" : price,
        "src" : src,
        "intro" : intro,
        "top10" : top10,
        "category" : category
    }

    var myindex = HudingnewListsearch(imageID);

    if(myindex >= 0)
    {
        HudingnewListfood[myindex] = element;
    }
    else
    {
        HudingnewListfood.push(element);
    }
}

function HudingnewListdel(imageID)
{
    var HudingnewListfood = HudingnewList["food"];
    var myindex = HudingnewListsearch(imageID);
    HudingnewListfood.splice(myindex,1);
}

function HudingeditListsearch(hudingID)
{
    var HudingeditListfood = HudingeditList["food"];
    var HudingeditListfoodLen = HudingeditListfood.length;

    for(var i=0;i<HudingeditListfoodLen;i++)
    {
        if(HudingeditListfood[i]["id"] == hudingID)
        {
            return i;
        }
    }
    return -1;
}

function HudingeditListedit(hudingID,name,price,src,intro,top10,category)
{
    var HudingeditListfood = HudingeditList["food"];

    var element = 
    {
        "id" : hudingID,
        "name" : name,
        "price" : price,
        "src" : src,
        "intro" : intro,
        "top10" : top10,
        "category" : category
    }

    var myindex = HudingeditListsearch(hudingID);

    if(myindex >= 0)
    {
        HudingeditListfood[myindex] = element;
    }
    else
    {
        HudingeditListfood.push(element);
    }

}

function HudingeditListdel(hudingID)
{
    var HudingdelListfood = HudingdelList["food"];
    var HudingeditListfood = HudingeditList["food"];

    var element = 
    {
        "id" : hudingID
    }

    HudingdelListfood.push(element);

    var myindex = HudingeditListsearch(hudingID);

    if(myindex >= 0)
    {
        HudingeditListfood.splice(myindex,1);
    }
}


// 預覽 ------------------------------------------

function TSnewListsearch(imageID)
{
    var TSnewListfood = TSnewList["food"];
    var TSnewListfoodLen = TSnewListfood.length;

    for(var i=0;i<TSnewListfoodLen;i++)
    {
        if(TSnewListfood[i]["imageID"]==imageID)
        {
            return i;
        }
    }
    return -1;
}

function TSnewListadd(imageID,name,price,src,intro,top10,category)
{
    var TSnewListfood = TSnewList["food"];

    var element = 
    {
        "imageID" : imageID,
        "name" : name,
        "price" : price,
        "src" : src,
        "intro" : intro,
        "top10" : top10,
        "category" : category
    }

    var myindex = TSnewListsearch(imageID);

    if(myindex >= 0)
    {
        TSnewListfood[myindex] = element;
    }
    else
    {
        TSnewListfood.push(element);
    }
}

function TSnewListdel(imageID)
{
    var TSnewListfood = TSnewList["food"];
    var myindex = TSnewListsearch(imageID);
    TSnewListfood.splice(myindex,1);
}

function TSeditListsearch(tsID)
{
    var TSeditListfood = TSeditList["food"];
    var TSeditListfoodLen = TSeditListfood.length;

    for(var i=0;i<TSeditListfoodLen;i++)
    {
        if(TSeditListfood[i]["tsID"] == tsID)
        {
            return i;
        }
    }
    return -1;
}

function TSeditListedit(tsID,name,price,src,intro,top10,category)
{
    var TSeditListfood = TSeditList["food"];

    var element = 
    {
        "tsID" : tsID,
        "name" : name,
        "price" : price,
        "src" : src,
        "intro" : intro,
        "top10" : top10,
        "category" : category
    }

    var myindex = TSeditListsearch(tsID);

    if(myindex >= 0)
    {
        TSeditListfood[myindex] = element;
    }
    else
    {
        TSeditListfood.push(element);
    }

}

function TSeditListdel(tsID)
{
    var TSdelListfood = TSdelList["food"];
    var TSeditListfood = TSeditList["food"];

    var element = 
    {
        "tsID" : tsID
    }

    TSdelListfood.push(element);

    var myindex = TSeditListsearch(tsID);

    if(myindex >= 0)
    {
        TSeditListfood.splice(myindex,1);
    }
}