
let game                = null;
let scaling             = 80;
let pawnPosSize         = 20;
let pawnPosBorder       = 2;
let canvasTopOffset     = 110;
let canvasLeftOffset    = 100;
let pawnXoffset         = -42;
let pawnYoffset         = -60;
let pawnScale           = 0.019;
let pawnAnimSizeRatio   = 0.0007;
let diceTextXOffset     = 50;
let diceTextYOffset     = 130;
let diceTextScale       = 3;
let diceTextColor       = "rgb(255,255,255)";
let pawnPosbaseColor    = "white";
let pawnPosColors       = ["rgb(0,0,255)", "rgb(255,0,0)", "rgb(0,255,0)", "rgb(255,255,0)"];
let pawnImages          = ["assets/images/pawn-blue.png", "assets/images/pawn-red.png", "assets/images/pawn-green.png", "assets/images/pawn-yellow.png"];
let diceScale           = 0.10;
let diceImages          = ["assets/images/dice-1.png", "assets/images/dice-2.png", "assets/images/dice-3.png", 
                           "assets/images/dice-4.png", "assets/images/dice-5.png", "assets/images/dice-6.png"];
let dicePositions       = [[150, 550], [150, 150], [550, 150], [550, 550]];
 
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

    // get the playfield DOM elements
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


    sizeCanvas();

   game         = new theGame(el_playfield, el_player);
   if (game == null)
   {
       showError("Internal error");
       return false;
   }
   game.createGameField();
   game.draw();

   // show the menu
   setTimeout(showMenu(), 3000);

}

function sizeCanvas()
    {
        let el_canvas     = document.getElementById('gamefield_canvas');
     
    if (window.innerWidth > window.innerHeight)
        {
        el_canvas.style.width         = window.innerHeight + 'px';
        el_canvas.style.height         = window.innerHeight + 'px';
        el_canvas.style.left          = ((window.innerWidth - window.innerHeight) / 2)  + 'px';
        el_canvas.style.top          = 0  + 'px';
    }
       else
        {
        el_canvas.style.width           = window.innerWidth + 'px';
        el_canvas.style.height         = window.innerWidth + 'px';
        el_canvas.style.left          = 0  + 'px';
        el_canvas.style.top          = ((window.innerHeight - window.innerWidth) / 2)  + 'px';
        }
    }


function playerSelectionButtonClicked(sender, playerid, buttonid)
{
    if (game != null) 
    {
    game.setPlayerType(playerid, buttonid);  
    }
}

function startGame()
    {
        game.start();
        hideMenu();
    }

//-------------------------------------------------------------------------------------------------
// showRules - Shows the rule panel
//-------------------------------------------------------------------------------------------------
function showRules()
    {
    let el_Rules            = document.getElementById('rules_panel');
    if (el_Rules != null)
        {
            el_Rules.style.display          = 'block';
        }     
    } // showRules

//-------------------------------------------------------------------------------------------------
// hideRules - Hide the rule panel
//-------------------------------------------------------------------------------------------------
function hideRules()
    {
    let el_Rules            = document.getElementById('rules_panel');
    if (el_Rules != null)
    {
        el_Rules.style.display          = 'none';
    }  
    } // hideRules


//-------------------------------------------------------------------------------------------------
// showWonPopup - show the win panel
//-------------------------------------------------------------------------------------------------
function showWonPopup(playerName)
    {
        let el_winningplayer    = document.getElementById('playername');
        if (el_winningplayer == null)
        {
            showError("Internal error");
            return false;      
        }
        el_winningplayer.innerHTML      = playerName;

    let el_wonpopup     = document.getElementById('wonpopup');
    if (el_wonpopup == null)
    {
        showError("Internal error");
        return false;      
    }

    el_wonpopup.style.display       = "block" ;
    } // showWonPopup


//-------------------------------------------------------------------------------------------------
// hideRules - show the menu panel
//-------------------------------------------------------------------------------------------------
function showMenu()
    {
    let     el_popup         = document.getElementById('menu');
    if (el_popup == null)
    {
        showError("Internal error");
        return false;
        
    }

    let el_wonpopup     = document.getElementById('wonpopup');
    if (el_wonpopup == null)
    {
        showError("Internal error");
        return false;      
    }

    el_wonpopup.style.display       = "none";
    el_popup.classList.add("menu_active");
    } // showMenu

//-------------------------------------------------------------------------------------------------
// hideMenu - Hide the menu panel
//-------------------------------------------------------------------------------------------------
function hideMenu()
    {
     let     el_popup         = document.getElementById('menu');
     if (el_popup == null)
     {
         showError("Internal error");
         return false;
         
     }
 
     el_popup.classList.remove("menu_active");
    } // hideMenu


