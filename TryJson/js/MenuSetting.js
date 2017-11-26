var mypanel_colors = ["info","warning","danger","success"];
var mypanel_colorsLen = mypanel_colors.length;


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
	    	var mylistText = data[i]["text"];
	    	var mycategoryID = "category" + i;

	    	mycategories.append(makeList(i,mylistText)); //新增一個li到Source的ui底下
	    	mybody.append(makeCategory(i,mylistText)); //新增一個div到Source的body底下

	    	var Images = data[i]["images"];
    		$.each(Images,function(ImageIndex) 
	    	{
	    		// edit 只要知道 image所屬的div的id 不用知道分類id
	    		// $("#"+ImageID).replaceWith ....

	    		var Image = Images[ImageIndex];

				var myimageID = mycategoryID + "_" + "image" + ImageIndex;
	    		var myname = Image["name"];
	    		var myprice = Image["price"];
	    		var mysrc = Image["src"];
	    		var myintro = Image["intro"];
	    		var mytop10 = Image["top10"];

				var category = $("#Source").contents().find("#"+mycategoryID);

				category.append(makeImage(myimageID,myname,myprice,mysrc,myintro,mytop10)); //新增圖片到某個分類
				
				//這邊的true的type是string
				if(mytop10=="true")
				{
					$("#Source").contents().find(".scrollableArea").append(maketop10(myimageID,myname,myprice,mysrc,myintro,mytop10)); //新增圖片到某個分類
				}

			});
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
	// 讓textbox 變成 word
	var mycontents = $("#Source").contents();
	var mynewTextboxs = mycontents.find(".newCategoryTextbox");
	var myeditTextboxs = mycontents.find(".editCategoryTextbox");

	for(var i=0;i<mynewTextboxs.length;i++)
	{
		var myid = mynewTextboxs[i].getAttribute("id");
		var mynum = myid.replace("newCategoryTextbox","");
		var mylistID = "list" + mynum;
		var mycategoryID = "category" + mynum;
		var mylistText = mynewTextboxs[i].value;
		if(mylistText.length>0)
		{
			mycontents.find("#" + myid).replaceWith(makeLink(mynum,mylistText));
			mycontents.find("body").append(makeCategory(mynum,mylistText));
		}
	}

	// for edit 
	for(var i=0;i<myeditTextboxs.length;i++)
	{
		var myid = myeditTextboxs[i].getAttribute("id");
		var mynum = myid.replace("editCategoryTextbox","");
		var mylistID = "list" + mynum;
		var mycategoryID = "category" + mynum;
		var mylistText = myeditTextboxs[i].value;
		var mycategoryTitleID = "categoryTitle" + mynum;

		if(mylistText.length>0)
		{
			mycontents.find("#" + myid).replaceWith(makeLink(mynum,mylistText));
			mycontents.find("#" + mycategoryTitleID)[0].innerHTML = mylistText;
		}
	}



    $("#Source").contents().find(".navbar li a").css({"display" : "inline-block" , "width" : "calc(100% - 90px)"});
	// var mya = document.getElementById("Source").contentWindow.a;
}

function makeLink(num , listText)
{
	var categoryID = "category" + num;

	var myhtml = 
	'<a href="#' + categoryID + '">' + listText +
	'</a>' + 
	makeEditDeleteButton(num);

	return myhtml;
}


function makeList(num , listText)
{
	var listID = "list" + num;
	var categoryID = "category" + num;

	var myhtml = 
	'<li id="' + listID + '">' +
		'<a href="#' + categoryID + '">' + listText +
		'</a>' + 
		makeEditDeleteButton(num) +
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
            		'<button class="btn btn-success " onclick="addAlert(\'' + categoryID + '\')">' + '新增</button>' +
        		'</div>' +
        	'</div>' +
    	'</div>' +

    	'<div id ="' + categoryID + '" class="panel-body color-' + mypanel_colors[num%mypanel_colorsLen] + '">' +

		'</div>' +
	'</div>';


	return myhtml;
}

function makeImage(imageID , name , price , src , intro , top10)
{
    var categoryID = imageID.split("_")[0];

    var myhtml = 
    '<div class="col-xs-4 text-center" id="' + imageID + '">' +
        // '<a href="#' + categoryID +'" onclick="' +  
        '<a onclick="' +  
            'editAlert(' + "'" + imageID + "','" + name +
            "','" + price + "','" + src + "','" + intro + "'" + "," + top10 +
            ')">' + 
            '<img class="img-rounded" src="' + src + '" width="100%">' +
        '</a>' +
    '</div>';

    return myhtml;
}

function maketop10(imageID , name , price , src , intro , top10)
{
    var myhtml = 
    // '<a href="#" class="' + imageID + '" onclick="' +  
    '<a class="' + imageID + '" onclick="' +  
    'editAlert(' + "'" + imageID + "','" + name + "','" + 
    price + "','" + src + "','" + intro + "'" + "," + top10 +
    ')">' + 
        '<img src="' + src + '" class="img-circle Stories"/>' +
    '</a>';

    return myhtml;
}

function makeEditDeleteButton(num)
{
    var myhtml = 
    '<button class="btn nothing"></button>' + 
    '<button class="btn btn-danger pull-right"' + 
    'onclick="DeleteItem(\'' + num + '\');" >' + 
    '   <span class="glyphicon glyphicon-trash"></span>' + 
    '</button>' + 
    '<button class="btn btn-info pull-right"' + 
    'onclick="EditItem(\''+ num + '\');" >' + 
    '   <span class="glyphicon glyphicon-pencil"></span>' + 
    '</button>';

    return myhtml;
}