
var state = [ [1,2,3],
              [4,5,6],
              [7,8,'']];
var pos = [2,2]


  $("#main-tab").on("click", "a", function(e){
      e.preventDefault();
      var $this = $(this).parent();
      $this.addClass("is-active").siblings().removeClass("is-active");
      var div_id = '#'+$this.data("value")
      $(div_id).show().siblings().hide()
  })


function row(idx) {
    var s = "<div class='columns board'>";
    for (i=0; i<3; i++){
        if (state[idx][i] == ''){
            s += "<div class='column is-error piece'> <p>"
        } else {
            s += "<div class='column is-info piece'> <p>"
        }
        s += state[idx][i]
        s += "</p></div>";
    }
    s += "</div>"
    return s;
}

function board() {
    var s = "<div class='board'>"
    for (r=0; r<3; r++){
        s += row(r);
    }
    s += '</div>'
    return s;
}

function target(e) {
    var to   = pos.slice();

    if (e.key == 'ArrowLeft') {
        console.log('L');
        to[1] -= 1
    }
    if (e.key == 'ArrowRight') {
        console.log('R');
        to[1] += 1
    }
    if (e.key == 'ArrowUp') {
        console.log('U');
        to[0] -= 1
    }
    if (e.key == 'ArrowDown') {
        console.log('D');
        to[0] += 1
    }

    to[0] = Math.max(0, to[0])
    to[0] = Math.min(2, to[0])
    to[1] = Math.max(0, to[1])
    to[1] = Math.min(2, to[1])

    return to
}

$(function() {
    $("#app").html( board() )
});




$(document).bind('keydown', function(e) {
    var from = pos.slice();
    var to   = target(e);

    var val = state[ parseInt(to[0]) ][ parseInt(to[1]) ]

    state[ parseInt(from[0]) ][ parseInt(from[1]) ] = val
    state[ parseInt(to[0]) ][ parseInt(to[1]) ] = ''

    $("#app").html( board() )

    pos = to.slice()

});




