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
           self.board.boxes = [{active: false, p1owns:"" }, {active: false, p1owns:""}, {active: false, p1owns:""}, {active: false, p1owns:""}, {active: false, p1owns:""}, {active: false, p1owns:""}, {active: false, p1owns:""}, {active: false, p1owns:""}, {active: false, p1owns:""}]; 
           self.board.counter = 0; // our game counter
           self.board.$save();  
           console.log(self.board.counter)
       }

       function clickYou($index){
           if (self.board.boxes[$index].p1owns != "") {
               alert("seat's taken")
            }

            else {

               if (self.playerX == true) {
                   self.board.boxes[$index].active[$index]= true;
                   self.board.boxes[$index].p1owns = 'X';
                   self.board.counter +=1;
                   console.log(self.board.counter);
                   self.board.$save(); 
                   self.playerX = false ;   
               }
               else {
                   self.board.boxes[$index].active[$index] = false;
                   self.board.boxes[$index].p1owns = 'O';
                   self.board.counter +=1;
                   console.log(self.board.counter);
                   self.board.$save(); 
                   self.playerX = true ; 
               } 
            }
       }

   }