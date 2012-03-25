(function($){

$.fn.RoundSelect = function(options){

    this._defaults = {
        r : 100,
        hr : 100,
        vr : 100,
        w : this.width(),
        h : this.height(),
        xi : 250,
        yi : 250,
        paper:0,
        circle:0,
        resize_cor1:0,
        resize_cor2:0,
        resize_cor3:0,
        resize_cor4:0,
        prefix : 'roundselect_',
        drager_colors: ['grey','grey','grey','grey']
        };

      var settings = $.extend({}, this._defaults, options);
      //var settings = $.extend({}, options,this._defaults);

      var element = this;

      //var settings.paper;









      // Creates canvas 320 ? 200 at 10, 50

      settings.paper = Raphael (element.attr('id'), settings.w, settings.h);



      // Creates settings.circle at x = 50, y = 40, with radius 10

      settings.circle = settings.paper.ellipse( settings.xi, settings.yi, settings.hr, settings.vr);

      // Sets the fill attribute of the settings.circle to red (#f00)

      settings.circle.attr("fill", "#AAA");



      // Sets the stroke attribute of the settings.circle to white

      settings.circle.attr("stroke", "#EEE");

      settings.circle.attr({opacity: .3});





      resize_init();

      move_selection( settings.xi - settings.r, settings.yi - settings.r , 'both' );



    //  var rect = settings.paper.rectangle(250, 250, r=100);







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

        settings.circle.attr({opacity: .3});



        // move will be called with dx and dy
        rx = this.attr('rx');
        ry = this.attr('ry');

       if(this.ox + dx < settings.w - rx && this.ox + dx >= rx)
        this.attr({cx: this.ox + dx});

       if(this.oy + dy < settings.h - ry && this.oy + dy >= ry)
        this.attr({cy: this.oy + dy});

        cx = this.attr('cx');
        cy = this.attr('cy');

       move_selection( cx - rx -1, cy - ry -1 , 'both');


/*
       if (this.ox + dx <= settings.w - settings.r &&

           this.oy + dy <= settings.h - settings.r &&

           this.ox + dx >= 0 + settings.r &&

           this.oy + dy >= 0 + settings.r)

       {

            this.attr({cx: this.ox + dx, cy: this.oy + dy});

            move_selection( settings.circle.ox + dx - settings.r -1, settings.circle.oy + dy - settings.r -1  );



       } // else nothing*/

    }



    // ====== D&D FINISH MOVE =====

    function finish_move()

    {

        // restoring state

        this.attr({opacity: .3});
        update_form();

        //this.attr("fill", "#F00");

    };



    // === D&D ===

    settings.circle.drag(move, start_move, finish_move);





    // ===== show rectangular resize box ====

    function resize_init()

    {

      // coprners, for make resize

      settings.resize_cor1 = make_corner( settings.drager_colors['1'] );

      settings.resize_cor2 = make_corner( settings.drager_colors['1'] );

      settings.resize_cor3 = make_corner( settings.drager_colors['1'] );

      settings.resize_cor4 = make_corner( settings.drager_colors['1'] );

    }





    // ===== show resize box ====

    settings.circle.mouseout(function (event) {

        show_resize_rect( 0 )

        //resize.hide();

    /*

        settings.resize_cor1 .attr({opacity: 0});

        settings.resize_cor2 .attr({opacity: 0});

        settings.resize_cor3 .attr({opacity: 0});

        settings.resize_cor4 .attr({opacity: 0});

    */

    });









    // ===== hide resize box ====

    settings.circle.mouseover(function (event) {

      show_resize_rect( 1 )

    /*    settings.resize_cor1 .attr({opacity: 1});

        settings.resize_cor2 .attr({opacity: 1});

        settings.resize_cor3 .attr({opacity: 1});

        settings.resize_cor4 .attr({opacity: 1});

    */

    });





    function show_resize_rect( mode )

    {

      settings.resize_cor1 .attr({opacity: mode});

      settings.resize_cor2 .attr({opacity: mode});

      settings.resize_cor3 .attr({opacity: mode});

      settings.resize_cor4 .attr({opacity: mode});

    }





    // ===== MOVE selection to new coordinates

    function move_selection( x, y , mode)

    {



      rx = settings.circle . attr( "rx" );

      ry = settings.circle . attr( "ry" );

      x = settings.circle . attr( "cx" ) - rx;

      y = settings.circle . attr( "cy" ) - ry;



      if(mode == 'x' || mode == 'both'){
          settings.resize_cor1.attr( "x", x+2*rx-4 );

          settings.resize_cor1.attr( "y", y+ry-2 );


          settings.resize_cor3.attr( "x", x-2 );

          settings.resize_cor3.attr( "y", y+ry-2 );
      }

      if(mode == 'y' || mode == 'both'){
          settings.resize_cor2.attr( "x", x+rx-2 );

          settings.resize_cor2.attr( "y", y-2 );


          settings.resize_cor4.attr( "x", x+rx-2 );

          settings.resize_cor4.attr( "y", y+ry*2-2 );
      }


    }



    function make_corner( color_ )

    {

      resize_cor = settings.paper . rect( 0, 0, 6, 6, 0 ); ;
      resize_cor.attr({opacity: 0});
      resize_cor.attr("fill", color_?color_:"#F00");
      resize_cor.attr("stroke", '#ccc'/*color_?color_:"#F00"*/);
      return resize_cor;

    }





    //==== show resize coursor



    settings.resize_cor1 . mouseover(function(event){

      $( "body" ).css("cursor", "e-resize");
      show_resize_rect( 1 );

    })

    settings.resize_cor2 . mouseover(function(event){

      $( "body" ).css("cursor", "s-resize");
      show_resize_rect( 1 );

    })

    settings.resize_cor3 . mouseover(function(event){

      $( "body" ).css("cursor", "e-resize");
      show_resize_rect( 1 );

    })

    settings.resize_cor4 . mouseover(function(event){

      $( "body" ).css("cursor", "s-resize");
      show_resize_rect( 1 );

    })



    //==== hide resize coursor

    settings.resize_cor1 . mouseout(function(event){

      $( "body" ).css("cursor", "default");

    })

    settings.resize_cor2 . mouseout(function(event){

      $( "body" ).css("cursor", "default");

    })

    settings.resize_cor3 . mouseout(function(event){

      $( "body" ).css("cursor", "default");

    })

    settings.resize_cor4 . mouseout(function(event){

      $( "body" ).css("cursor", "default");

    })





    // ============== DRAG RESIZE FUNCTIONS ===============

    function drager_start_move()

    {

        settings.circle.attr({opacity: .3});
        // storing original coordinates
        this.ox = this.attr("x");
        this.oy = this.attr("y");
        //this.attr({opacity: 1});

    };



    // ==== D&D MOVE ====

    function drager_move_horizontal (dx, dy)

    {

        settings.circle.attr({opacity: .1});

        // move will be called with dx and dy
        // restrict movement of settings.circle to within boundaries
        this.attr({x: this.ox + dx, y: this.oy });
    //    settings.circle.attr({rx: settings.circle.attr("rx") + dx/4  });

        if((settings.resize_cor1.attr("x") + settings.resize_cor3.attr("x")) > 0){
            var newcx = (settings.resize_cor1.attr("x") + settings.resize_cor3.attr("x"));
        }else{
            var newcx = (settings.resize_cor3.attr("x") + settings.resize_cor1.attr("x"));
        }

        if((settings.resize_cor1.attr("x") - settings.resize_cor3.attr("x")) > 0){
            var newrx = (settings.resize_cor1.attr("x") - settings.resize_cor3.attr("x"));
        }else{
            var newrx = (settings.resize_cor3.attr("x") - settings.resize_cor1.attr("x"));
        }

        settings.circle.attr({cx: newcx/2  });

        settings.circle.attr({rx: newrx/2  });

       move_selection( newrx, newcx ,'y');



    }
    function drager_move_vertical (dx, dy)

    {

        settings.circle.attr({opacity: .1});
        // move will be called with dx and dy
        // restrict movement of settings.circle to within boundaries
        this.attr({x: this.ox, y: this.oy + dy});
    //    settings.circle.attr({rx: settings.circle.attr("rx") + dx/4  });

        if((settings.resize_cor2.attr("y") + settings.resize_cor4.attr("y")) > 0){
            var newcy = (settings.resize_cor2.attr("y") + settings.resize_cor4.attr("y"));
        }else{
            var newcy = (settings.resize_cor4.attr("y") + settings.resize_cor2.attr("y"));
        }

        if((settings.resize_cor2.attr("y") - settings.resize_cor4.attr("y")) > 0){
            var newry = (settings.resize_cor2.attr("y") - settings.resize_cor4.attr("y"));
        }else{
            var newry = (settings.resize_cor4.attr("y") - settings.resize_cor2.attr("y"));
        }

        settings.circle.attr({cy: newcy/2  });
        settings.circle.attr({ry: newry/2 });

        move_selection( settings.circle.attr('newcx'), settings.circle.attr('newrx') ,'x');


    }



    // ====== D&D FINISH MOVE =====

    function drager_finish_move()

    {

        // restoring state
        settings.circle.attr({opacity: .3});
        //this.attr("fill", "#F00");
        update_form();

    };

    // ====== UPDATE FORM FIELDS =====

    function update_form()

    {
        var fields = ['cx','cy','ry','rx'];

        for(field in fields){

            if($('#'+settings.prefix+fields[field]).length > 0){
               $('#'+settings.prefix+fields[field]).val(settings.circle.attr(fields[field]));
            }else{
                alert('jQuery RoundSelect: couldn\'t find input filed with id: '+settings.prefix+fields[field]);
            }

        }


    }


    settings.resize_cor1.drag(drager_move_horizontal, drager_start_move, drager_finish_move);
    settings.resize_cor2.drag(drager_move_vertical, drager_start_move, drager_finish_move);
    settings.resize_cor3.drag(drager_move_horizontal, drager_start_move, drager_finish_move);
    settings.resize_cor4.drag(drager_move_vertical, drager_start_move, drager_finish_move);

};

})(jQuery);
