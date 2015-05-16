angular
    .module('tttgApp')
    .controller('TTTController', TTTController);

    TTTController.$inject = ['$firebaseArray'];
    function TTTController($firebaseArray, $timeout){

        console.log("Controller is linked");
        var self = this;
        self.player1Local = false;
        self.player2Local = false;
        self.localTurns = 0;
        // var self.player = self.counters[2].$value;
        // var self.p2score = self.counters[1].$value;
        // var self.p1score = self.counters[0].$value;
        // var self.tiewatcher = self.counters[3].$value

        self.turns = (function(){
        	var ref = new Firebase("https://tictactopgun.firebaseio.com/turns")
        	var turns = $firebaseArray(ref);
        	return turns;
        })();

       	self.players = (function(){
       		var ref = new Firebase("https://tictactopgun.firebaseio.com/players")
       		var players = $firebaseArray(ref);
       		return players;
       	})();

		self.boxes = (function(){
        	var ref = new Firebase("https://tictactopgun.firebaseio.com/boxes");
			var moves = $firebaseArray(ref);
			return moves;
        })();

        self.counters = (function(){
        	var ref = new Firebase("https://tictactopgun.firebaseio.com/counters");
        	var counter = $firebaseArray(ref);
        	return counter;
        })();

        self.chats = (function(){
            var ref = new Firebase("https://tictactopgun.firebaseio.com/chats");
            var chats = $firebaseArray(ref);
            return chats;
        })();

        self.pLogger = function(){
        	if(self.players[0].$value == false && self.players[2].$value == false){
	        	console.log("Inputting P1");
	        	self.players[0].$value = true;
	        	self.players[1].$value = self.p1namer;
	        	console.log(self.players);
        	} else if (self.players[0].$value == true && self.players[2].$value == false){
        		console.log("Inputting P2");	
        		self.players[2].$value = true;
        		self.players[3].$value = self.p2namer;
	        	console.log(self.players);
        	} else if (self.players[0].$value == true && self.players[2].$value == true){
        		alert("All jets are scrambled, boss.");
        	}
        	self.players.$save(self.players[0]);
        	self.players.$save(self.players[1]);
        	self.players.$save(self.players[2]);
        	self.players.$save(self.players[3]);
        }

        self.addChat = function(){
            console.log("adding chat");
            self.chats.$add({message: self.text});
            self.text = null;
        }
        
	// function play($index){
	//     console.log (self.localTurns)
	//     self.localTurns++;
	//      console.log (self.localTurns)
	//     if (self.localTurns > 0 && self.turns.number == 0){
	//         self.player1Local = true;
	//     } else if (self.localTurns > 0 && self.turns.number == 1){
	//         self.player2Local = true;
	//     }

	//     // if (self.turns.number != 0 ){
	//     //     self.player1Local = true
	//     // }
	//     //runs play as long as there is no winner 
	//     if (self.turns.number <=9 && self.winner==""){
	//         //if the box is empty 
	//         //turn variable will be encremented
	//         //if turn is even the selected box will be "X" odd is "O"
	//         if (self.boxes[$index].status=="blank"){
	//             if (self.turns.number%2===0 && self.player1Local == true){

	//                    self.boxes[$index].status="X";
	//                    self.turns.number++;
	//                     self.turns.$save();
	//             }
	//             if (self.turns.number%2!==0 && self.player2Local == true){


	//                    self.boxes[$index].status="O";
	//                    self.turns.number++;
	//                     self.turns.$save();
	//             }
        //turns variable is incremented
        //turn variable is saved

		self.playerMove = function ($index){
			console.log('playing')
			console.log(self.turns[0])
			self.localTurns++;
			if (self.localTurns > 0 && self.turns[0].$value == 0){
				self.player1Local = true;
				console.log(self.player1Local)
				console.log(self.player2Local)
			} else if (self.localTurns > 0 && self.turns[0].$value == 1){
				self.player2Local = true;
				console.log(self.player1Local)
				console.log(self.player2Local)
			}
		    if (	self.players[0].$value == true && 
		    		self.players[2].$value == true &&
		    		self.boxes[$index].moveX == false && 
		    		self.boxes[$index].moveY == false && 
		    		self.counters[2].$value == 1 &&
		    		self.turns[0].$value % 2 == 0 &&
		    		self.player1Local == true)
		    	{
			        self.boxes[$index].moveX = true;
			        self.counters[2].$value = 2;
			        self.counters.$save(self.counters[2]);
			        self.boxes.$save(self.boxes[$index]);
			        self.counters[3].$value += 1;
			        self.players[0].$value = false;
			        self.players[2].$value = true;
			        self.winLogic();
                    self.turns[0]++;
                    self.turns.$save(self.turns[0]);
			    } else if (
			    	self.players[0].$value == true && 
		    		self.players[2].$value == true &&
			    	self.boxes[$index].moveY == false && 
			    	self.boxes[$index].moveY == false && 
			    	self.counters[2].$value == 2 &&
			    	self.turns[0].$value % 2 !== 0 && 
			    	self.player2Local == true
			    ){
			        self.boxes[$index].moveY=true;
			        self.counters[2].$value= 1;
			        self.counters.$save(self.counters[2]);
			        self.boxes.$save(self.boxes[$index]);
			        self.counters[3].$value++;
			        self.winLogic();
				    self.turns[0]++;
                    self.turns.$save(self.turns[0]);
		    	}
		}

        self.winLogic = function(){
        	if (
	        		self.boxes[0].moveX == true && self.boxes[1].moveX == true && self.boxes[2].moveX == true ||
	        		self.boxes[3].moveX == true && self.boxes[4].moveX == true && self.boxes[5].moveX == true ||
	        		self.boxes[6].moveX == true && self.boxes[7].moveX == true && self.boxes[8].moveX == true ||
	        		self.boxes[0].moveX == true && self.boxes[3].moveX == true && self.boxes[6].moveX == true ||
	        		self.boxes[1].moveX == true && self.boxes[4].moveX == true && self.boxes[7].moveX == true ||
	        		self.boxes[2].moveX == true && self.boxes[5].moveX == true && self.boxes[8].moveX == true ||
	        		self.boxes[0].moveX == true && self.boxes[4].moveX == true && self.boxes[8].moveX == true ||
	        		self.boxes[2].moveX == true && self.boxes[4].moveX == true && self.boxes[6].moveX == true 
	        	){
	        		self.counters[0].$value++;
	        		self.reset();
        		} else if (
	        		self.boxes[0].moveY == true && self.boxes[1].moveY == true && self.boxes[2].moveY == true ||
	        		self.boxes[3].moveY == true && self.boxes[4].moveY == true && self.boxes[5].moveY == true ||
	        		self.boxes[6].moveY == true && self.boxes[7].moveY == true && self.boxes[8].moveY == true ||
	        		self.boxes[0].moveY == true && self.boxes[3].moveY == true && self.boxes[6].moveY == true ||
	        		self.boxes[1].moveY == true && self.boxes[4].moveY == true && self.boxes[7].moveY == true ||
	        		self.boxes[2].moveY == true && self.boxes[5].moveY == true && self.boxes[8].moveY == true ||
	        		self.boxes[0].moveY == true && self.boxes[4].moveY == true && self.boxes[8].moveY == true ||
	        		self.boxes[2].moveY == true && self.boxes[4].moveY == true && self.boxes[6].moveY == true 
		        ){
	        		self.counters[1].$value++;
	        		self.reset();
        		}
        }

        self.tieLogic = function(){
        	if(self.counters[3].$value == 9){
        		alert("Tie");
        	}
        }

        self.reset = function(){
        	for (var i = 0; i < 9; i++) {
        		console.log("test")
        	self.boxes[i].moveX = false;
        	self.boxes[i].moveY = false;
        	self.players[0].$value = false;
        	self.players[1].$value = "";
        	self.players[2].$value = false;
        	self.players[3].$value = "";
        	self.turns[0] = 0;
        	self.players.$save(self.players[i]);
        	self.boxes.$save(self.boxes[i]);
        	self.turns.$save(self.turns[0]);
        	}
    	}
    }