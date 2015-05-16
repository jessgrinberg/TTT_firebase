angular
.module('tictacApp')
.controller('TictacController', TictacController);


TictacController.$inject = ['$firebaseObject'];
// so these functions are set up and running angularfire and are the basic functions of the tictac toe board. Still need to introduce functions for the two player version.

function TictacController($firebaseObject, $index){ //constructor functin that builds cntrls my angular app
    var self = this; //reassigning keyword this to a variable called self (cos john papa says so) 

    self.board = getBoard(); //retrieves board from firebase and attaches to controller
    createBoxes(); // 
    self.clickYou = clickYou;
    self.playerX = true;
    self.playerO = false;
    self.win = false;
    self.winner = winner;
    



    function getBoard(){
// counter++;
// console.log(counter);
        var ref = new Firebase("https://tictactoetpf.firebaseio.com/");
        var board = $firebaseObject(ref);
        return board;
    }
    
    function createBoxes(){
// console.log("running createBoxes")
// console.log(self.board)
        self.board.counter = 0;
        self.board.boxes = [
        {active: false, p1owns:""},
        {active: false, p1owns:""},
        {active: false, p1owns:""},
        {active: false, p1owns:""},
        {active: false, p1owns:""},
        {active: false, p1owns:""},
        {active: false, p1owns:""},
        {active: false, p1owns:""},
        {active: false, p1owns:""}]; 
         // our game counter
        self.board.$save();  
        console.log(self.board.counter)
        }

    function clickYou($index){

        if(self.win){
        alert('To start a new game, hit reset!');
        return
        } 

        if (self.board.boxes[$index].p1owns != "") {
        alert("This button has already been clicked")
        }   

        else {
            if (self.playerX === true) {
            console.log("X");
            self.board.boxes[$index].p1owns = "X";
            console.log(self.board.boxes[$index])
            self.board.boxes[$index].active[$index]= true;
            self.board.counter ++;
            console.log(self.board.counter);
            self.board.$save(); 
            self.playerX = false ;   
            } else {
            self.board.boxes[$index].p1owns = "O";
            console.log("O");
            self.board.boxes[$index].active[$index] = false;
            self.board.counter ++;
            console.log(self.board.counter);
            self.board.$save(); 
            self.playerX = true ; 
            } 
            winner();
// console.log(self.counter)
console.log(self.win)
        }
    }

    function winner() {
    // console.log("winner x");

    //check for a winning combination for player1("X")
    if(
        ((self.board.boxes[0].p1owns == "X") && (self.board.boxes[1].p1owns == "X") && (self.board.boxes[2].p1owns == "X")) || 
        ((self.board.boxes[3].p1owns == "X") && (self.board.boxes[4].p1owns == "X") && (self.board.boxes[5].p1owns == "X")) || 
        ((self.board.boxes[6].p1owns == "X") && (self.board.boxes[7].p1owns == "X") && (self.board.boxes[8].p1owns == "X")) ||
        ((self.board.boxes[0].p1owns == "X") && (self.board.boxes[3].p1owns == "X") && (self.board.boxes[6].p1owns == "X")) || 
        ((self.board.boxes[1].p1owns == "X") && (self.board.boxes[4].p1owns == "X") && (self.board.boxes[7].p1owns == "X")) || 
        ((self.board.boxes[2].p1owns == "X") && (self.board.boxes[5].p1owns == "X") && (self.board.boxes[8].p1owns == "X")) || 
        ((self.board.boxes[0].p1owns == "X") && (self.board.boxes[4].p1owns == "X") && (self.board.boxes[8].p1owns == "X")) || 
        ((self.board.boxes[2].p1owns == "X") && (self.board.boxes[4].p1owns == "X") && (self.board.boxes[6].p1owns == "X")) 
      ) { 
          console.log("player one wins");
          self.board.$save();
          self.win = true;
          // self.message = self.newName + " Wins !";
          
    //check for a winning combination for player2("0")      
    } else if (
        ((self.board.boxes[0].p1owns == "O") && (self.board.boxes[1].p1owns == "O") && (self.board.boxes[2].p1owns == "O")) ||   
        ((self.board.boxes[3].p1owns == "O") && (self.board.boxes[4].p1owns == "O") && (self.board.boxes[5].p1owns == "O")) || 
        ((self.board.boxes[6].p1owns == "O") && (self.board.boxes[7].p1owns == "O") && (self.board.boxes[8].p1owns == "O")) ||
        ((self.board.boxes[0].p1owns == "O") && (self.board.boxes[3].p1owns == "O") && (self.board.boxes[6].p1owns == "O")) || 
        ((self.board.boxes[1].p1owns == "O") && (self.board.boxes[4].p1owns == "O") && (self.board.boxes[7].p1owns == "O")) || 
        ((self.board.boxes[2].p1owns == "O") && (self.board.boxes[5].p1owns == "O") && (self.board.boxes[8].p1owns == "O")) || 
        ((self.board.boxes[0].p1owns == "O") && (self.board.boxes[4].p1owns == "O") && (self.board.boxes[8].p1owns == "O")) || 
        ((self.board.boxes[2].p1owns == "O") && (self.board.boxes[4].p1owns == "O") && (self.board.boxes[6].p1owns == "O")) 
      ) {
          console.log("player two wins");
          self.board.$save();
          self.win = true;
          // self.message = self.newName2 + " Wins !";

    //once counter reached 8 and no one won, tie!  
    } else if (self.board.counter === 9) {
           console.log("It's a Tie!");
           self.board.$save();
           // self.message = "It's a Tie!";
           // alert('To start a new game, hit reset!');

      }
  }

}