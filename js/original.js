

$(document).ready(function(){



  var r = 100; // selected radius



  var hr = r;

  var vr = r;







  // Creates canvas 320 ? 200 at 10, 50

  var paper = Raphael ( "holder", w=500, h=390);



  // Creates circle at x = 50, y = 40, with radius 10

  var circle = paper.ellipse( xi =250, yi=250, hr, vr);

  // Sets the fill attribute of the circle to red (#f00)

  circle.attr("fill", "#AAA");



  // Sets the stroke attribute of the circle to white

  circle.attr("stroke", "#EEE");

  circle.attr({opacity: .3});





  resize_init();

  move_selection( xi-r,yi-r );



//  var rect = paper.rectangle(250, 250, r=100);







// ==== D&D START MOVING ====

function start_move()

{

    // storing original coordinates

    this.ox = this.attr("cx");

    this.oy = this.attr("cy");



    //this.attr({opacity: 1});

};



// ==== D&D MOVE ====

function move (dx, dy)

{

    circle.attr({opacity: .3});



    // move will be called with dx and dy

    // restrict movement of circle to within boundaries

   if (this.ox + dx <= w - r &&

       this.oy + dy <= h - r &&

       this.ox + dx >= 0 + r &&

       this.oy + dy >= 0 + r)

   {

        this.attr({cx: this.ox + dx, cy: this.oy + dy});

        move_selection( circle.ox + dx - r -1, circle.oy + dy - r -1  );



   } // else nothing

}



// ====== D&D FINISH MOVE =====

function finish_move()

{

    // restoring state

    this.attr({opacity: .3});

    //this.attr("fill", "#F00");

};



// === D&D ===

circle.drag(move, start_move, finish_move);





// ===== show rectangular resize box ====

function resize_init()

{

  // coprners, for make resize

  resize_cor1 = make_corner( "yellow" );

  resize_cor2 = make_corner( "red" );

  resize_cor3 = make_corner( "white" );

  resize_cor4 = make_corner( "blue" );

}





// ===== show resize box ====

circle.mouseout(function (event) {

    show_resize_rect( 0 )

    //resize.hide();

/*

    resize_cor1 .attr({opacity: 0});

    resize_cor2 .attr({opacity: 0});

    resize_cor3 .attr({opacity: 0});

    resize_cor4 .attr({opacity: 0});

*/

});









// ===== hide resize box ====

circle.mouseover(function (event) {

  show_resize_rect( 1 )

/*    resize_cor1 .attr({opacity: 1});

    resize_cor2 .attr({opacity: 1});

    resize_cor3 .attr({opacity: 1});

    resize_cor4 .attr({opacity: 1});

*/

});





function show_resize_rect( mode )

{

  resize_cor1 .attr({opacity: mode});

  resize_cor2 .attr({opacity: mode});

  resize_cor3 .attr({opacity: mode});

  resize_cor4 .attr({opacity: mode});

}





// ===== MOVE selection to new coordinates

function move_selection( x, y )

{



  rx = circle . attr( "rx" );

  ry = circle . attr( "ry" );

  x = circle . attr( "cx" ) - rx;

  y = circle . attr( "cy" ) - ry;





  resize_cor1.attr( "x", x+2*rx-4 );

  resize_cor1.attr( "y", y+ry-2 );



  resize_cor2.attr( "x", x+rx-2 );

  resize_cor2.attr( "y", y-2 );



  resize_cor3.attr( "x", x-2 );

  resize_cor3.attr( "y", y+ry-2 );



  resize_cor4.attr( "x", x+rx-2 );

  resize_cor4.attr( "y", y+ry*2-2 );



}



function make_corner( color_ )

{

  resize_cor = paper . rect( 0, 0, 6, 6, 0 ); ;
  resize_cor.attr({opacity: 0});
  resize_cor.attr("fill", color_?color_:"#F00");
  resize_cor.attr("stroke", '#ccc'/*color_?color_:"#F00"*/);
  return resize_cor;

}





//==== show resize coursor



resize_cor1 . mouseover(function(event){

  $( "body" ).css("cursor", "e-resize");
  $.log( "in" );
  show_resize_rect( 1 );

})

resize_cor2 . mouseover(function(event){

  $( "body" ).css("cursor", "s-resize");
  $.log( "in" );
  show_resize_rect( 1 );

})

resize_cor3 . mouseover(function(event){

  $( "body" ).css("cursor", "e-resize");
  $.log( "in" );
  show_resize_rect( 1 );

})

resize_cor4 . mouseover(function(event){

  $( "body" ).css("cursor", "s-resize");
  $.log( "in" );
  show_resize_rect( 1 );

})



//==== hide resize coursor

resize_cor1 . mouseout(function(event){

  $( "body" ).css("cursor", "default");
  $.log( "out" );

})

resize_cor2 . mouseout(function(event){

  $( "body" ).css("cursor", "default");
  $.log( "out" );

})

resize_cor3 . mouseout(function(event){

  $( "body" ).css("cursor", "default");
  $.log( "out" );

})

resize_cor4 . mouseout(function(event){

  $( "body" ).css("cursor", "default");
  $.log( "out" );

})





// ============== DRAG RESIZE FUNCTIONS ===============

function drager_start_move()

{

    circle.attr({opacity: .3});
    // storing original coordinates
    this.ox = this.attr("x");
    this.oy = this.attr("y");
    //this.attr({opacity: 1});

};



// ==== D&D MOVE ====

function drager_move_horizontal (dx, dy)

{

    circle.attr({opacity: .1});

    // move will be called with dx and dy
    // restrict movement of circle to within boundaries
    this.attr({x: this.ox + dx, y: this.oy });
//    circle.attr({rx: circle.attr("rx") + dx/4  });

    if((resize_cor1.attr("x") + resize_cor3.attr("x")) > 0){
        var newcx = (resize_cor1.attr("x") + resize_cor3.attr("x"));
    }else{
        var newcx = (resize_cor3.attr("x") + resize_cor1.attr("x"));
    }

    if((resize_cor1.attr("x") - resize_cor3.attr("x")) > 0){
        var newrx = (resize_cor1.attr("x") - resize_cor3.attr("x"));
    }else{
        var newrx = (resize_cor3.attr("x") - resize_cor1.attr("x"));
    }

    circle.attr({cx: newcx/2  });

    circle.attr({rx: newrx/2  });



}
function drager_move_vertical (dx, dy)

{

    circle.attr({opacity: .1});
    // move will be called with dx and dy
    // restrict movement of circle to within boundaries
    this.attr({x: this.ox, y: this.oy + dy});
//    circle.attr({rx: circle.attr("rx") + dx/4  });

    if((resize_cor2.attr("y") + resize_cor4.attr("y")) > 0){
        var newcy = (resize_cor2.attr("y") + resize_cor4.attr("y"));
    }else{
        var newcy = (resize_cor4.attr("y") + resize_cor2.attr("y"));
    }

    if((resize_cor2.attr("y") - resize_cor4.attr("y")) > 0){
        var newry = (resize_cor2.attr("y") - resize_cor4.attr("y"));
    }else{
        var newry = (resize_cor4.attr("y") - resize_cor2.attr("y"));
    }

    circle.attr({cy: newcy/2  });
    circle.attr({ry: newry/2 });



}



// ====== D&D FINISH MOVE =====

function drager_finish_move()

{

    // restoring state
    circle.attr({opacity: .3});
    //this.attr("fill", "#F00");

};


resize_cor1.drag(drager_move_horizontal, drager_start_move, drager_finish_move);
resize_cor2.drag(drager_move_vertical, drager_start_move, drager_finish_move);
resize_cor3.drag(drager_move_horizontal, drager_start_move, drager_finish_move);
resize_cor4.drag(drager_move_vertical, drager_start_move, drager_finish_move);









});