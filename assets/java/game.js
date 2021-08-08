
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



function showError(ErrorMessage)
    {
        alert("Error: " + ErrorMessage);
    }