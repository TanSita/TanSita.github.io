var mypanel_colors = ["info","warning","danger","success"];
var mypanel_colorsLen = mypanel_colors.length;
var mycategoryArray = [];
var mycategoriesLen = [];
var mypublictsID = 0;

$(window).on('load' , function()
{
	// source 小寫
	// edit --> demo
	// A.html的+my

	// 購物車隱藏
	$("#Source").contents().find("#car").hide();

	// categories = 右上角
	var mycategories = $("#Source").contents().find("#categories");
	var mybody = $("#Source").contents().find("body");

	var democategories = $("#Edited").contents().find("#categories");
	var demobody = $("#Edited").contents().find("body");

    $.getJSON("./myjson.json",function(data)
    {
    	$.each(data,function(i,item) 
    	{
    		var mylistText = data[i]["category"];
    		var mycategoryIndex = mycategoryArray.indexOf(mylistText);
	    	var mycategoryID = "category" + mycategoryIndex;

	    	// 如果這個category還沒新增過 就把他新增進去
    		if(mycategoryIndex == -1)
    		{
    			mycategoryIndex = mycategoryArray.length;
	    		mycategoryArray.push(mylistText);
	    		mycategoriesLen.push(0);
		    	mycategoryID = "category" + mycategoryIndex;
			  	
			  	mycategories.append(makeList(mycategoryIndex,mylistText,true,true)); //新增一個li到Source的ui底下
		    	mybody.append(makeCategory(mycategoryIndex,mylistText)); //新增一個div到Source的body底下
				
				democategories.append(makeListDemo(mycategoryIndex,mylistText)); 
				demobody.append(makeCategoryDemo(mycategoryIndex,mylistText));
			}

			// 圖片資訊
	    	var myimageIndex = mycategoriesLen[mycategoryIndex];

			var myimageID = mycategoryID + "_" + "image" + myimageIndex;
    		var myname = data[i]["name"];
    		var myprice = data[i]["price"];
    		var mysrc = data[i]["src"];
    		var myintro = data[i]["intro"];
    		var mytop10 = data[i]["top10"];
    		var myhudingID = data[i]["id"];
    		var mycategory = data[i]["category"];

			// 放圖片下去
			var category = $("#Source").contents().find("#" + mycategoryID);
			var democategory = $("#Edited").contents().find("#" + mycategoryID);

			category.append(makeImage(myhudingID,mypublictsID,myimageID,myname,myprice,mysrc,myintro,mytop10,mycategory)); //新增圖片到某個分類
			democategory.append(makeImageDemo(myhudingID,mypublictsID,myimageID,myname,myprice,mysrc,myintro,mytop10,mycategory));

			// 如果這圖片是top10 還要append top10
			if(mytop10==true)
			{
				$("#Source").contents().find(".scrollableArea").append(maketop10(myhudingID,mypublictsID,myimageID,myname,myprice,mysrc,myintro,mytop10,mycategory)); //新增圖片到某個分類
				$("#Edited").contents().find(".scrollableArea").append(maketop10Demo(myhudingID,mypublictsID,myimageID,myname,myprice,mysrc,myintro,mytop10,mycategory)); //新增圖片到某個分類
			}

			mycategoriesLen[mycategoryIndex]++;
			mypublictsID++;

        });


    	// 這裡會等到json都做完 才會開始做～
        var myaddbutton = 
	    '<button id="addCategoryTextButton" class="btn btn-success form-control" ' + 
	    'onclick="addListTextbox();">新增餐點分類</button>';
		mycategories.append(myaddbutton); 

	    $("#Source").contents().find(".navbar li a").css({"display" : "inline-block" , "width" : "calc(100% - 90px)"});
		document.getElementById("Source").contentWindow.mysmoothTouchScroll();
		document.getElementById("Edited").contentWindow.mysmoothTouchScroll();
    	
    });
    
});



