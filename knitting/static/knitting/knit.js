function pattern_text(N, M, increase)
{
    var msg = "<div class='columns is-mobile'> <div class='column is-4'>"
    msg += N + "</div>"
    msg +="<div class='column is-4'> <i class='fa fa-times my-is-centered'></i> </div>"
    msg += "<div class='column is-4'>"
    if (increase)
    {
        if (M>1)
        {
            msg    += (M-1)+' + '
        }
        msg    += '1<i class="fa fa-caret-right my-is-centered"></i>2'
    }else
    {
        if (M>2)
        {
            msg    += (M-2)+' + '
        }
        msg    += '2<i class="fa fa-caret-right my-is-centered"></i>1'
    }
    msg += "</div></div>"
    if (N==0){msg='';}



    return msg;
}

function alter(id, inc )
{
    var element = document.getElementById(id);
    var val     = parseInt(element.value, 10);

    new_val = val + inc

    element.value = Math.floor(new_val)
}

function jCrease()
{
    var from = parseInt(document.getElementById('id_out_from').value, 10);
    var to   = parseInt(document.getElementById('id_out_to').value, 10);

    var N             = Math.abs(from-to);

    var small_pattern = Math.floor(from/N);
    var large_pattern = small_pattern + 1;

    var from_small    = N*small_pattern;
    var N_large       = from - from_small;
    var N_small       = N-N_large;


    if (from==to)
    {
        $("#first-pattern" ).html('');
        $("#first-pattern").css('visibility', 'hidden');
        $("#second-pattern").html('');
        $("#second-pattern").css('visibility', 'hidden');
    }
    else
    {
        $("#first-pattern").css('visibility', 'visible');
        $("#first-pattern" ).html( pattern_text(N_small, small_pattern, to>from) );
        var msg = pattern_text(N_large, large_pattern, to>from);
        if(msg=='')
        {
            $("#second-pattern").css('visibility', 'hidden');
            $("#second-pattern").html( msg );
        }
        else
        {
            $("#second-pattern").css('visibility', 'visible');
            $("#second-pattern").html( msg );
        }
    }
}

function open_help()
{ $('#help').addClass('is-active') ;
  console.log('Open'); 
}

function close_help()
{ $('#help').removeClass('is-active') ;
  console.log('Close'); 
}




class Piece {
    /*
    A js representation of the board-pieces which have an image and a position
    */
    constructor(name, idx){
        this.idx = idx;
        this.id = 'board_pc'+idx;
        if (name) {
            this.img = ' <img src="static/viz/'+name+'.png" height="100%" width="100%"> ';
        } else {
            this.img = '';
        }
    }
}

class Board {
    /*
    A js representation of the board which has an array of pieces and knows how to
    render them in divs

    The board keeps track of the missing pice (this.state)

    Positions of pieces are saved in this.grid and pieces are positioned according
    to their respective indexes on the board:

     piece_pos = board.grid[ piece.idx ]

    */
    constructor(names, size){
        this.pieces = [];
        this.grid = [];
        this.size=size
        var row,col,x,y;
        for (var i=0; i<size*size-1; i++){
            var piece = new Piece(names[i], i)
            this.pieces.push(piece)

            col = i%size;
            row = (i-col)/size;
            x = col/(size)*100+'%'
            y = row/(size)*100+'%'
            this.grid.push( { left:x, top:y } )
        }

        x = (size-1)/(size)*100+'%';
        this.pivot = new Piece('', size*size-1);
        this.pieces.push(this.pivot)
        this.grid.push( { left:x, top:x } )
        this.state = [size*size-1];
    }
    get render() {
        var msg = ''
        for (var i=0; i<this.size*this.size; i++){
            var pc_idx = this.pieces[i].idx;
            msg += '<div id="'+this.pieces[i].id+'" class="jspc" style="left:' + this.grid[pc_idx].left + ';top:' + this.grid[pc_idx].top + ' ">';
            msg += this.pieces[i].img;
            msg += '</div>';
        }
        return msg
    }
}


function find_piece(idx, board){
    /*
    Find the piece on the board which has
    idx == idx
    */
    for(var i=0; i<board.pieces.length; i++){
        pc = board.pieces[i];
        if (pc.idx == idx){break;}
        pc = false;
    }

    return pc;
}

function find_piece_by_id(id, board){
    /*
    Find the piece on the board which has
    idx == idx
    */
    for(var i=0; i<board.pieces.length; i++){
        pc = board.pieces[i];
        if (pc.id == id){break;}
        pc = false;
    }

    return pc;
}

