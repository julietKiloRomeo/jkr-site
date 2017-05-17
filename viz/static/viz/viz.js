class Piece {
    /*
    A js representation of the board-pieces which have an image and a position
    */
    constructor(name, x, y, idx){
        this.x = x;
        this.y = y;
        this.idx = idx
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
    */
    constructor(names, size){
        this.pieces = [];
        this.size=size
        var row,col,x,y;
        for (var i=0; i<size*size; i++){
            col = i%size;
            row = (i-col)/size;
            x = col/(size)*100+'%'
            y = row/(size)*100+'%'
            var piece = new Piece(names[i], x, y, i)
            this.pieces.push(piece)
        }
        this.state = [size*size-1]
    }
    get render() {
        var msg = ''
        for (var i=0; i<this.size*this.size; i++){
            msg += '<div id="bpc'+i+'" class="jspc" style="left:' + this.pieces[i].x + ';top:' + this.pieces[i].y + ' ">';
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

function swap_pieces(delta, board){
    swap_pc = find_piece(parseInt(board.state) + parseInt(delta), board);

    if (swap_pc){
        pivot   = board.pieces[board.state];

        swap_div  = $( '#bpc'+swap_pc.idx );
        pivot_div = $( '#bpc'+pivot.idx );

        swap_pos  = swap_div.position();
        pivot_pos  = swap_div.position();

        console.log(swap_pos, 'swap');
        console.log(pivot_pos, 'pivot');

        // swap_div.transform({ top: pivot_pos.top, left: pivot_pos.left });
        // pivot_div.transform({ top: swap_pos.top, left: swap_pos.left });

        swap_div.css( 'top', ''+pivot.y, 'left', ''+pivot.x);
        pivot_div.css( 'top', ''+swap_pc.y, 'left', ''+swap_pc.x);

        var new_state = swap_pc.idx;
        swap_pc.idx = pivot.idx;
        pivot.idx   = new_state;
        board.state = new_state;

        console.log(swap_pc);
        console.log(pivot);
        console.log(board.state);

    }
    
}


function target(e, board) {
    /*
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
    if (delta) { 
        swap_pieces(delta, board);
    }
}



board = new Board(['p1','p2','p3','p4','p5','p6','p7','p8',''], 3)


// on load

$(function() {
    $("#js_board").html( board.render );

    $('#bpc8').addClass('is-info');

    $("img").click(function(){
        var piece = $(this).parent()[0]
        console.log(piece.style )
    });

});


// callbacks

$("#main-tab").on("click", "a", function(e){
    e.preventDefault();
    var $this = $(this).parent();
    $this.addClass("is-active").siblings().removeClass("is-active");
    var div_id = '#'+$this.data("value")
    $(div_id).show().siblings().hide()
})


$(document).bind('keydown', function(e) {
    target(e, board);
});




