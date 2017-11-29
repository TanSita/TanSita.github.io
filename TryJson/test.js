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

// function TSnewListadd(imageID,name,price,src,intro,top10,category)

TSnewListadd("category0_image1","1","120.0","1321323",true,"lala");
TSnewListadd("category0_image2","1","120.0","1321323",true,"lala");
TSnewListadd("category3_image1","1","120.0","1321323",true,"lala");
TSnewListadd("category1_image1","1","120.0","1321323",true,"lala");
TSnewListadd("category2_image1","1","120.0","1321323",true,"lala");


function sortResults(mylist,prop, asc) 
{
    mylist = mylist.sort(function(a, b) {
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
}

sortResults(TSnewList.food,'imageID', true);


console.log(TSnewList);