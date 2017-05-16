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
    for(var i=0; i<board.pieces.length; i++){
        pc = board.pieces[i];
        if (pc.idx == idx){break;}
        pc = 0;
    }
    return pc;
}


board = new Board(['p1','p2','p3','p4','p5','p6','p7','p8',''], 3)


  $("#main-tab").on("click", "a", function(e){
      e.preventDefault();
      var $this = $(this).parent();
      $this.addClass("is-active").siblings().removeClass("is-active");
      var div_id = '#'+$this.data("value")
      $(div_id).show().siblings().hide()
  })



function target(e) {

    if (e.key == 'ArrowLeft') {
        swap_pc = find_piece(board.state - 1, board)
        console.log('L', swap_pc);
    }
    if (e.key == 'ArrowRight') {
        swap_pc = find_piece(board.state + 1, board)
        console.log('R', swap_pc);
    }
    if (e.key == 'ArrowUp') {
        swap_pc = find_piece(board.state - board.size, board)
        console.log('U', swap_pc);
    }
    if (e.key == 'ArrowDown') {
        swap_pc = find_piece(board.state + board.size, board)
        console.log('D', swap_pc);
    }
}


$(function() {
    $("#js_board").html( board.render )

    $("img").click(function(){
        var piece = $(this).parent()[0]
        console.log(piece.style )

        piece.style.transform = 'translateY('+(225)+'px)';
        piece.style.transform += 'translateX('+(525)+'px)';

    });

});




$(document).bind('keydown', function(e) {
    target(e);
});




