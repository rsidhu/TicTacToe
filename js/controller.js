angular
    .module('tttgApp')
    .controller('TTTController', TTTController);

    TTTController.$inject = ['$firebaseArray'];
    function TTTController($firebaseArray, $timeout){

        console.log("Controller is linked");
        var self = this;
        // var self.player = self.counters[2].$value;
        // var self.p2score = self.counters[1].$value;
        // var self.p1score = self.counters[0].$value;
        // var self.tiewatcher = self.counters[3].$value

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
            var ref = new Firebase("https://tictactopgun.firebaseio.com/");
            var chats = $firebaseArray(ref);
            return chats;
        })();

        self.addChat = function(){
            console.log("adding chat");
            self.chats.$add({message: self.text});
            self.text = null;
        }
              
		self.playerMove = function ($index){
		    if (
		    		self.boxes[$index].moveX == false && 
		    		self.boxes[$index].moveY == false && 
		    		self.counters[2].$value == 1
		    	){
			        self.boxes[$index].moveX = true;
			        self.counters[2].$value = 2;
			        self.boxes.$save(self.boxes[$index]);
			        self.counters[3].$value++;
			        self.winLogic();
			    } else if (
			    	self.boxes[$index].moveY==false && 
			    	self.boxes[$index].moveY == false && 
			    	self.counters[2].$value == 2
			    ){
			        console.log(self.boxes[$index])
			        self.boxes[$index].moveY=true;
			        self.counters[2].$value= 1;
			        self.boxes.$save(self.boxes[$index]);
			        self.counters[3].$value++;
			        self.winLogic();
		    	}
		    console.log(self.boxes[$index])
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
        	self.boxes[i].moveX = false;
        	self.boxes[i].moveY = false;
        	self.boxes.$save(self.boxes[i]);
        	}
    	}
    }