function SetValue()
{
	
	var TSnewList = document.getElementById("Source").contentWindow.TSnewList;
	var TSeditList = document.getElementById("Source").contentWindow.TSeditList;
	var TSdelList = document.getElementById("Source").contentWindow.TSdelList;

	console.log(TSnewList,TSeditList,TSdelList);

	var TSnewListFood = TSnewList.food;
	var TSeditListFood = TSeditList.food;
	var TSdelListFood = TSdelList.food;

	for(var i=0;i<TSdelListFood.length;i++)
	{
		var mytsID = TSdelListFood[i].tsID;
		var myfood = $("#Edited").contents().find("[tsID=" + mytsID + "]");
		var myimageID = myfood.attr("imageID");
		console.log(myimageID);
		myfood.replaceWith('');

		var mycategoryID = myimageID.split("_")[0];
		var mycategory = $("#Edited").contents().find("#" + mycategoryID);
		if(mycategory[0].children.length==0)
		{
			var mynum = mycategoryID.replace("category","");
			var mylistID = "list" + mynum;
			var mylist = $("#Edited").contents().find("#" + mylistID);
			mylist.replaceWith('');

			mycategory.parent().replaceWith('');
		}
	}

	for(var i=0;i<TSeditListFood.length;i++)
	{
		var mytsID = TSeditListFood[i].tsID;
		var myname = TSeditListFood[i].name;
		var myprice = TSeditListFood[i].price;
		var mysrc = TSeditListFood[i].src;
		var myintro = TSeditListFood[i].intro;
		var mytop10 = TSeditListFood[i].top10;
		var mycategory = TSeditListFood[i].category;	


		var myfood = $("#Edited").contents().find("[tsID=" + mytsID + "]");
		var myhudingID = myfood.attr("hudingID");
		var myimageID = myfood.attr("imageID");
		var oldtop10 = myfood.attr("top10")=="true";

		var mycategoryID = myimageID.split("_")[0];
		var mynum = mycategoryID.replace("category","");
		var mylistID = "list" + mynum;
		var mylist = $("#Edited").contents().find("#" + mylistID);
		mylist.replaceWith(makeListDemo(mynum,mycategory));
		var mycategoryTitleID = "categoryTitle" + mynum;

		console.log(mycategoryID,mynum,mylistID,mycategoryTitleID,mycategory);

		var mycategoryTitle = $("#Edited").contents().find("#" + mycategoryTitleID);
		mycategoryTitle[0].innerHTML = mycategory;



		if(oldtop10==false && mytop10==true)
        {
			$("#Edited").contents().find(".scrollableArea").append(maketop10Demo(-1,mytsID,myimageID,myname,myprice,mysrc,myintro,mytop10,mycategory)); //新增圖片到某個分類
			document.getElementById("Edited").contentWindow.mysmoothTouchScroll();
        }
        else if(oldtop10==true && mytop10==false)
        {
        	console.log("hihi");
            $("#Edited").contents().find("." + myimageID).replaceWith('');
        }

		$("#Edited").contents().find("." + myimageID).replaceWith(maketop10Demo(myhudingID,mytsID,myimageID,myname,myprice,mysrc,myintro,mytop10,mycategory));
		$("#Edited").contents().find("#" + myimageID).replaceWith(makeImageDemo(myhudingID,mytsID,myimageID,myname,myprice,mysrc,myintro,mytop10,mycategory));
	}

	for(var i=0;i<TSnewListFood.length;i++)
	{
		var myimageID = TSnewListFood[i].imageID;
		var myname = TSnewListFood[i].name;
		var myprice = TSnewListFood[i].price;
		var mysrc = TSnewListFood[i].src;
		var myintro = TSnewListFood[i].intro;
		var mytop10 = TSnewListFood[i].top10;
		var mycategory = TSnewListFood[i].category;

		var myfood = $("#Source").contents().find("#" + myimageID);
		myfood.replaceWith(makeImage(-1,mypublictsID,myimageID,myname,myprice,mysrc,myintro,mytop10,mycategory));

		var myfoodtop10 = $("#Source").contents().find("." + myimageID);
		myfoodtop10.replaceWith(maketop10(-1,mypublictsID,myimageID,myname,myprice,mysrc,myintro,mytop10,mycategory));

		var mycategoryID = myimageID.split("_")[0];
		var mynum = mycategoryID.replace("category","");
		var mylistID = "list" + mynum;
		var mylist = $("#Source").contents().find("#" + mylistID);
		mylist.replaceWith(makeList(mynum,mycategory,true,true));
	    $("#Source").contents().find(".navbar li a").css({"display" : "inline-block" , "width" : "calc(100% - 90px)"});




		// Demo
		var democategories = $("#Edited").contents().find("#categories");
		var demobody = $("#Edited").contents().find("body");

	    var demonum = 0; 
	    var categoriesLen = $("#Edited").contents().find("#categories").children().length;

	    if(categoriesLen > 0)
	    {
	        var categoriesLastID = $("#Edited").contents().find("#categories > li:last").attr("ID");
	        demonum = parseInt(categoriesLastID.replace("list",""));
	        demonum += 1;
	    }

	    $("#Edited").contents().find("#categories").append(makeListDemo(demonum,mycategory));
	    $("#Edited").contents().find("body").append(makeCategoryDemo(demonum,mycategory));




		var democategory = $("#Edited").contents().find("#" + mycategoryID);
		democategory.append(makeImageDemo(-1,mypublictsID,myimageID,myname,myprice,mysrc,myintro,mytop10,mycategory));

		if(mytop10==true)
		{
			$("#Edited").contents().find(".scrollableArea").append(maketop10Demo(-1,mypublictsID,myimageID,myname,myprice,mysrc,myintro,mytop10,mycategory)); //新增圖片到某個分類
		}

		mypublictsID++;
	}





	document.getElementById("Edited").contentWindow.mysmoothTouchScroll();


	// clear
	document.getElementById("Source").contentWindow.TSnewList = 
	{
	    "action":"new",
	    "food":
	    [
	    ]
	}

	document.getElementById("Source").contentWindow.TSeditList = 
	{
	    "action":"edit",
	    "food":
	    [
	    ]
	}

	document.getElementById("Source").contentWindow.TSdelList = 
	{
	    "action":"delete",
	    "food":
	    [
	    ]
	}	
}

