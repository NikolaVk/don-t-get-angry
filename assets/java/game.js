
let game                = null;



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
        alert("Creating gamefield");
        }

        this.draw               = function()
            {
            this.board.draw(); 
            }

    }


function pawnSpots(spotType, spotPosition, coordX, coordY)
{
    this.type           = spotType;
    this.position       = spotPosition;
    this.coords         = {x: coordX, y: coordY};
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



    for (let index = 0; index < 40; index++)
     {
            let spot        = new pawnSpots(1, index, spotCoords[index][0], spotCoords[index][1]);
            this.circuit_spots.push(spot);
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

    this.dice               = null; 

    this.draw               = function()
    {
        alert("Drawing playfield");


    }
}



function showError(ErrorMessage)
    {
        alert("Error: " + ErrorMessage);
    }