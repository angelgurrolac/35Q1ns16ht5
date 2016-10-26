$(document).ready(function() {
    	 //Lateral menu
    var isMenuOpen = false;

    $('.menu_btn').click(function()
    {
        if (isMenuOpen == false)
        {
            $("#menu_smartphone").clearQueue().animate({
                left : '0px'
            });
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

//tabs menu
  var regions;
  var atm;


   $("#regions-li").click(function(){
       $regions = $("#regions-li").hasClass("active");


       if ($regions == true) {
           $("#regions-img").removeClass("regions-icon");
           $("#regions-img").addClass("regions-icon2");
           $("#atm-img").removeClass("atm-icon");
           $("#atm-img").addClass("atm-icon2");


       };


   });


    $("#atm-li").click(function(){

       $atm = $("#atm-li").hasClass("active");

       if ($atm == true) {
           $("#regions-img").removeClass("regions-icon2");
           $("#regions-img").addClass("regions-icon");
           $("#atm-img").removeClass("atm-icon2");
           $("#atm-img").addClass("atm-icon");


       };


   });

});
