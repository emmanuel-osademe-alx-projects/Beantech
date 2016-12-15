//initialize app
var beantech = new Framework7({
    //disable cache for development
    cache: true,

    // Default title for modals
    modalTitle: 'Beantech',

    //enable Material theme
    material: true,

    //enable taphold
    tapHold: true,
    tapHoldDelay: 750,
    tapHoldPreventClicks: false,

    // Hide and show indicator during ajax requests
    onAjaxStart: function (xhr) {
        beantech.showIndicator();
    },
    onAjaxComplete: function (xhr) {
      beantech.hideIndicator();
    },

    smartSelectOpenIn:'popup',
});

// Expose Internal DOM library
var $$ = Dom7;

// Add main view
var mainView = beantech.addView('.view-main', {

}); 


localStorage.getItem('Welcome') ?  localStorage.getItem('Welcome') : localStorage.setItem('Welcome',1);
//load into page if user is not opening the app for the first time
if (localStorage.getItem('Welcome') == 2) {
    mainView.router.load({
        url: 'intro.html',
    });
};

// Callbacks for specific pages when its initialized
    beantech.onPageInit('intro', function (page) {
        // Do something here for "intro" page
        if (localStorage.getItem('Welcome') == 1) { 
            beantech.alert("Welcome!");
            localStorage.setItem('Welcome',2);
        }  
    });


