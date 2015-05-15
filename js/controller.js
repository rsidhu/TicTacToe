angular
    .module('tttgApp')
    .controller('TTTController', TTTController);

    function TTTController($timeout){

        console.log("Controller is linked");
        var self = this;
        self.player = 1;
        self.p1score = 0;
        self.p2score = 0;
        self.tieWatcher = 0;

        self.boxes = [{name: "box1", moveX: false, moveY: false}, {name: "box2", moveX: false, moveY: false}, {name: "box3", moveX: false, moveY: false}, {name: "box4", moveX: false, moveY: false}, {name: "box5", moveX: false, moveY: false}, {name: "box6", moveX: false, moveY: false}, {name: "box7", moveX: false, moveY: false}, {name: "box8", moveX: false, moveY: false}, {name: "box9", moveX: false, moveY: false}];
        
        self.playerMove = function($index){
        	if (self.player == 1 && self.boxes[$index].moveX == false && self.boxes[$index].moveY == false){
        		console.log("X move");
        		self.boxes[$index].moveX = true;
        		self.player = 2;
        		self.tieWatcher++;
        		console.log(self.boxes);
        		self.winLogic();
        		self.tieLogic();
        	}else if (self.player == 2 && self.boxes[$index].moveX == false && self.boxes[$index].moveY == false){
        		console.log("Y move");
        		self.boxes[$index].moveY = true;
        		self.player = 1;
        		self.tieWatcher++;
        		console.log(self.boxes)
        		self.winLogic();
        		self.tieLogic();
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
        		self.p1score++;
        		$timeout(self.reset, 1000);
        	}else if(
        		self.boxes[0].moveY == true && self.boxes[1].moveY == true && self.boxes[2].moveY == true ||
        		self.boxes[3].moveY == true && self.boxes[4].moveY == true && self.boxes[5].moveY == true ||
        		self.boxes[6].moveY == true && self.boxes[7].moveY == true && self.boxes[8].moveY == true ||
        		self.boxes[0].moveY == true && self.boxes[3].moveY == true && self.boxes[6].moveY == true ||
        		self.boxes[1].moveY == true && self.boxes[4].moveY == true && self.boxes[7].moveY == true ||
        		self.boxes[2].moveY == true && self.boxes[5].moveY == true && self.boxes[8].moveY == true ||
        		self.boxes[0].moveY == true && self.boxes[4].moveY == true && self.boxes[8].moveY == true ||
        		self.boxes[2].moveY == true && self.boxes[4].moveY == true && self.boxes[6].moveY == true 
        		){
        		self.p2score++;
        		$timeout(self.reset, 1000);
        	}
        }

        self.tieLogic = function(){
        	if(self.tieWatcher == 9){
        		alert("Tie");
        	}
        }

        self.resetter = setTimeout(self.reset, 1000);

        self.reset = function(){
        	self.boxes[0].moveX = false;
        	self.boxes[1].moveX = false;
        	self.boxes[2].moveX = false;
        	self.boxes[3].moveX = false;
        	self.boxes[4].moveX = false;
        	self.boxes[5].moveX = false;
        	self.boxes[6].moveX = false;
        	self.boxes[7].moveX = false;
        	self.boxes[8].moveX = false;
        	self.boxes[0].moveY = false;
        	self.boxes[1].moveY = false;
        	self.boxes[2].moveY = false;
        	self.boxes[3].moveY = false;
        	self.boxes[4].moveY = false;
        	self.boxes[5].moveY = false;
        	self.boxes[6].moveY = false;
        	self.boxes[7].moveY = false;
        	self.boxes[8].moveY = false;
        }



    }

     	// $scope.score = 0;

        // $scope.holes = [{name: "Hole1", moleIsHere: false, deadMole: false, moveX: false, moveY: false}, {name: "Hole2", moleIsHere: false, deadMole: false}, {name: "Hole3", moleIsHere: false, deadMole: false}, {name: "Hole4", moleIsHere: false, deadMole: false}];
        // //$scope.holes.deadMole = false;
        // $scope.randomNumber = 0;

        // $scope.play = function(){
        //     $interval(function(){
        //         console.log("Playing");
        //         $scope.holes = [{name: "Hole1", moleIsHere: false, deadMole: false}, {name: "Hole2", moleIsHere: false, deadMole: false}, {name: "Hole3", moleIsHere: false, deadMole: false}, {name: "Hole4", moleIsHere: false, deadMole: false}];
        //         $scope.randomNumber = Math.floor(Math.random() * 4);
        //         console.log($scope.randomNumber);
        //         $scope.holes[$scope.randomNumber].moleIsHere = true;
        //         console.log($scope.holes);
        //         return $scope.randomNumber;
        //         $scope.$digest();
        //     }, 3000);
        // }

        // $scope.whack = function(){
        //     console.log($scope.holes[$scope.randomNumber])
        //     console.log("Whacking");
        //     $scope.holes[$scope.randomNumber].deadMole = true;
        //     console.log($scope.holes[$scope.randomNumber]);
        //     $scope.score++;
        // }

        // function whack() {
            //  window.clearInterval();
            //     image.src = "images/deadmole.png";
            //     score++;
            //     document.getElementById("score").innerHTML=score;
            //     document.getElementById('hit').play();
            // }

        // 3 - You might need a variable called $scope.score that starts at 0

        // 4 - You might also need an array called $scope.holes, which contains 9 hole objects. Each hole object could have a property that says if it contains the mole or not.

        // 7 - You could then write a whackMole function, that runs whenever a hole is clicked (but only if that hole contains the mole!). Remember to write the function and then link it to your controller using $scope.whackMole = whackMole;
        //     a) The whackMole function should increment the score
        //     b) ...and make the mole pop up in another random hole (you can use Math.random() just like in the plain JS version of this app)

//     function play() {
//     function random() {
//         image.src = "images/mole.png";
//         image.style.display = 'inline-block';
//         var randomNumber = Math.floor(Math.random() * 4);
//         document.getElementsByClassName('hole')[randomNumber].appendChild(image);
//         window.setTimeout("image.style.display = 'none';", 1000); 
//     }
//     window.setInterval(random, 2000);
// }