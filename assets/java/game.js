
let game                = null;



function loadGame()
{
   el_playfield     = document.getElementById('gamefield');
   el_player        = document.getElementById('player');
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

}

function theGame(playfieldLayer, playerLayer, popupLayer)
    {


        this.el_playfield        = playfieldLayer;
        this.el_player           = playerLayer;
        this.el_popup            = popupLayer;
        this.createGameField     = function()
        {
        alert("Creating gamefield");
        }

    }


function pawnSpots(spotType, spotPosition)
{
    this.type           = SpotType;
    this.position       = spotPosition;
}

function board()
{

    let spotCoords       = [[100, 50], 
                            [120, 50]];

    this.circuit_spots      = new [];
    this.home_spots         = new [];
    this.start_spots        = new [];



    for (let index = 0; index < 40; index++)
     {
            let spot        = new pawnSpots(1, index);
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
}



function showError(ErrorMessage)
    {
        alert("Error: " + ErrorMessage);
    }