//-------------------------------------------------------------------------------------------------
// theGame - The main game object - Contains all game logic and game drawing stuff
//-------------------------------------------------------------------------------------------------
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

            // set defaults for the players
            this.players[0].setPlayerType(2);
            this.players[1].setPlayerType(3);
            this.players[2].setPlayerType(3);
            this.players[3].setPlayerType(3);

            this.theDice.init();

        };


        this.setPlayerType      = function (playerid, playerType)
        {
            if ((playerid >= 1) && (playerid <= 4) && (this.players.length >= playerid))
            {
                this.players[playerid - 1].setPlayerType(playerType);   
            }
        };

        this.start              = function()
        {

            // todo: perform sanity checks if everything is here and we can start the game
            if (!this.isOK())
            {
                return false;
            }


            this.state               = 0;    
            this.activePlayer        = 0;
            this.theDice.reset();
            for (let index = 0; index < 4; index++)
            {
                this.players[index].reset();
            }
            this.theDice.setState(0, "Throw dice");
         
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
            if (diceValue === false)
            {
                // dice not in the correct state
                return false;
            }

            // perform the checking what we need to do
             let numSelectedPawns = this.players[this.activePlayer].setState(1, diceValue);
            if (numSelectedPawns == 0)
                {
                // check if this player has all pawn in the waiting 
                if ((this.players[this.activePlayer].numPawnsWaiting() < 4) || (this.players[this.activePlayer].numDiceThrows >= 3))
                    {
                    // no pawn selected, so go to the next player
                    // Todo: this should be one function because there are muitiple spots to continue to the next player
                    if (!this.selectNexPlayer())
                        {
                        // seems the game is over

                        return;
                        }
                    else
                        {
                        this.theDice.currentPlayer       = this.activePlayer;
                        }
                    }
                    this.theDice.setState(0, "Throw dice");

                }
            }; // throwDice (function)

        this.pawnSelected          = function(clickedElement)
        {
            let playerID        = parseInt(clickedElement.getAttribute("playerid"));
            let pawnID          = parseInt(clickedElement.getAttribute("pawnid"));
            if (playerID == this.activePlayer)
                {
                    // get the new position of the pawn
                   let newPawnPos   = this.players[this.activePlayer].pawnSelected(pawnID);   

                    // check if the new position was occupied by another player
                    for (let index = 0; index < 4; index++)
                    {
                        if (index != this.activePlayer)
                            {
                            let pawnIndex = this.players[index].getPawnIndexOnPosition(newPawnPos, 1);
                            if (pawnIndex >= 0)
                            {
                                // this pawn has to move
                                this.players[index].putPawnBackInWaiting(pawnIndex);
                            }
                            }
                    }
                    
                    if (this.players[this.activePlayer].getNumPawnsAtHome() == 4)
                    {
                        // this player wins
                        showWonPopup(this.players[this.activePlayer].playername);
                    }
                    else
                    {
                    if (this.theDice.state != 6)
                        {
                         if (!this.selectNexPlayer())
                         {
                            // seems the game is over

                            return;
                         }
                         else
                         {
                            this.theDice.currentPlayer       = this.activePlayer;
                         }
                       }
                   this.theDice.setState(0, "Throw dice");
                    }
                }
        };

        this.selectNexPlayer    = function()
        {
            // next player
            // reset the current players turn
            this.players[this.activePlayer].endTurn();

            let playerIndex;
            for (playerIndex = 1; playerIndex <= 4; playerIndex++)
            {
                let index = this.activePlayer + playerIndex;
                while (index >= 4)
                {
                    index       -= 4;
                }
                if (this.players[index].isActive())
                {
                    this.activePlayer           = index;  
                    return true;
                }
            } 
            return false;               

        };

        this.isOK               = function()
        {
            if (this.players.length != 4)
                {
                    return false;
                }
             for (let index; index < 4; index++)
            {
                // check if the player configs are OK
                if (!this.players.isOK())
                {
                    return false;
                }
            }
            return true;
        }; // isOK (function)
    } // theGame object



