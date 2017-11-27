var mypanel_colors = ["info","warning","danger","success"];
var mypanel_colorsLen = mypanel_colors.length;
var mycategoryArray = [];
var mycategoriesLen = [];

$(window).on('load' , function()
{
	// source 小寫
	// edit 大寫
	// A.html的+my

	$("#Source").contents().find("#car").hide();

	var mycategories = $("#Source").contents().find("#categories");
	var mybody = $("#Source").contents().find("body");

    $.getJSON("./myjson.json",function(data)
    {
    	$.each(data,function(i,item) 
    	{
    		var mylistText = data[i]["category"];
    		var mycategoryIndex = mycategoryArray.indexOf(mylistText);
	    	var mycategoryID = "category" + mycategoryIndex;

    		if(mycategoryIndex == -1)
    		{
    			mycategoryIndex = mycategoryArray.length;
	    		mycategoryArray.push(mylistText);
	    		mycategoriesLen.push(0);
		    	mycategoryID = "category" + mycategoryIndex;
			  	mycategories.append(makeList(mycategoryIndex,mylistText,true)); //新增一個li到Source的ui底下
		    	mybody.append(makeCategory(mycategoryIndex,mylistText)); //新增一個div到Source的body底下
			}

	    	var myimageIndex = mycategoriesLen[mycategoryIndex];

			var myimageID = mycategoryID + "_" + "image" + myimageIndex;
    		var myname = data[i]["name"];
    		var myprice = data[i]["price"];
    		var mysrc = data[i]["src"];
    		var myintro = data[i]["intro"];
    		var mytop10 = data[i]["top10"];
    		var myhudingID = data[i]["id"];
    		var mycategory = data[i]["category"];

			var category = $("#Source").contents().find("#" + mycategoryID);

			category.append(makeImage(myhudingID,myimageID,myname,myprice,mysrc,myintro,mytop10,mycategory)); //新增圖片到某個分類
			
			if(mytop10==true)
			{
				$("#Source").contents().find(".scrollableArea").append(maketop10(myhudingID,myimageID,myname,myprice,mysrc,myintro,mytop10,mycategory)); //新增圖片到某個分類
			}

			mycategoriesLen[mycategoryIndex]++;

        });


    	// 這裡會等到json都做完 才會開始做～
        var myaddbutton = 
	    '<button id="addCategoryTextButton" class="btn btn-success form-control" ' + 
	    'onclick="addListTextbox();">新增餐點分類</button>';
		mycategories.append(myaddbutton); 

	    $("#Source").contents().find(".navbar li a").css({"display" : "inline-block" , "width" : "calc(100% - 90px)"});
		document.getElementById("Source").contentWindow.mysmoothTouchScroll();
    	
    });
    
});


function SetValue()
{

}

// function makeLink(num , listText , huding)
// {
// 	var categoryID = "category" + num;

// 	var myhtml = 
// 	'<a href="#' + categoryID + '">' + listText +
// 	'</a>' + 
// 	makeEditDeleteButton(num,huding);

// 	return myhtml;
// }


function makeList(num , listText , huding)
{
	var listID = "list" + num;
	var categoryID = "category" + num;

	var myhtml = 
	'<li id="' + listID + '">' +
		'<a href="#' + categoryID + '">' + listText +
		'</a>' + 
		makeEditDeleteButton(num,huding) +
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
            		'<button class="btn btn-success " onclick="addAlert(' + num + ');">' + '新增</button>' +
        		'</div>' +
        	'</div>' +
    	'</div>' +

    	'<div id ="' + categoryID + '" class="panel-body color-' + mypanel_colors[num%mypanel_colorsLen] + '">' +

		'</div>' +
	'</div>';


	return myhtml;
}

// hudingID name price src intro top10 category
function makeImage(hudingID , imageID , name , price , src , intro , top10 , category)
{
    var myhtml = 
    '<div class="col-xs-4 text-center"' +  
    	' hudingID = ' + hudingID + 
    	' imageID = "' + imageID + '"' +
    	' name = "' + name + '"' +
    	' price = ' + price + 
    	' src = "' + src + '"' +
    	' intro = "' + intro + '"' +
    	' top10 = ' + top10 + 
    	' category = "' + category + '"' +
    	' id="' + imageID + '">' +
        '<a onclick="' +  
            'editAlert(' + hudingID + ",'" + imageID + "','" +
            name + "'," + price + ",'" + src + "','" + 
            intro + "'," + top10 + ",'" + category + "'" + 
            ');">' + 
            '<img class="img-rounded" src="' + src + '" width="100%">' +
        '</a>' +
    '</div>';

    return myhtml;
}

function maketop10(hudingID , imageID , name , price , src , intro , top10 , category)
{
    var myhtml = 
    '<a class="' + imageID + '"' + 
    	' hudingID = ' + hudingID + 
    	' imageID = "' + imageID + '"' +
    	' name = "' + name + '"' +
    	' price = ' + price + 
    	' src = "' + src + '"' +
    	' intro = "' + intro + '"' +
    	' top10 = ' + top10 + 
    	' category = "' + category + '"' +
    	' onclick="' +  
	    'editAlert(' + hudingID + ",'" + imageID + "','" +
        name + "'," + price + ",'" + src + "','" + 
        intro + "'," + top10 + ",'" + category + "'" + 
        ');">' + 
        '<img src="' + src + '" class="img-circle Stories"/>' +
    '</a>';

    return myhtml;
}

function makeEditDeleteButton(num , huding)
{
    var myhtml = 
    '<button class="btn nothing"></button>' + 
    '<button class="btn btn-danger pull-right"' + 
    'onclick="DeleteItem(' + num + ',' + huding + ');" >' + 
    '   <span class="glyphicon glyphicon-trash"></span>' + 
    '</button>' + 
    '<button class="btn btn-info pull-right"' + 
    'onclick="EditItem(' + num + ',' + huding + ');" >' + 
    '   <span class="glyphicon glyphicon-pencil"></span>' + 
    '</button>';

    return myhtml;
}