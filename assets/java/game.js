
let game                = null;
let scaling             = 80;
let pawnPosSize         = 20;
let pawnPosBorder       = 2;
let pawnPosbaseColor    = "white";
let pawnPosColors       = ["rgb(255,0,0)", "rgb(0,255,0)", "rgb(0,0,255)", "rgb(255,255,0)"];



function loadGame()
{
   el_playfield     = document.getElementById('gamefield_canvas');
   el_player        = document.getElementById('player_canvas');
   el_popup         = document.getElementById('menu');
   if ((el_playfield == null) || (el_player == null) || (el_popup == null))
   {
       showError("Internal error");
       return false;
   }

   game         = new theGame(el_playfield, el_player, el_popup);
   if (game == null)
   {
       showError("Internal error");
       return false;
   }
   game.createGameField();
   game.draw();

}

function theGame(playfieldLayer, playerLayer, popupLayer)
    {


        this.el_playfield        = playfieldLayer;
        this.el_player           = playerLayer;
        this.el_popup            = popupLayer;
        this.board               = new playfield(playfieldLayer);
        this.createGameField     = function()
        {
        this.board.init(this.el_playfield);
        };



        this.draw               = function()
            {
            this.board.draw(); 
            };

    }


function pawnSpots(spotType, spotIndex, parentElement, coordX, coordY)
{
    this.type           = spotType;
    this.index          = spotIndex;
    this.coords         = {x: coordX, y: coordY};
    if ((spotIndex % 10) != 0)
        {
         this.color          = pawnPosbaseColor;
        }
    else 
        {
         this.color          = pawnPosColors[parseInt(spotIndex / 10)];
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
        this.el_element.setAttribute("cy", (10 - this.coords.y) * scaling);
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
            let spot        = new pawnSpots(2, index);
            this.home_spots.push(spot);
            }
        for (let index = 0; index < 16; index++)
            {
            let spot        = new pawnSpots(3, index);
            this.start_spots.push(spot);
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