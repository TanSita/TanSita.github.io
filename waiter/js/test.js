var forhuding = [];

function editOrder(mytableNum , myfoodID , myscount)
{
	for(var i=0;i<forhuding.length;i++)
	{
		var itemtableNum = forhuding[i].tableNum;

		// order
		if(itemtableNum == mytableNum)
		{
			var itemOrder = forhuding[i].order;
			for(var j=0;j<itemOrder.length;j++)
			{
				var itemfoodID = itemOrder[j].id;

				if(itemfoodID == myfoodID)
				{

					itemOrder[j].scount = myscount;
					return 1;
				}
			}
			itemOrder.push({"id":myfoodID,"scount":myscount});
			return 1;
		}
	}

	// 如果沒這ㄍtableNum
	forhuding.push({"tableNum" : mytableNum,"order":[{"id" : myfoodID,"scount" : myscount}]});
	return 0;
}

function delOrder(mytableNum , myfoodID)
{
	for(var i=0;i<forhuding.length;i++)
	{
		var itemtableNum = forhuding[i].tableNum;

		// order
		if(itemtableNum == mytableNum)
		{
			var itemOrder = forhuding[i].order;
			for(var j=0;j<itemOrder.length;j++)
			{
				var itemfoodID = itemOrder[j].id;

				if(itemfoodID == myfoodID)
				{
					itemOrder[j].scount = -1;
					return 1;
				}
			}
		}
	}

	return -1;
}

editOrder(1,5,5);
editOrder(1,5,4);
editOrder(1,5,3);
editOrder(1,4,3);
editOrder(1,4,3);
editOrder(1,4,3);
editOrder(1,3,7);
editOrder(1,3,5);
editOrder(2,5,5);
editOrder(3,5,5);
editOrder(4,5,5);
editOrder(5,5,5);
editOrder(6,5,5);
editOrder(7,5,8);
delOrder(1,5);
delOrder(1,4);
delOrder(1,3);
delOrder(2,5);
delOrder(3,5);
delOrder(4,5);
delOrder(5,5);

console.log(forhuding);
// console.log(JSON.stringify(forhuding));

$(window).on('beforeunload',function(){return 'Your own message goes here...';});
$(window).on('unload',function(){return'Your own message goes here...';});




// window.onunload = window.onbeforeunload = 
// function () { return "正在點餐中，確定要離開?" };