function makeListDemo(num,listText)
{
	var listID = "list" + num;
	var categoryID = "category" + num;

	var myhtml = 
	'<li id="' + listID + '">' +
		'<a href="#' + categoryID + '">' + listText +
		'</a>' + 
	'</li>';

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

function makeCategoryDemo(num,listText)
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
        	'</div>' +
    	'</div>' +

    	'<div id ="' + categoryID + '" class="panel-body color-' + mypanel_colors[num%mypanel_colorsLen] + '">' +

		'</div>' +
	'</div>';


	return myhtml;
}



function makeImageDemo(hudingID , tsID , imageID , name , price , src , intro , top10 , category)
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
            'showAlert(' + hudingID + "," + tsID +  ",'" + 
            imageID + "','" + name + "','" + price + "','" + src + "','" + 
            intro + "'," + top10 + ",'" + category + "'" + 
            ');">' + 
            '<img class="img-rounded" src="' + src + '" width="100%">' +
        '</a>' +
    '</div>';

    return myhtml;
}

function maketop10Demo(hudingID , tsID , imageID , name , price , src , intro , top10 , category)
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
	    'showAlert(' + hudingID + "," + tsID +  ",'" + 
            imageID + "','" + name + "','" + price + "','" + src + "','" + 
            intro + "'," + top10 + ",'" + category + "'" + 
            ');">' + 
        '<img src="' + src + '" class="img-circle Stories"/>' +
    '</a>';

    return myhtml;
}

function makeImage(hudingID , tsID , imageID , name , price , src , intro , top10 , category)
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

function maketop10(hudingID , tsID , imageID , name , price , src , intro , top10 , category)
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
            		'<button class="btn btn-success " onclick="addAlert(' + num + ');">' + '新增</button>' +
        		'</div>' +
        	'</div>' +
    	'</div>' +

    	'<div id ="' + categoryID + '" class="panel-body color-' + mypanel_colors[num%mypanel_colorsLen] + '">' +

		'</div>' +
	'</div>';


	return myhtml;
}


function SaveValue()
{
	var HudingnewList = document.getElementById("Source").contentWindow.HudingnewList;
	var HudingeditList = document.getElementById("Source").contentWindow.HudingeditList;
	var HudingdelList = document.getElementById("Source").contentWindow.HudingdelList;

	var Hudingjson = [];
	Hudingjson.append(HudingnewList,HudingeditList,HudingdelList);
	console.log(Hudingjson);
}