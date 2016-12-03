
var chessBoard = [];
var me = true;
var over = false;

var wins = [];

var mywin = [];
var computerwin = [];


for(var i=0;i<15;i++)
{
	chessBoard[i] = [];
	for(var j=0;j<15;j++)
	{
		chessBoard[i][j] = 0;
	}
}

for(var i=0;i<15;i++)
{
	wins[i] = [];
	for(var j=0;j<15;j++)
	{
		wins[i][j] = [];
	}
}

var count = 0;

for(var i=0;i<15;i++)
{
	for(var j=0;j<11;j++)
	{
		for(var k=0;k<5;k++)
		{
			wins[i][j+k][count] = true;
		}
		count++;
	}
}

for(var i=0;i<15;i++)
{
	for(var j=0;j<11;j++)
	{
		for(var k=0;k<5;k++)
		{
			wins[j+k][i][count] = true;
		}
		count++;
	}
}

for(var i=0;i<11;i++)
{
	for(var j=0;j<11;j++)
	{
		for(var k=0;k<5;k++)
		{
			wins[i+k][j+k][count] = true;
		}
		count++;
	}
}


for(var i=0;i<11;i++)
{
	for(var j=14;j>3;j--)
	{
		for(var k=0;k<5;k++)
		{
			wins[i+k][j-k][count] = true;
		}
		count++;
	}
}

// alert(count);

for(var i=0; i<count; i++)
{
	mywin[i] = 0;
	computerwin[i] = 0;
}


var chess = document.getElementById('chess');
var context = chess.getContext('2d');

context.strokeStyle = "#AA7700";
context.lineWidth = 2.25;

var drawChessBoard = function() 
{

	for(var i=0; i<15; i++)
	{
		context.moveTo(15 + i*30 , 15);
		context.lineTo(15 + i*30 , 435);
		context.stroke();	

		context.moveTo(15 , 15 + i*30);
		context.lineTo(435 , 15 + i*30);
		context.stroke();	
	}
}

drawChessBoard();

var oneStep = function(i,j,me){
	context.beginPath();
	context.arc(15 + i*30 , 15 + j*30 , 13 , 0 , 2 * Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(15 + i*30 + 2, 15 + j*30 - 2, 13 , 15 + i*30 + 2, 15 + j*30 - 2 , 0);
	if(me) 
	{
		gradient.addColorStop(0,"#00AAAA");
		gradient.addColorStop(1,"#00FFFF");		
	}
	else
	{
		gradient.addColorStop(0,"#FF0000");
		gradient.addColorStop(1,"#FFAA00");	
	}

	context.fillStyle = gradient;
	context.fill();
}

chess.onclick = function(e) 
{
	if(over) return;
	if(!me) return;

	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x / 30);
	var j = Math.floor(y / 30);

	if(chessBoard[i][j] == 0 ){
		oneStep(i,j,me);
		chessBoard[i][j] = 1;
		for(var k=0; k<count; k++)
		{
			if(wins[i][j][k])
			{
				mywin[k]++;
				computerwin[k] = 6;
				if(mywin[k] == 5)
				{
					window.alert("You win!!");
					over = true;
				}
			}
		}

		if(!over)
		{
			me = !me;
			computerAI();
		}
	}
}

var computerAI = function()
{
	var myScore = [];
	var computerScore = [];
	var max = 0;
	var u = 0 , v = 0;


	for(var i=0; i<15 ;i++)
	{
		myScore[i] = [];
		computerScore[i] = [];

		for(var j=0; j<15 ;j++)
		{
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}

	}

	for(var i=0;i<15;i++)
	{
		for(var j=0;j<15;j++)
		{
			if(chessBoard[i][j] == 0)
			{
				for(var k=0;k<count;k++)
				{
					if(wins[i][j][k])
					{
						if(mywin[k] == 1) myScore[i][j]+= 200;
						else if(mywin[k] == 2) myScore[i][j]+= 400;
						else if(mywin[k] == 3) myScore[i][j]+= 2000;
						else if(mywin[k] == 4) myScore[i][j]+= 10000;

						if(computerwin[k] == 1) computerScore[i][j]+= 220;
						else if(computerwin[k] == 2) computerScore[i][j]+= 420;
						else if(computerwin[k] == 3) computerScore[i][j]+= 2100;
						else if(computerwin[k] == 4) computerScore[i][j]+= 20000;

					}
				}

				myScore[i][j]+=computerScore[i][j];
				
				if(myScore[i][j] > max)
				{
					max = myScore[i][j];
					u = i;
					v = j;
				}
				else if(myScore[i][j] == max)
				{
					if(computerScore[i][j] > computerScore[u][v])
					{
						u = i;
						v = j;
					}
				}

			}
		}
	}

	oneStep(u,v,false);
	chessBoard[u][v] = 2;

	for(var k=0; k<count; k++)
	{
		if(wins[u][v][k])
		{
			computerwin[k]++;
			mywin[k] = 6;
			if(computerwin[k] == 5)
			{
				window.alert("Computer win!!");
				over = true;
			}
		}
	}

	if(!over) me = !me;

}
