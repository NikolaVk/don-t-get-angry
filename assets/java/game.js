

let el_playfield        = null;
let el_player           = null;
let el_popup            = null;



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

   el_playfield.innerHTML         = "We have a playfield element";

}


function showError(ErrorMessage)
    {
        alert("Error: " + ErrorMessage);
    }