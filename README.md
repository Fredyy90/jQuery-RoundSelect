[jQuery](http://jquery.com/) - RoundSelect
==================================================

What is it good for:
--------------------------------------

jQuery Round Select help you to integrade a selection of round shapes of an Image inside of your Webapplication.

![Screenshot](https://github.com/Fredyy90/jQuery-RoundSelect/raw/master/screenshot.jpg)

[Demolink](http://www.fredyy.de/git/jQuery-RoundSelect/)


How to use:
--------------------------------------

Integrade the libarys to your code:

```html
<script type="text/javascript" src="js/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="js/jquery.jLog.1.0.min.js"></script>
<script type="text/javascript" src="js/raphael-min.js"></script>
<script type="text/javascript" src="js/jquery.RoundSelect.0.1.js"></script>
```

Create a DIV container, with the image as background:

```css
#holder{
    width:500px;
    height:390px;
    background-color: #eee;
    overflow: auto;
    background-image: url( "test.jpg" );
}
```

```html
<div id="holder"></div>
```

Create the forms field, witch should hold to data of you selected elipse:

```html
<input id="roundselect_cx" name="roundselect_cx" type="text"/>
<input id="roundselect_cy" name="roundselect_cy" type="text"/>
<input id="roundselect_rx" name="roundselect_rx" type="text"/>
<input id="roundselect_ry" name="roundselect_ry" type="text"/>
```

Initialize the Plugin:

```html
<script type="text/javascript">
$(document).ready(function(){
   $('#holder').RoundSelect();
});
</script>
```

Have Fun!


Questions or suggestions?
----------

If you have any questions or suggestions, please feel free to contact me frederick.behrends@gmail.com.
