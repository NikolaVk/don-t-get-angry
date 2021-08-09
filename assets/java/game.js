
let game                = null;
let scaling             = 80;
let pawnPosSize         = 20;
let pawnPosBorder       = 2;
let canvasTopOffset     = 40;
let pawnXoffset         = -42;
let pawnYoffset         = -60;
let pawnScale           = 0.019;
let pawnAnimSizeRatio   = 0.0007;
let pawnPosbaseColor    = "white";
let pawnPosColors       = ["rgb(0,0,255)", "rgb(255,0,0)", "rgb(0,255,0)", "rgb(255,255,0)"];
let pawnImages          = ["assets/images/pawn-blue.png", "assets/images/pawn-red.png", "assets/images/pawn-green.png", "assets/images/pawn-yellow.png"];
let diceScale           = 0.046;
let diceImages          = ["assets/images/dice-1.png", "assets/images/dice-2.png", "assets/images/dice-3.png", 
                           "assets/images/dice-4.png", "assets/images/dice-5.png", "assets/images/dice-6.png"];

let spotCoords       = [[4, 0], 
                           [4, 1],
                           [4, 2],
                           [4, 3],
                           [4, 4],
                           [3, 4],
                           [2, 4],
                           [1, 4],
                           [0, 4],
                           [0, 5],
                           [0, 6],
                           [1, 6],
                           [2, 6],
                           [3, 6],
                           [4, 6],
                           [4, 7],
                           [4, 8],
                           [4, 9],
                           [4, 10],
                           [5, 10],
                           [6, 10],
                           [6, 9],
                           [6, 8],
                           [6, 7],
                           [6, 6],
                           [7, 6],
                           [8, 6],
                           [9, 6],
                           [10, 6],
                           [10, 5],
                           [10, 4],
                           [9, 4],
                           [8, 4],
                           [7, 4],
                           [6, 4],
                           [6, 3],
                           [6, 2],
                           [6, 1],
                           [6, 0],
                           [5, 0]
                       ];

let homeSpotCoords  = [[5,1],
                          [5,2],
                          [5,3],
                          [5,4],
                          [1,5],
                          [2,5],
                          [3,5],
                          [4,5],
                          [5,9],
                          [5,8],
                          [5,7],
                          [5,6],
                         [9,5],
                         [8,5],
                         [7,5],
                         [6,5],
];

let startSpotCoords  = [[0,0],
                       [0,1],
                       [1,0],
                       [1,1],
                       [0,9],
                       [0,10],
                       [1,9],
                       [1,10],
                       [9,9],
                       [10,9],
                       [9,10],
                       [10,10],
                       [9,0],
                       [10,0],
                       [9,1],
                       [10,1],
                       ];



function loadGame()
{
    let el_canvas     = document.getElementById('gamefield_canvas');
    let el_playfield     = document.getElementById('gamefield_layer');
   let el_player        = document.getElementById('player_layer');
    if ((el_canvas == null) || (el_playfield == null) || (el_player == null))
   {
       showError("Internal error");
       return false;
   }

   el_canvas.addEventListener('click', function(e) {
        	let clickedElement = e.target;

            let handlingType = clickedElement.getAttribute('handletype');
            if ((handlingType != null) && (handlingType == "dice"))
                {
                if (game != null)    
                    {
                        game.throwDice();
                    }
                }
            else if ((handlingType != null) && (handlingType == "pawn"))
                {
                if (game != null)    
                    {
                        game.pawnSelected(clickedElement);
                    }
                }

                
            });

   game         = new theGame(el_playfield, el_player);
   if (game == null)
   {
       showError("Internal error");
       return false;
   }
   game.createGameField();
   game.draw();

   // show the menu
   showMenu();

}

function startGame()
    {
        game.start();
        hideMenu();
    }

function showMenu()
    {
    let     el_popup         = document.getElementById('menu');
    if (el_popup == null)
    {
        showError("Internal error");
        return false;
        
    }

    el_popup.classList.add("menu_active");
     }

function hideMenu()
     {
     let     el_popup         = document.getElementById('menu');
     if (el_popup == null)
     {
         showError("Internal error");
         return false;
         
     }
 
     el_popup.classList.remove("menu_active");
      }
 

