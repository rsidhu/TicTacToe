// Sets player to 1 (out of 1-2) so that playerMove function can switch between them
var player = 1;

// Sets both scores to 0 to start
var p1score = 0;
var p2score = 0;

// Displays both scores
document.getElementById('p1score').innerHTML = p1score;
document.getElementById('p2score').innerHTML = p2score;

// Places "X" when player 1 clicks an empty square and "O" when player 2 clicks an empty square
function playerMove(button){
	if (player == 1){
		console.log("Player 1 is playing");
		document.getElementById(button).innerHTML = "X";
		document.getElementById(button).disabled = true;
		player++;

	}else{
		console.log("Player 2 is playing");
		document.getElementById(button).innerHTML = "O";
		document.getElementById(button).disabled = true;
		player--;
	}
	winLogic();
}

// Determines who wins by cycling through various X/O combinations and checking them at the end of the playerMove function
function winLogic(){
	if (document.getElementById('box1').innerHTML == "X" &&
		document.getElementById('box2').innerHTML == "X" &&
		document.getElementById('box3').innerHTML == "X" ||
		document.getElementById('box4').innerHTML == "X" &&
		document.getElementById('box5').innerHTML == "X" &&
		document.getElementById('box6').innerHTML == "X" ||
		document.getElementById('box7').innerHTML == "X" &&
		document.getElementById('box8').innerHTML == "X" &&
		document.getElementById('box9').innerHTML == "X" ||
		document.getElementById('box1').innerHTML == "X" &&
		document.getElementById('box4').innerHTML == "X" &&
		document.getElementById('box7').innerHTML == "X" ||
		document.getElementById('box2').innerHTML == "X" &&
		document.getElementById('box5').innerHTML == "X" &&
		document.getElementById('box8').innerHTML == "X" ||
		document.getElementById('box3').innerHTML == "X" &&
		document.getElementById('box6').innerHTML == "X" &&
		document.getElementById('box9').innerHTML == "X" ||
		document.getElementById('box1').innerHTML == "X" &&
		document.getElementById('box5').innerHTML == "X" &&
		document.getElementById('box9').innerHTML == "X" ||
		document.getElementById('box3').innerHTML == "X" &&
		document.getElementById('box5').innerHTML == "X" &&
		document.getElementById('box7').innerHTML == "X"){
			alert("X wins.");
			p1score++;
			document.getElementById('p1score').innerHTML = p1score;
			document.getElementById('p2score').innerHTML = p2score;
			resetGame();
			player = 1;
	}else if(document.getElementById('box1').innerHTML == "O" &&
		document.getElementById('box2').innerHTML == "O" &&
		document.getElementById('box3').innerHTML == "O" ||
		document.getElementById('box4').innerHTML == "O" &&
		document.getElementById('box5').innerHTML == "O" &&
		document.getElementById('box6').innerHTML == "O" ||
		document.getElementById('box7').innerHTML == "O" &&
		document.getElementById('box8').innerHTML == "O" &&
		document.getElementById('box9').innerHTML == "O" ||
		document.getElementById('box1').innerHTML == "O" &&
		document.getElementById('box4').innerHTML == "O" &&
		document.getElementById('box7').innerHTML == "O" ||
		document.getElementById('box2').innerHTML == "O" &&
		document.getElementById('box5').innerHTML == "O" &&
		document.getElementById('box8').innerHTML == "O" ||
		document.getElementById('box3').innerHTML == "O" &&
		document.getElementById('box6').innerHTML == "O" &&
		document.getElementById('box9').innerHTML == "O" ||
		document.getElementById('box1').innerHTML == "O" &&
		document.getElementById('box5').innerHTML == "O" &&
		document.getElementById('box9').innerHTML == "O" ||
		document.getElementById('box3').innerHTML == "O" &&
		document.getElementById('box5').innerHTML == "O" &&
		document.getElementById('box7').innerHTML == "O"){
			alert("O wins.");
			p2score++;
			document.getElementById('p1score').innerHTML = p1score;
			document.getElementById('p2score').innerHTML = p2score;
			resetGame();
			player = 1;
		}
	}

// Resets the game at the end of a round (automatically) or when the reset button is pushed
function resetGame(){
	document.getElementsByClassName('box')[0].innerHTML = "";
	document.getElementsByClassName('box')[1].innerHTML = "";
	document.getElementsByClassName('box')[2].innerHTML = "";
	document.getElementsByClassName('box')[3].innerHTML = "";
	document.getElementsByClassName('box')[4].innerHTML = "";
	document.getElementsByClassName('box')[5].innerHTML = "";
	document.getElementsByClassName('box')[6].innerHTML = "";
	document.getElementsByClassName('box')[7].innerHTML = "";
	document.getElementsByClassName('box')[8].innerHTML = "";
	document.getElementsByClassName('box')[0].disabled = false;
	document.getElementsByClassName('box')[1].disabled = false;
	document.getElementsByClassName('box')[2].disabled = false;
	document.getElementsByClassName('box')[3].disabled = false;
	document.getElementsByClassName('box')[4].disabled = false;
	document.getElementsByClassName('box')[5].disabled = false;
	document.getElementsByClassName('box')[6].disabled = false;
	document.getElementsByClassName('box')[7].disabled = false;
	document.getElementsByClassName('box')[8].disabled = false;
}	