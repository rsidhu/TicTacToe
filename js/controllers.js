angular
    .module('tttgApp')
    .controller('TTTController', TTTController);

    TTTController.$inject = ['$firebaseArray'];
    function TTTController($firebaseArray, $timeout){

    	var self = this
    	self.p1Local = false;
    	self.p2Local = false;
    	console.log("Controller loaded.")

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

        self.addChat = function(){
            console.log("adding chat");
            self.chats.$add({message: self.text});
            self.text = null;
        }

        // self.players = (function(){
       	// 	var ref = new Firebase("https://tictactopgun.firebaseio.com/players")
       	// 	var players = $firebaseArray(ref);
       	// 	return players;
       	// })();

       	// self.p1Logger = function(){
       	// 	console.log("Inputting P1");
       	// 	self.players[0].$value = self.p1namer;
       	// 	self.players.$save(self.players[0]);
       	// }

       	// self.p2Logger = function(){
       	// 	console.log("Inputting P2");
       	// 	self.players[1].$value = self.p2namer;
       	// 	self.players.$save(self.players[1]);
       	// }

       	self.playerMove = function($index){
       		console.log("Playing");
       		if (self.p1Local == false && self.p2Local == false && self.counters[2].$value == 0){
       			self.p1Local = true;
       			self.counters[2].$value++;
       		} else if (self.p1Local == false && self.p2Local == false && self.counters[2].$value > 0){
       			self.p2Local = true;
       			self.counters[2].$value++;
       		}

       		if (self.p1Local == true && 
       			self.boxes[$index].moveX == false &&
       			self.boxes[$index].moveY == false &&
       			self.counters[3].$value % 2 == 0)
      		{
       			self.boxes[$index].moveX = true;
       			self.counters[3].$value++;
       			self.winLogic();
       		} else if (self.p2Local == true &&
       			self.boxes[$index].moveX == false &&
       			self.boxes[$index].moveY == false &&
       			self.counters[3].$value % 2 != 0)
       		{
       			console.log("Trying Y")
       			self.boxes[$index].moveY = true;
       			self.counters[3].$value++;
       			self.winLogic();
       		}
       		self.boxes.$save(self.boxes[$index]);
       		self.counters.$save(self.counters[2]);
       		self.counters.$save(self.counters[3]);
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
        		} else if (self.counters[3].$value >= 9){
        			alert("It's a tie douchebag!");
        			self.reset();
        		}
        }

        self.reset = function(){
        	console.log("Testing")
        	for (var i = 0; i < 9; i++) {
        	self.boxes[i].moveX = false;
        	self.boxes[i].moveY = false;
            self.counters[0].$value = 0;
            self.counters[1].$value = 0;
            self.counters[2].$value = 0;
            self.counters[3].$value = 0;
        	// self.players[0].$value = "";
        	// self.players[1].$value = "";
        	// self.players.$save(self.players[0]);
        	// self.players.$save(self.players[1]);
        	self.boxes.$save(self.boxes[i]);
        	self.counters.$save(self.counters[i]);
        	}
    	}

    }