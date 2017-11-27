var newList = 
{
    "action":"new",
    "food":
    [
    ]
}

var editList = 
{
    "action":"edit",
    "food":
    [
    ]
}

var delList = 
{
    "action":"delete",
    "food":
    [
    ]
}


function TSsearch(imageID)
{
	var newListfood = newList["food"];
	var newListfoodLen = newListfood.length;

	for(var i=0;i<newListfoodLen;i++)
	{
		if(newListfood[i]["imageID"]==imageID)
		{
			return i;
		}
	}
	return -1;
}

function TSadd(imageID,name,price,src,intro,top10,category)
{
	var newListfood = newList["food"];

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

	var myindex = TSsearch(imageID);

	if(myindex >= 0)
	{
		newListfood[myindex] = element;
	}
	else
	{
		newListfood.push(element);
	}
}

function TSdel(imageID)
{
	var newListfood = newList["food"];
	var myindex = TSsearch(imageID);
	newListfood.splice(myindex,1);
}

function Hudingsearch(HudingID)
{
	var editListfood = editList["food"];
	var editListfoodLen = editListfood.length;

	for(var i=0;i<editListfoodLen;i++)
	{
		if(editListfood[i]["id"] == HudingID)
		{
			return i;
		}
	}
	return -1;
}

function Hudingedit(HudingID,name,price,src,intro,top10,category)
{
	var editListfood = editList["food"];

	var element = 
	{
		"id" : HudingID,
        "name" : name,
        "price" : price,
        "src" : src,
        "intro" : intro,
        "top10" : top10,
        "category" : category
	}

	var myindex = Hudingsearch(HudingID);

	if(myindex >= 0)
	{
		editListfood[myindex] = element;
	}
	else
	{
		editListfood.push(element);
	}

}

function Hudingdel(HudingID)
{
	var delListfood = delList["food"];
	var editListfood = editList["food"];

	var element = 
	{
		"id" : HudingID
	}

	delListfood.push(element);

	var myindex = Hudingsearch(HudingID);

	if(myindex >= 0)
	{
		editListfood.splice(myindex,1);
	}
}

// TSadd(imageID,name,price,src,intro,top10,category)

TSadd("category0_image1","name1",1200,"31.jpg","144444",true,"狗1");
TSadd("category0_image2","name2",2300,"32.jpg","244444",true,"狗2");
TSadd("category0_image3","name3",2400,"33.jpg","344444",true,"狗3");
TSadd("category0_image4","name4",2500,"34.jpg","444444",true,"狗4");
TSdel("category0_image1");
TSdel("category0_image3");
TSdel("category0_image2");
TSadd("category0_image5","name5",52500,"345.jpg","5",true,"狗5");
TSadd("category0_image6","name6",62500,"346.jpg","6",true,"狗6");


// Hudingedit(HudingID,name,price,src,intro,top10,category)

Hudingedit(3,"嗨",120,"123.jpg","讚讚讚讚讚讚",true,"貓咪")
Hudingedit(3,"嗨嗨嗨",120345,"123.jpg","讚讚讚讚23423讚讚",true,"貓324咪")
Hudingedit(3,"嗨嗨嗨嗨",12240,"12364357.jpg","讚234讚讚",false,"貓4324咪")
Hudingdel(3)
Hudingedit(5,"嗨嗨",1240,"e04.jpg","讚讚",true,"貓咪!!!!!!!")
Hudingdel(5)
Hudingedit(6,"嗨嗨",1240,"e04.jpg","讚讚",true,"貓咪!!!!!!!")







