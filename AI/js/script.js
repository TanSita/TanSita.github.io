var chessBoard = [];
var me = true;
var over = false;

var wins = [];

var mywin = [];
var computerwin = [];

var myarrX = [];
var comarrX = [];
var myarrY = [];
var comarrY = [];

var myScore = [];
var computerScore = [];
var max = 0;
var u = 0;
var v = 0;

var initchessBoard = function()
{
	for(var i=0;i<15;i++)
	{
		chessBoard[i] = [];
		for(var j=0;j<15;j++)
		{
			chessBoard[i][j] = 0;
		}
	}
}

initchessBoard();
var count = 0;

var initwins = function()
{
	for(var i=0;i<15;i++)
	{
		wins[i] = [];
		for(var j=0;j<15;j++)
		{
			wins[i][j] = [];
		}
	}

	count = 0;

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

	for(var i=0; i<count; i++)
	{
		mywin[i] = 0;
		computerwin[i] = 0;
	}

}

initwins();


var chess = document.getElementById('chess');
var context = chess.getContext('2d');

context.strokeStyle = "#AA7700";
context.lineWidth = 3;

var drawChessBoard = function() 
{
	for(var i=0; i<15; i++)
	{
		context.beginPath();

		context.moveTo(15 + i*30 , 15);
		context.lineTo(15 + i*30 , 435);
		context.stroke();

		context.moveTo(15 , 15 + i*30);
		context.lineTo(435 , 15 + i*30);
		context.stroke();

		context.closePath();
	}
}

drawChessBoard();

var oneStep = function(i,j,me)
{
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
	i = Math.floor(x / 30);
	j = Math.floor(y / 30);

	if(chessBoard[i][j] == 0 ){
		oneStep(i,j,me);
		chessBoard[i][j] = 1;

		myarrX.push(i);
		myarrY.push(j);

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
			computerAI(true);
		}

	}
}

var myoperation = function(i,j)
{
	if(over) return;
	if(!me) return;

	if(chessBoard[i][j] == 0 ) {
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
			computerAI(false);
		}
	}
}

var initScore = function()
{
	myScore = [];
	computerScore = [];
	max = 0;
	u = 0;
	v = 0;

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
}

var computerAI = function(flag)
{
	initScore();

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
						if(mywin[k] == 1) myScore[i][j]+= 100;
						else if(mywin[k] == 2) myScore[i][j]+= 400;
						else if(mywin[k] == 3) myScore[i][j]+= 2000;
						else if(mywin[k] == 4) myScore[i][j]+= 10000;

						if(computerwin[k] == 1) computerScore[i][j]+= 110;
						else if(computerwin[k] == 2) computerScore[i][j]+= 800;
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
	if(flag)
	{
		comarrX.push(u);
		comarrY.push(v);
	}
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


	var mycount = 0;

	for(var i=0;i<15;i++)
	{
		for(var j=0;j<15;j++)
		{
			var temp = document.getElementById(''+mycount);
			temp.value = myScore[j][i];
			mycount++;
		}
	}
}

var undo = function()
{
	context.clearRect(0, 0, 450, 450); //清空畫布

	drawChessBoard(); //重畫一次五子棋的「線」

	initchessBoard();
	initwins();
	initScore();

	myarrX.pop();
	myarrY.pop();
	comarrX.pop();
	comarrY.pop();

	over = false;
	me = true;

	for(var i=0;i<myarrX.length;i++)
	{
		console.log(myarrX[i]+","+myarrY[i])
		myoperation(myarrX[i],myarrY[i]);
	}

}