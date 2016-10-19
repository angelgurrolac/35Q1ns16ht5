$(document).ready(function() {
    	 //Lateral menu
    var isMenuOpen = false;
 
    $('.menu_btn').click(function()
    {
        if (isMenuOpen == false)
        {
            $("#menu_smartphone").clearQueue().animate({
                left : '0px' 
            })            
            $("#back").fadeIn('fast');
            $(this).fadeOut(600);
            $(".close").fadeIn(600);
             
            isMenuOpen = true;
        } 
    });     
    $('#back').click(function()
    {
        if (isMenuOpen == true)
        {
            $("#menu_smartphone").clearQueue().animate({
                left : '-1920px'
            })
            $("#page").clearQueue().animate({
                "margin-left" : '0px'
            })            
      $("#back").fadeOut('fast');
            $(this).fadeOut(600);
            $(".menu_btn").fadeIn(600);
             
            isMenuOpen = false;
        }
    });

var filterMethod = "modalBlur";

    $(".modal-fullscreen").on('show.bs.modal', function () {
  setTimeout( function() {
    $(document.body).addClass(filterMethod);
  }, 0);
});
$(".modal-fullscreen").on('hidden.bs.modal', function () {
  $(document.body).removeClass(filterMethod);
});


//Nav.
   $(".nav-tabs a").click(function(){
     $(this).tab('show');
});

   

});

    