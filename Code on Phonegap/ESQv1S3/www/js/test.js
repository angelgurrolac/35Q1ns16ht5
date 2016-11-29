 var brick;
    brick = "<div class='brick small'><div class='delete'>&times;</div></div>";

 $(function() {

   /*var sso = {
    enableDrag: false
  };

  var ss = $(".gridly").shapeshift(sso);*/

   $('.gridly').gridly('draggable', 'off');

   if ($(window).width() <= 736) {
     $('.gridly').gridly({
         //base: 40, // px
         gutter: 1, // px
         columns: 4
     });
   }
   else if ($(window).width() >= 738 && $(window).width() < 1024) {
       $('.gridly').gridly({
           gutter: 5, // px
           columns: 16
       });
     }
     else if ($(window).width() == 1024) {
         $('.gridly').gridly({
             //base: 40, // px
             gutter: 5, // px
             columns: 16
         });
       }

$(".gridly").on("press",function(){
  $(".gridly > div").css("box-shadow", "0px 0px 25px rgb(204, 204, 204)");
  $(".gridly").gridly('draggable', 'on');
  $(".btn-circle").css("display", "block");
});


 $(document).on("click", ".gridly .delete", function(event) {
      var $this;
      event.preventDefault();
      event.stopPropagation();
      $this = $(this);
      $this.closest('.brick').remove();
      return $('.gridly').gridly('layout');
    });


    $(document).on("click", "#disable", function(event) {
      event.preventDefault();
      event.stopPropagation();
      //$('.gridly').append(brick);
      //return $('.gridly').gridly();
      $(".gridly > div").css("box-shadow", "");
      $('.gridly').gridly('draggable', 'off');
      $(this).css("display", "none");

//Positions
      setTimeout(function() {
      for (var i = $(".gridly > div").length - 1; i >= 0; i--) {
          var style = $(".gridly > div:nth-child("+(i + 1)+")").attr("id");
          console.log(style);
          console.log($("#" + style).css("top"));
          console.log($("#" + style).css("left"));
      }
    },
    1000);

    });

});