function swap_pieces(delta, board){
    /*
    Move a piece into the 'hole' which is called the pivot.
    */
    // given the current hole-position (state) and a delta (move-left -> delta=-1 , move-down -> delta=board.size)
    swap_pc = find_piece(parseInt(board.state) + parseInt(delta), board);

    // swap will be false if eg hole is on the left and delta is -1 ... meaning that the move is illegal
    if (swap_pc){
        var pivot   = board.pivot;

        // swap and pivot are js class-instances. Now find the div elements
        // in the dom which are their graphical representations
        swap_div  = $( '#'+swap_pc.id );
        pivot_div = $( '#'+pivot.id );

        // animate moving the pieces to their new position
        pivot_div.animate( board.grid[swap_pc.idx] );
        swap_div.animate( board.grid[pivot.idx] );

        // update the state of the board and the index of the pieces
        var new_state = swap_pc.idx;
        swap_pc.idx = pivot.idx;
        pivot.idx   = new_state;
        board.state = new_state;
    }
}


function target(e, board) {
    /*
    React to keyboard input

    Find the piece on the board which has
    idx == idx
    */
    var delta = false;
    if (e.key == 'ArrowLeft') {
        delta = -1;
    }
    if (e.key == 'ArrowRight') {
        delta = 1;
    }
    if (e.key == 'ArrowUp') {
        delta = -board.size;
    }
    if (e.key == 'ArrowDown') {
        delta = board.size
    }

    // abort if hole is left/right and requested move is left/right
    var abort;
    if ( board.state%board.size == 0  && delta == -1 ){  abort=true;}
    if ( board.state%board.size == board.size-1  && delta == 1 ){  abort=true;}

    // swap_pieces will return false if hole is up/down and requested move is up/down
    if (delta && !abort) { 
        swap_pieces(delta, board);
    }
}


// instantiate board. Strings should point to actual images... eg. p1.png
board = new Board(['p1','p2','p3','p4','p5','p6','p7','p8','p2','p3','p4','p5','p6','p7','p8'], 4)





$( document ).ready(function() {

    document.getElementById('more-from').onclick = function() {
        alter('id_out_from', 1);
        jCrease();
    }
    document.getElementById('more-to').onclick = function() {
        alter('id_out_to', 1);
        jCrease();
    }
    document.getElementById('much-more-to').onclick = function() {
        alter('id_out_to', 10);
        jCrease();
    }
    document.getElementById('much-more-from').onclick = function() {
        alter('id_out_from', 10);
        jCrease();
    }
    document.getElementById('less-from').onclick = function() {
        alter('id_out_from', -1);
        jCrease();
    }
    document.getElementById('less-to').onclick = function() {
        alter('id_out_to', -1);
        jCrease();
    }
    document.getElementById('much-less-to').onclick = function() {
        alter('id_out_to', -10);
        jCrease();
    }
    document.getElementById('much-less-from').onclick = function() {
        alter('id_out_from', -10);
        jCrease();
    }


    document.getElementById('multiply-from').onclick = function() {
        alter('id_out_from', 50);
        jCrease();
    }
    document.getElementById('divide-from').onclick = function() {
        alter('id_out_from', -50);
        jCrease();
    }
    document.getElementById('multiply-to').onclick = function() {
        alter('id_out_to', 50);
        jCrease();
    }
    document.getElementById('divide-to').onclick = function() {
        alter('id_out_to', -50);
        jCrease();
    }





    $("#js_board").html( board.render );
    // this seems like the most elegant place to set the style of the pivot
    $('#board_pc8').addClass('is-info');

    // does not do anything right now...
    $("img").click(function(){
        var piece_div = $(this).parent()[0];
        var piece = find_piece_by_id(piece_div.id, board);
        var delta = piece.idx - board.pivot.idx;

        if ( delta == -1 || delta == 1 || delta == board.size || delta == -board.size ){ 
            var abort;
            if ( board.state%board.size == 0  && delta == -1 ){  abort=true;}
            if ( board.state%board.size == board.size-1  && delta == 1 ){  abort=true;}

            // swap_pieces will return false if hole is up/down and requested move is up/down
            if (!abort) { 
                swap_pieces(delta, board);
            }
        }
    });

    $(document).bind('keydown', function(e) {
        target(e, board);
    });






    $("#main-tab").on("click", "a", function(e){
        e.preventDefault();
        var $this = $(this).parent();
        console.log(e)
        $this.addClass("is-active").siblings().removeClass("is-active");
        var div_id = '#'+$this.data("value")
        $(div_id).show().siblings().hide()
    })


    document.getElementById('open-help').onclick = function()
        {
            console.log('help!') ;
            $('#help').addClass('is-active') ;
        }




    jCrease()


});