function dice(parentElement)
    {
        this.el_parent          = parentElement; 
        this.el_element         = null;
        this.el_diceText        = null;
        this.currentPlayer      = 0;
        this.state              = -1;
        this.animcounter        = 0;
        this.animdirection      = -1;
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

            this.el_diceText            = document.createElementNS("http://www.w3.org/2000/svg", 'text');
            this.el_diceText.innerHTML  = ""; 
            this.el_diceText.setAttribute("x", -100);
            this.el_diceText.setAttribute("y", -100);
            this.el_diceText.setAttribute("text-anchor", "middle");
            this.el_diceText.setAttribute("fill", diceTextColor);
             
            this.el_diceText.setAttribute("transform", "scale(" + diceTextScale + " " + diceTextScale + ")");
              this.el_parent.appendChild(this.el_diceText);
            };
 
          this.reset              = function()
          {
              this.state              = 0; 
              this.currentPlayer      = 0;   
              this.setDiceText("");  
              this.draw();         
          };

          this.setState             = function(newDiceState, newDiceText)
          {
            this.state              = newDiceState;
            this.setDiceText(newDiceText);
            this.draw();
          };
  
          this.setDiceText          = function(newText)
            {
                this.el_diceText.innerHTML      = newText;
            };
 
          this.throwDice          = function()
            {
            if (this.state == 0)
                {
                this.state      = parseInt(Math.random() * 5.99999999999) + 1;   
                this.setDiceText("Thrown: " + this.state);        
                this.draw();
                return this.state;
                }
            return false;
            };

        this.draw           = function()
        {
            let x = -1000;
            let y = -1000;
            if (this.state >= 0)
            {
            x = dicePositions[this.currentPlayer][0] + canvasLeftOffset;
            y = dicePositions[this.currentPlayer][1] + canvasTopOffset;
            }

            let animScale           = 0;
            this.el_element.setAttribute("transform", "translate(" + x + " " + y + ") scale(" + diceScale + " " + diceScale + ")");
            this.el_diceText.setAttribute("x", 0);
            this.el_diceText.setAttribute("y", 0);
            if (this.state == 0)
                {
                    this.animcounter        += this.animdirection;
                    if ((this.animcounter < 0 ) || (this.animcounter > 10))
                    {
                        this.animdirection      = 0 - this.animdirection;  
                    }
                    animScale           += this.animcounter * 0.01;
                    setTimeout(function() {redrawDice()}, 50);
                }
            else if (this.state > 0)
            {
                this.animcounter        = 0;
                this.el_element.setAttribute("href", diceImages[this.state - 1]);
            }
            this.el_diceText.setAttribute("transform", "translate(" + (x + diceTextXOffset) + " " + (y + diceTextYOffset) + ") scale(" + (diceTextScale + animScale) + " " + (diceTextScale + animScale) + ")");
       };
   } // dice object

function redrawDice()
   {
       game.theDice.draw();
   }