function theGame(playfieldLayer, playerLayer)
    {


        this.el_playfield        = playfieldLayer;
        this.el_player           = playerLayer;
        this.board               = new playfield(this.el_player);
        this.theDice             = new dice(this.el_player);
        this.players             = [];
        this.activePlayer        = 0;
        this.state               = 0;

        this.createGameField     = function()
        {
        this.board.init();

        for (let index = 0; index < 4; index++)
        {
            var thePlayer      = new player(index, this.el_player);
            this.players.push(thePlayer);
            thePlayer.init();
        }

        this.theDice.init();

        };


        this.start              = function()
        {
            this.state               = 0;    
            this.activePlayer        = 0;
            this.theDice.reset();
            for (let index = 0; index < 4; index++)
            {
                this.players[index].reset();
            }
         
        };

        this.draw               = function()
            {
            this.board.draw(); 
            for (let index = 0; index < 4; index++)
            {
                this.players[index].draw();
            }
            this.theDice.draw();
               };

        this.throwDice          = function()
        {
            let diceValue   = this.theDice.throwDice();
            this.players[this.activePlayer].setState(1, diceValue);
        }

        this.pawnSelected          = function(clickedElement)
        {
            let playerID        = parseInt(clickedElement.getAttribute("playerid"));
            let pawnID          = parseInt(clickedElement.getAttribute("pawnid"));
            if (playerID == this.activePlayer)
                {
                   this.players[this.activePlayer].pawnSelected(pawnID);   
                   // todo: check what really happened
                   this.activePlayer++;
                   if (this.activePlayer > 3)
                   {
                    this.activePlayer       = 0;
                   }
                   this.theDice.currentPlayer       = this.activePlayer;
                   this.theDice.state               = 0; 
                   this.theDice.draw();

                }
        };

    }
function dice(parentElement)
    {
        let dicePositions       = [[100, 540], [100, 130], [500, 130], [500, 540]];

        this.el_parent          = parentElement; 
        this.currentPlayer      = 0;
        this.state              = -1;
        this.animcounter        = 0;
        this.myref              = this;
 
        if (this.el_parent == null)
        {
            console.log("dice: no parent element");
            return false;        
        }
    
        this.init           = function()
        {
            if (this.el_parent == null)
            {
                console.log("dice: no parent element");
                return false;        
            }
            this.el_element        = document.createElementNS("http://www.w3.org/2000/svg", 'image');
            this.el_element.setAttribute("href", diceImages[0]);
            this.el_element.setAttribute("handletype", "dice");
            this.el_element.setAttribute("transform", "translate(" + -100 + " " + -100 + ") scale(" + diceScale + " " + diceScale + ")");
             this.el_parent.appendChild(this.el_element);

           };
 
          this.reset              = function()
          {
              this.state              = 0; 
              this.currentPlayer      = 0;     
              this.draw();         
          };
  
 
          this.throwDice          = function()
            {
            if (this.state == 0)
                {
                    this.state      = parseInt(Math.random() * 5) + 1;
                }
                
                this.draw();
                return this.state;
            };

        this.draw           = function()
        {
            let x = -1000;
            let y = -1000;
            if (this.state >= 0)
            {
            x = dicePositions[this.currentPlayer][0];
            y = dicePositions[this.currentPlayer][1];
            }
            this.el_element.setAttribute("transform", "translate(" + x + " " + y + ") scale(" + diceScale + " " + diceScale + ")");

            if (this.state == 0)
                {
                    this.el_element.setAttribute("href", diceImages[this.animcounter ]);     
                    this.animcounter++;
                    if (this.animcounter > 5)
                    {
                        this.animcounter        = 0;
                    }             
                    setTimeout(function() {redrawDice()}, 400);
                }
            else if (this.state > 0)
            {
                this.el_element.setAttribute("href", diceImages[this.state - 1]);                   
            }
       };
   }

function redrawDice()
   {
       game.theDice.draw();
   }

