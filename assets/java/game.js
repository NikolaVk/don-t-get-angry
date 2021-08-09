
let game                = null;
let scaling             = 80;
let pawnPosSize         = 20;
let pawnPosBorder       = 2;
let canvasTopOffset     = 40;
let pawnXoffset         = -42;
let pawnYoffset         = -60;
let pawnScale           = 0.019;
let pawnPosbaseColor    = "white";
let pawnPosColors       = ["rgb(0,0,255)", "rgb(255,0,0)", "rgb(0,255,0)", "rgb(255,255,0)"];
let pawnImages          = ["assets/images/pawn-blue.png", "assets/images/pawn-red.png", "assets/images/pawn-green.png", "assets/images/pawn-yellow.png"];


function loadGame()
{
   el_playfield     = document.getElementById('gamefield_layer');
   el_player        = document.getElementById('player_layer');
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
        this.players             = [];

        this.createGameField     = function()
        {
        this.board.init(this.el_playfield);

        for (let index = 0; index < 4; index++)
        {
            var thePlayer      = new player(index, el_player);
            this.players.push(thePlayer);
            thePlayer.init();
        }
        };



        this.draw               = function()
            {
            this.board.draw(); 
            for (let index = 0; index < 4; index++)
            {
                this.players[index].draw();
            }
               };

    }

function player(playerID, parentElement)
    {
        this.playerindex        = playerID;
        this.el_parent          = parentElement; 
        this.pawns              = [];

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
                var thePawn      = new pawn(this.playerindex, index, el_player);
                this.pawns.push(thePawn);
                thePawn.init();
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
         this.el_parent.appendChild(this.el_element);
     
        };
    this.draw           = function()
    {

        let x = 0;
        let y = 0;

        // position the pawn
        if (this.positionType == 3)
        {
            // home spot
            if (this.playerindex == 0)
            {
            x = parseInt(this.position % 2) * scaling;   
            y = ((10 - parseInt(this.position / 2)) * scaling) + canvasTopOffset;   
            }
            else if (this.playerindex == 1)
            {
            x = parseInt(this.position % 2) * scaling;   
            y = (parseInt(this.position / 2) * scaling) + canvasTopOffset;   
            }
            else if (this.playerindex == 2)
            {
            x = (parseInt(this.position % 2) + 9) * scaling;   
            y = (parseInt(this.position / 2) * scaling) + canvasTopOffset;   
            }
            else if (this.playerindex == 3)
            {
            x = (parseInt(this.position % 2) + 9) * scaling; 
            y = ((10 - parseInt(this.position / 2)) * scaling) + canvasTopOffset;   
            }
        }
        x   += pawnXoffset;
        y   += pawnYoffset;
        this.el_element.setAttribute("transform", "translate(" + x + " " + y + ") scale(" + pawnScale + " " + pawnScale + ")");
   };
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