//-------------------------------------------------------------------------------------------------
// player - The player object - Contains player functionality and data
//-------------------------------------------------------------------------------------------------
function player(playerID, parentElement, playerName)
    {
        this.playerindex        = playerID;
        this.el_parent          = parentElement; 
        this.playername         = playerName;
        this.playertype         = 0;
        this.pawns              = [];
        this.state              = 0;
        this.numDiceThrows      = 0;
        // states:
        //  0 = waiting
        //  1 = Dice is thrown (need selection)
        //  2 = Done
        //  3 = Disabled
        this.lastThrow          = 0;
        this.startPosIndex      = this.playerindex * 10;
        this.config             = new playerconfigs(playerID);

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


        this.getNumPawnsAtHome  = function()
        {
                let numPawns      = 0;
                for (let index = 0; index < 4; index++)
                {
                    if (this.pawns[index].positionType == 2)
                    {
                        numPawns++;   
                    }
                }
    
                return numPawns;
    
        };

        this.numPawnsWaiting    = function()
        {
            let numWaitingPawns      = 0;
            for (let index = 0; index < 4; index++)
            {
                if (this.pawns[index].positionType == 3)
                {
                    numWaitingPawns++;   
                }
            }

            return numWaitingPawns;
        };

        this.isActive           = function()
        {
            if ((this.state == 2) || (this.state == 3))
                {
                    return false;
                }
                else
                {
                    return true;
                }
        };


        this.setPlayerType      = function(type)
            {
                this.playertype         = type;
                this.config.updatePlayerType(this.playertype);
            };
 

        this.endTurn            = function()
           {
            if (this.state < 2)
            {
                this.state              = 0; 
            }
            for (let index = 0; index < 4; index++)
            {
                this.pawns[index].reset();
            }
            this.numDiceThrows          = 0;
 
            }

        this.reset              = function()
        {

            // get config
            this.playertype     = this.config.readPlayerType();
            this.playername     = this.config.readPlayerName();



            this.state              = 0; 
            for (let index = 0; index < 4; index++)
            {
                this.pawns[index].reset();
            }
            this.numDiceThrows          = 0;


            // set some easy start configuration
            this.pawns[0].moveTo(1, ((this.playerindex * 10)+ 39) % 40);
            this.pawns[1].moveTo(1, ((this.playerindex * 10)+ 38) % 40);
            this.pawns[2].moveTo(1, ((this.playerindex * 10)+ 37) % 40);
            this.pawns[3].moveTo(1, ((this.playerindex * 10)+ 36) % 40);
        };

        this.setState       = function(newState, diceValue)
        {

            let pawnSelected        = 0;
            this.state              = newState;
            if (newState == 1)
            {
                // dice has been thrown
                this.lastThrow      = diceValue;
                this.numDiceThrows++;
  
                for (let index = 0; index < 4; index++)
                {
                    if ((this.pawns[index].positionType == 1) || (this.pawns[index].positionType == 2))
                    {
                    // calculate the new position this pawn will get
                    let newPawnPos  = this.getNewPawnPostion(index, this.lastThrow);
                    
                    // check if we have another pawn on this position
                    if ((newPawnPos !== false) && ((newPawnPos.positiontype == 3) || (this.getPawnIndexOnPosition(newPawnPos.position, newPawnPos.positiontype) < 0)) )
                        {
                        this.pawns[index].setState(newState);
                        pawnSelected++;
                        }
                    }
                    else if ((this.lastThrow == 6) && (this.canPlaceNewPawn()))
                    {
                        this.pawns[index].setState(newState);   
                        pawnSelected++;                   
                    }
                }
            
            }
            else
            {           
                // other state then a dice throw
                for (let index = 0; index < 4; index++)
                {
                this.pawns[index].setState(newState);
                }
            }

            this.draw();

            return pawnSelected;
       }

    this.getNewPawnPostion              = function(pawnIndex, dicevalue)
    {
        let homePawnLocalIndex      = -1;
        let newPawnPos              = 0;
        let newPawnPosType          = 1;
        if (this.pawns[pawnIndex].positionType == 1)
        {
            // calculate the local circuit index for the pawn (so starting with 0 for the player)
         let circuitLocalIndex       = (((this.pawns[pawnIndex].position - this.startPosIndex) + 40) % 40) + dicevalue;
         // calculating the destination global spot
         newPawnPos                  = (this.pawns[pawnIndex].position + dicevalue) % 40;
           // check if we want to move the pawn into the house
        if (circuitLocalIndex > 39)
        {
            // calculate the local home index
            homePawnLocalIndex      = (circuitLocalIndex - 40);
            newPawnPosType          = 2;
            // convert to a global home index 
            newPawnPos              = homePawnLocalIndex + (this.playerindex * 4);
        }

     }
     else if (this.pawns[pawnIndex].positionType == 2)
     {
         // pawn is already in its home
         homePawnLocalIndex             = (this.pawns[pawnIndex].position + dicevalue) - (this.playerindex * 4); 
         newPawnPosType                 = 2;
         // convert to a global home index 
         newPawnPos                      = homePawnLocalIndex + (this.playerindex * 4);
  }
    if (homePawnLocalIndex > 3)
    {
        // illegal value
        console.log('Illegal position: ' + this.playerindex + ',type: ' + newPawnPosType + ', pos: ' + newPawnPos + ", localindex: " + homePawnLocalIndex);
        return false;
  }
        console.log('new possible pawn pos player: ' + this.playerindex + ',type: ' + newPawnPosType + ', pos: ' + newPawnPos);
        return {position: newPawnPos, positiontype: newPawnPosType};
    };
  
     this.getPawnIndexOnPosition        = function(pawnPos, pawnPosType)
     {
        for (let index = 0; index < 4; index++)
        {
            if ((this.pawns[index].positionType == pawnPosType) && (this.pawns[index].position == pawnPos))
            {
                console.log('Pawn ' + index + ' of player ' + this.playerindex + ' is on position ' + pawnPos);
                return index;
            }
        }
        // no pawn on this spot
        return -1;
     };
      this.putPawnBackInWaiting         = function (pawnIndex)
      {
        for (let freeWaitingSpot = 0; freeWaitingSpot < 4; freeWaitingSpot++)
            {    
            let index;          ;
            for (index = 0; index < 4; index++)
            {
                if ((this.pawns[index].positionType == 3) && (this.pawns[index].position == (freeWaitingSpot + (this.playerindex * 4))))
                {
                    break;
                }
            }
            if (index >= 4)
            {
                // spot is free
                this.pawns[pawnIndex].positionType          = 3;
                this.pawns[pawnIndex].position              = freeWaitingSpot;
                this.pawns[pawnIndex].draw();
                return true;
            }
        }
       return false;
      };
       

  
  
       this.canPlaceNewPawn     = function()
        {
             for (let index = 0; index < 4; index++)
           {
               if ((this.pawns[index].positionType == 1) && (this.pawns[index].position == this.startPosIndex))
               {
               return false;    
               }
              }
            return true;
            };

       this.pawnSelected          = function(pawnID)
        {
            if (this.pawns[pawnID].state == 1)
            {
                // pawn is selectable
                if ((this.pawns[pawnID].positionType == 1) || (this.pawns[pawnID].positionType == 2))
                    {
                    let newPawnPos  = this.getNewPawnPostion(pawnID, this.lastThrow);
                    if (newPawnPos !== false)
                        {
                        this.pawns[pawnID].position     = newPawnPos.position;
                        this.pawns[pawnID].positionType = newPawnPos.positiontype;
                        }
                    }
                else if (this.pawns[pawnID].positionType == 3)
                {
                    // pawn is still in the waiting room
                    this.pawns[pawnID].position         = this.startPosIndex;
                    this.pawns[pawnID].positionType     = 1;

                    // reset the state of all pawns
   
                }
            this.pawns[0].setState(0); 
            this.pawns[1].setState(0); 
            this.pawns[2].setState(0); 
            this.pawns[3].setState(0); 
           return this.pawns[pawnID].position;
           }
        };

       this.draw           = function()
        {
            for (let index = 0; index < 4; index++)
            {
                this.pawns[index].draw();
            }
  
        };
 
        this.isOK               = function()
        {
            if (!this.config.isOK())
                {
                    return false;
                }
             return true;
        };


    } // player object


 function playerconfigs(playerID)
    {
        this.playerindex                = playerID;
        this.el_typebutton_empty        = document.getElementById("playerempty_" + (playerID + 1));
        this.el_typebutton_human        = document.getElementById("playerhuman_" + (playerID + 1));
        this.el_typebutton_computer     = document.getElementById("playercomputer_" + (playerID + 1));
        this.el_playername              = document.getElementById("playername_" + (playerID + 1));
        this.playerType                 = 0;

        this.readPlayerType     = function()
        {
            return  this.playerType ;
        };
        this.readPlayerName     = function()
        {
            if (this.el_playername != null)
            {
                return this.el_playername.value;
            }
            return 'John Doe';
        };

        this.updatePlayerType   = function(newPlayerType)
        {
            this.playerType                 = newPlayerType;
                if (newPlayerType == 1)
                {
                    // player is disabled
                    this.el_typebutton_empty.classList.add("playerselbutton_selected");
                    this.el_typebutton_human.classList.remove("playerselbutton_selected");
                    this.el_typebutton_computer.classList.remove("playerselbutton_selected");
                    this.el_playername.classList.add("playername_disabled");
                }
                else if (newPlayerType == 2)
                {
                    // player is human
                    this.el_typebutton_empty.classList.remove("playerselbutton_selected");
                    this.el_typebutton_human.classList.add("playerselbutton_selected");
                    this.el_typebutton_computer.classList.remove("playerselbutton_selected");
                    this.el_playername.classList.remove("playername_disabled");
                }
                else if (newPlayerType == 3)
                {
                    // player is computer
                    this.el_typebutton_empty.classList.remove("playerselbutton_selected");
                    this.el_typebutton_human.classList.remove("playerselbutton_selected");
                    this.el_typebutton_computer.classList.add("playerselbutton_selected");
                    this.el_playername.classList.add("playername_disabled");
                }
        };

        this.isOK               = function()
        {
            if ((this.el_typebutton_empty == null) || 
                (this.el_typebutton_human == null) ||
                (this.el_typebutton_computer == null) ||
                (this.el_playername == null))
                {
                    return false;
                }
             return true;
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
            x =  homeSpotCoords[this.position][0] * scaling;
            y =  (10 - homeSpotCoords[this.position][1]) * scaling;
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
        x   += pawnXoffset + canvasLeftOffset;
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
} // pawn object

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
        this.el_element.setAttribute("cx", (this.coords.x * scaling) + canvasLeftOffset);
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
} // pawnSpots object

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
} // playfield object



function showError(ErrorMessage)
    {
        alert("Error: " + ErrorMessage);
    }