function player(playerID, parentElement)
    {
        this.playerindex        = playerID;
        this.el_parent          = parentElement; 
        this.pawns              = [];
        this.state              = 0;
        this.lastThrow          = 0;

        if (this.el_parent == null)
        {
            console.log("player: no parent element");
       //     showError("Internal error");
            return false;        
        }
    
        this.init           = function()
        {
            if (this.el_parent == null)
            {
                console.log("player: no parent element");
           //     showError("Internal error");
                return false;        
            }
            for (let index = 0; index < 4; index++)
            {
                var thePawn      = new pawn(this.playerindex, index, this.el_parent);
                this.pawns.push(thePawn);
                thePawn.init();
            }
             
        };
 
        this.reset              = function()
        {
            this.state              = 0; 
            for (let index = 0; index < 4; index++)
            {
                this.pawns[index].reset();
            }
            // set first pawn to the start position
            this.pawns[0].moveTo(1,  this.playerindex * 10);
      };

        this.setState       = function(newState, diceValue)
        {
            if (newState == 1)
            {
                this.lastThrow      = diceValue;
            }

            this.state              = newState;
            for (let index = 0; index < 4; index++)
            {
                if (this.pawns[index].positionType == 1)
                {
                this.pawns[index].setState(newState);
                }
            }
            this.draw();

            return this.state;
       }

       this.pawnSelected          = function(pawnID)
        {
            if (this.pawns[pawnID].state == 1)
            {
                // pawn is selectable
                this.pawns[pawnID].setState(0); 
                this.pawns[pawnID].moveSteps(this.lastThrow);
            }
        };

       this.draw           = function()
        {
            for (let index = 0; index < 4; index++)
            {
                this.pawns[index].draw();
            }
  
        };
       }

function pawn(playerID, pawnIndex, parentElement)
{
    this.playerindex        = playerID;
    this.index              = pawnIndex;
    this.state              = 0;
    this.element            = null;
    this.position           = pawnIndex;
    this.positionType       = 3;
    this.el_parent          = parentElement; 
    this.imageURL           = pawnImages[playerID];
    this.el_element         = null;
    this.animCounter        = 0;
    this.animDirection      = 0;
    this.ownRef             = this;
    if (this.el_parent == null)
    {
        console.log("pawnSpots: no parent element");
   //     showError("Internal error");
        return false;        
    }

    this.init           = function()
    {
        if (this.el_parent == null)
        {
            console.log("pawn: no parent element");
       //     showError("Internal error");
            return false;        
        }

         this.el_element        = document.createElementNS("http://www.w3.org/2000/svg", 'image');
        this.el_element.setAttribute("href", this.imageURL);
        this.el_element.setAttribute("transform", "translate(" + 0 + " " + 0 + ") scale(" + pawnScale + " " + pawnScale + ")");
        this.el_element.setAttribute("handletype", "pawn");
        this.el_element.setAttribute("playerid", this.playerindex);
        this.el_element.setAttribute("pawnid", this.index);
        this.el_parent.appendChild(this.el_element);
     
        };

        this.reset              = function()
        {
            this.state              = 0; 
         };

         this.moveTo              = function(posType, position)
         {
             this.positionType              = posType; 
             this.position                  = position;

             // todo: implement move animation 
             this.draw();
          };
 
          this.moveSteps    = function(steps)
          {
             this.position                  += steps;
             if (this.position > 39)
                {
                    this.position       = 39; 
                }
 
              // todo: implement move animation 
              this.draw();
           };
  
          this.setState       = function(newState)
            {
            this.state              = newState;
            this.draw();
            }
  
  
  
          this.draw           = function()
    {

        let x = 0;
        let y = 0;

        // position the pawn
        if (this.positionType == 1)
        {
            x =  spotCoords[this.position][0] * scaling;
            y =  (10 - spotCoords[this.position][1]) * scaling;

        }
        else if (this.positionType == 2)
        {
            x =  homeSpotCoords[this.playerindex * 4 + this.position][0] * scaling;
            y =  (10 - homeSpotCoords[this.playerindex * 4 + this.position][1]) * scaling;
        }
       else if (this.positionType == 3)
        {
            x =  startSpotCoords[this.playerindex * 4 + this.position][0] * scaling;
            y =  (10 - startSpotCoords[this.playerindex * 4 + this.position][1]) * scaling;

            // start spot
 //           if (this.playerindex == 0)
 //           {
 //           x = parseInt(this.position % 2) * scaling;   
 //           y = ((10 - parseInt(this.position / 2)) * scaling);   
 //           }
 //           else if (this.playerindex == 1)
 //           {
 //           x = parseInt(this.position % 2) * scaling;   
 //           y = (parseInt(this.position / 2) * scaling);   
 //           }
 //           else if (this.playerindex == 2)
 //           {
 //           x = (parseInt(this.position % 2) + 9) * scaling;   
 //           y = (parseInt(this.position / 2) * scaling);   
 //           }
 //           else if (this.playerindex == 3)
 //           {
 //           x = (parseInt(this.position % 2) + 9) * scaling; 
 //           y = ((10 - parseInt(this.position / 2)) * scaling);   
 //           }
        }
        x   += pawnXoffset;
        y   += pawnYoffset + canvasTopOffset;
        if (this.state != 1)
        {
            this.animCounter        = 0;
            this.animDirection      = 1;
        }

        pawnScaling         = pawnScale + (this.animCounter * pawnAnimSizeRatio);
        this.el_element.setAttribute("transform", "translate(" + x + " " + y + ") scale(" + pawnScaling + " " + pawnScaling + ")");


        if (this.state == 1)
        {
            this.animCounter += this.animDirection;
            if ((this.animCounter > 10) || (this.animCounter < 0))
            {
                this.animDirection  *= -1;
            }
         setTimeout(redrawPawn, 100, this.ownRef);
        }
   };
}