/*--/[Begin] TicTacToe game code implementation--*/
    beantech.onPageInit('tictactoe', function (page) {
        //scores in localStorage
        var x_scores = $$('.x-score'); o_scores = $$('.o-score');

        localStorage.getItem('hScore') ?  hScore = localStorage.getItem('hScore') : localStorage.setItem('hScore',0);
        localStorage.getItem('cScore') ?  cScore = localStorage.getItem('cScore') : localStorage.setItem('cScore',0);

        //animate border lines
        $$('.borders').addClass('animated awesome');
        
        /*--/[Begin] Reset button implementation--*/
            $$('.reset .button').on('click', function(){
                mainView.router.refreshPage();
            });
            $$('.reset .button').on('taphold', function(){
                beantech.confirm('Clear game history?', function(){
                    localStorage.setItem('hScore',0);
                    localStorage.setItem('cScore',0);

                    human == "first" ? x_scores.text(0) : o_scores.text(0);
                    ai    == "first" ? x_scores.text(0) : o_scores.text(0);

                    mainView.router.refreshPage();
                });
            });
        /*--/[End] Reset button implementation--*/


        /*--/[Begin] Game level selector implementation--*/
            localStorage.getItem('level') ?  level = localStorage.getItem('level') : level = localStorage.setItem('level','Easy');
            $$('.level').text(level);
            $$('option[value="'+level+'"]').attr('selected', 'selected');
            $$('select[name="game"]').on('change', function(){      
                level = localStorage.setItem('level', $$('.level').text());
                $$('.level').text(level);
                $$('option[value="'+level+'"]').attr('selected', 'selected');
                // mainView.router.load({
                //     url: 'tictactoe.html',
                // });
                mainView.router.refreshPage();

            });
        /*--/[End] Game level selector implementation--*/


        /*--/[Begin] Player button selector implementation--*/  
            var human = 'first';
            var ai    = 'second';
            $$('.x-plays, .o-plays').on('click', function(){
                if (playedCells.length < 1) {
                    $$('.x-plays, .o-plays').removeClass('playing');
                    $$(this).addClass('playing');
                    if($$(this).hasClass('o-plays')){
                        human = 'second';
                        ai = 'first';
                        human == "first" ? x_scores.text(hScore) : o_scores.text(hScore);
                        ai    == "first" ? x_scores.text(cScore) : o_scores.text(cScore);
                        computer(ai,level);
                        $$('.moves').html("<span><b>O</b> Turn</span>");
                    }
                }
            });
            //update score board when player switches between X or O
            human == "first" ? x_scores.text(hScore) : o_scores.text(hScore);
            ai    == "first" ? x_scores.text(cScore) : o_scores.text(cScore);
        /*--/[End] Player button selector implementation--*/


        /*--/[Begin] Global variables/arrays declerations--*/ 
            var winner        = '';
            var playedCells   = [];
            var gamesPlayed   = [];
            var cellRef       = {1:[0,0], 2:[0,1], 3:[0,2], 4:[1,0], 5:[1,1], 6:[1,2], 7:[2,0], 8:[2,1], 9:[2,2]};
            var humanWins     = [['H1', 'H2', 'H3'], ['H4', 'H5', 'H6'], ['H7', 'H8', 'H9'], ['H1', 'H4', 'H7'], ['H2', 'H5', 'H8'], ['H3', 'H6', 'H9'], ['H1', 'H5', 'H9'], ['H3', 'H5', 'H7']];
            var computerWins  = [['C1', 'C2', 'C3'], ['C4', 'C5', 'C6'], ['C7', 'C8', 'C9'], ['C1', 'C4', 'C7'], ['C2', 'C5', 'C8'], ['C3', 'C6', 'C9'], ['C1', 'C5', 'C9'], ['C3', 'C5', 'C7']];
        /*--/[End] Global variables/arrays declerations--*/ 

        
        /*--/[Begin] Player clicks cells implementation--*/ 
            $$('.tile-cells').on('click', function(e){
                var row = $$(this).attr('data-row'), col = $$(this).attr('data-col');
                play(human, row, col, 'H');
            });
        /*--/[End] Player clicks cells implementation--*/ 



        /*--/[Begin] Computer makes game moves implementation--*/
            function computer(ai,level){
                if (level == 'Easy' || level == 'Draw wins [Easy]') {
                    //generate random number
                    com = Math.floor(Math.random()*10);
                    //check if number generated has been played by human
                    if (playedCells.indexOf(com) == -1 && com != 10 && com != 0) {
                        //send row and col numbers to play function
                        //row amd col numbers are gotten from cellRef object...
                        /*---[this comment is not important] uhmmm why didnt i just use id's insted of cellRef obj... hmmmm :)*/
                        play(ai, cellRef[com][0], cellRef[com][1], 'C');
                    }
                    //generate a new number if all the cells have not been played
                    else if(playedCells.length < 9){
                        computer(ai,level);
                    }              
                }
                if (level == 'Medium') { 

                }
                if (level == 'Hard') {
                    // Alabi's code here
                    // Declare your global variables/arrays in Global variables/arrays declerations starting at line 120
                    // Moves played by human and computer are/should be stored in the global array "gamesPlayed"
                    // Possible wining combos for human and computer are stored in the variables humanWins and computerWins
                    // Now generate row and col numbers that will counter player's move and possibly win the player and then
                    // pass that row and col number to the play function like this
                    // play(ai, yourRowNumber, yourColNumber, 'C');
                }
            } 
        /*--/[End] Computer makes game moves implementation--*/



        /*--/[Begin] Function incharge of making moves--*/
            function play(position, row, col, player){
                var tiles = $$(document).add('.tile-cells');
                for (var i = 1; i <= tiles.length; i++) {
                    if ($$(tiles[i]).attr('data-row') == row && $$(tiles[i]).attr('data-col') == col) {
                        if (playedCells.indexOf(i) == -1 && winner == '') { 
                            playedCells.push(i);
                            gamesPlayed.push(player+i);
                            umpire(player, tiles[i], position);
                        }else{
                            console.log('Cell has been played!');
                            return;
                        }
                    }
                }
                if (player == 'H') {
                    computer(ai,level);
                }
                console.log(gamesPlayed);
            }
        /*--/[End] Function incharge of making moves--*/


        /*--/[Begin] Function incharge of assigning wins/draw--*/ 
            function winingStrokes(cells, winingPlayer){
                    //cross off cells 1,5,9 || 3,5,7 for diagonal win
                    if(cells == "H1,H5,H9" || cells == "C1,C5,C9" || cells == "H3,H5,H7" || cells == "C3,C5,C7"){
                        
                        if (cells == "H1,H5,H9" || cells == "C1,C5,C9") {
                            //cross off cells 1,5,9 for diagonal win
                            $$('.diagonal-win, .l-win').css({display: 'block', visibility: 'visible'});
                            //use stroke color as white if winningPlayer is playing with O
                            if (winingPlayer != 'first') {
                                $$('.l-win').css({stroke: '#f2ebd3'});
                            }
                        }else{
                            //cross off cells 3,5,7 for diagonal win
                            $$('.diagonal-win, .r-win').css({display: 'block', visibility: 'visible'});
                            //use stroke color as white if winningPlayer is playing with O
                            if (winingPlayer != 'first') {
                                $$('.r-win').css({stroke: '#f2ebd3'});
                            } 
                        }
                    }

                    //cross off cells 1,4,7 || 2,5,8 || 3,6,9 for vertical win
                    if((cells == "H1,H4,H7" || cells == "C1,C4,C7" || cells == "H2,H5,H8" || cells == "C2,C5,C8" || cells == "H3,H6,H9" || cells == "C3,C6,C9")){
                        //use stroke color as black if winningPlayer is playing with X
                        $$('.v-win, .v-win path').css({display: 'block', visibility: 'visible',left: '45%'});
                        // if cells 2,5,8 move stroke to align
                        if (cells == "H2,H5,H8" || cells == "C2,C5,C8") {
                            $$('.v-win, .v-win path').css({left: '155%'});
                        }
                        if (cells == "H3,H6,H9" || cells == "C3,C6,C9") {
                            $$('.v-win, .v-win path').css({left: '265%'});
                        }
                        //use stroke color as white if winningPlayer is playing with O
                        if (winingPlayer != 'first') {
                            $$('.v-win path').css({stroke: '#f2ebd3'});
                        }          
                    }

                    //cross off cells 1,2,3 || 4,5,6 || 7,8,9 for vertical win
                    if((cells == "H1,H2,H3" || cells == "C1,C2,C3" || cells == "H4,H5,H6" || cells == "C4,C5,C6" || cells == "H7,H8,H9" || cells == "C7,C8,C9")){
                        //use stroke color as black if winningPlayer is playing with X
                        $$('.h-win, .h-win path').css({display: 'block', visibility: 'visible',top: '45%'});
                        // if cells 4,5,6 move stroke to align
                        if (cells == "H4,H5,H6" || cells == "C4,C5,C6") {
                            $$('.h-win, .h-win path').css({top: '155%'});
                        }
                        if (cells == "H7,H8,H9" || cells == "C7,C8,C9") {
                            $$('.h-win, .h-win path').css({top: '265%'});
                        }
                        //use stroke color as white if winningPlayer is playing with O
                        if (winingPlayer != 'first') {
                            $$('.h-win path').css({stroke: '#f2ebd3'});
                        }          
                    }
            }

            function umpire(player, tile, position){
                if(winner == ''){
                    if (position == 'first') {
                        $$(tile).children("svg[class='cell-x']").addClass('animated awesome-x').css({display: 'block', visibility: 'visible'});
                        $$('.moves').html("<span><b>O</b> Turn</span>");
                    }else{
                        $$(tile).children("svg[class='cell-o']").addClass('animated awesome-o').css({display: 'block', visibility: 'visible'});
                        $$('.moves').html("<span><b>X</b> Turn</span>");
                    }
                }

                function check(win){
                    if (gamesPlayed.indexOf(win[0]) != -1 && gamesPlayed.indexOf(win[1]) != -1 && gamesPlayed.indexOf(win[2]) != -1) {
                        return true;
                    }
                }

                if (level == 'Easy' || level == 'Medium' || level == 'Hard'){
                    if(player == 'H'){
                        if(humanWins.filter(check)[0] != undefined){
                            /*--- Strokes for winning indicator -- */
                            winingStrokes((humanWins.filter(check)[0]).toString(), human);
                            beantech.alert('Player wins!');

                            //update human scores in localstorage and score board
                            localStorage.setItem('hScore', ++hScore);
                            (human == "first") ? x_scores.text(hScore) : o_scores.text(hScore);
                            (human == "first") ? $$('.moves').html("<span><b>X</b> Wins</span>") : $$('.moves').html("<span><b>O</b> Wins</span>");
                            winner = 'H';
                            return;
                        }
                    }
                    if(player == 'C'){
                        if(computerWins.filter(check)[0] != undefined){
                            /*--- Strokes for winning indicator -- */
                            winingStrokes((computerWins.filter(check)[0]).toString(), ai);
                            beantech.alert('Computer wins!');

                            //update computer scores in localstorage and score board
                            localStorage.setItem('cScore', ++cScore);
                            (ai == "first") ? x_scores.text(cScore) : o_scores.text(cScore);
                            (ai == "first") ? $$('.moves').html("<span><b>X</b> Wins</span>") : $$('.moves').html("<span><b>O</b> Wins</span>");
                            winner = 'C';
                            return;
                        }
                    }
                    if(gamesPlayed.length >= 9 && winner == ''){
                        beantech.alert('Draw');
                    }
                }
                if (level == 'Draw wins [Easy]' || level == 'Draw wins [Medium]' || level == 'Draw wins [Hard]') {
                    if(player == 'H'){
                        if(humanWins.filter(check)[0] != undefined){
                            beantech.alert('Computer wins! You connected winning cells.');
                            //update computer scores in localstorage and score board
                            localStorage.setItem('cScore', ++cScore);
                            (ai == "first") ? x_scores.text(cScore) : o_scores.text(cScore);
                            (ai == "first") ? $$('.moves').html("<span><b>X</b> Wins</span>") : $$('.moves').html("<span><b>O</b> Wins</span>");
                            winner = 'C';
                            return;
                        }
                    }
                    if(player == 'C'){
                        if(computerWins.filter(check)[0] != undefined){
                            beantech.alert('Computer wins! Computer connected winning cells.');
                            //update computer scores in localstorage and score board
                            localStorage.setItem('cScore', ++cScore);
                            (ai == "first") ? x_scores.text(cScore) : o_scores.text(cScore);
                            (ai == "first") ? $$('.moves').html("<span><b>X</b> Wins</span>") : $$('.moves').html("<span><b>O</b> Wins</span>");
                            winner = 'C';
                            return;
                        }
                    }
                    if(gamesPlayed.length >= 9 && winner == ''){
                        beantech.alert('Player wins! You achieved a draw.');
                        //update human scores in localstorage and score board
                        localStorage.setItem('hScore', ++hScore);
                        (human == "first") ? x_scores.text(hScore) : o_scores.text(hScore);
                        (human == "first") ? $$('.moves').html("<span><b>X</b> Wins</span>") : $$('.moves').html("<span><b>O</b> Wins</span>");
                        winner = 'H';
                        return;
                    }
                }
            }
        /*--/[End] Function incharge of assigning wins/draw--*/ 
    });
/*--/[End] TicTacToe game code implementation--*/ 