function redrawPawn(pawnRef)
   {
    pawnRef.draw();
   }


function pawnSpots(spotType, spotIndex, parentElement, coordX, coordY)
{
    this.type           = spotType;
    this.index          = spotIndex;
    this.coords         = {x: coordX, y: coordY};

    // check what type of pawn position this is
    if (spotType == 1)
        {
        // normal circuit position
        if ((spotIndex % 10) != 0)
            {
            this.color          = pawnPosbaseColor;
            }
        else 
            {
            this.color          = pawnPosColors[parseInt(spotIndex / 10)];
            }
        }
    else if (spotType == 2)
        {
        // home spots     
        this.color              = pawnPosColors[parseInt(spotIndex / 4)];
        }
    else if (spotType == 3)
        {
        // Start spots     
        this.color              = pawnPosColors[parseInt(spotIndex / 4)];
        }
  
    this.el_parent         = parentElement; 
    this.el_element        = null;
    if (this.el_parent == null)
    {
        console.log("pawnSpots: no parent element");
   //     showError("Internal error");
        return false;        
    }

    this.init           = function()
    {
        if (this.el_parent == null)
        {
            console.log("pawnSpots: no parent element");
       //     showError("Internal error");
            return false;        
        }
         this.el_element        = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        this.el_element.setAttribute("cx", this.coords.x * scaling);
        this.el_element.setAttribute("cy", ((10 - this.coords.y) * scaling) + canvasTopOffset);
        this.el_element.setAttribute("r", pawnPosSize);
        this.el_element.setAttribute("stroke", "black");
        this.el_element.setAttribute("stroke-width", pawnPosBorder);
          this.el_element.setAttribute("fill", this.color);
//        this.el_element.className      = "pawnposition";
          this.el_parent.appendChild(this.el_element);
     
    };
    this.draw           = function()
    {

    };
}

function playfield(el_playfield)
{


    this.el_canvas          = el_playfield;
    this.circuit_spots      =  [];
    this.home_spots         =  [];
    this.start_spots        =  [];
    this.dice               = null; 

    this.init               = function()
        {
    
        for (let index = 0; index < 40; index++)
           {
                let spot        = new pawnSpots(1, index, this.el_canvas, spotCoords[index][0], spotCoords[index][1]);
                this.circuit_spots.push(spot);
                spot.init();
            }
        for (let index = 0; index < 16; index++)
            {
            let spot        = new pawnSpots(2, index, this.el_canvas, homeSpotCoords[index][0], homeSpotCoords[index][1]);
            this.home_spots.push(spot);
            spot.init();
        }
        for (let index = 0; index < 16; index++)
            {
            let spot        = new pawnSpots(3, index, this.el_canvas, startSpotCoords[index][0], startSpotCoords[index][1]);
            this.start_spots.push(spot);
            spot.init();
        }
        
        }; // init function

 
    this.draw               = function()
    {


    }; // draw function
}



function showError(ErrorMessage)
    {
        alert("Error: " + ErrorMessage);
    }