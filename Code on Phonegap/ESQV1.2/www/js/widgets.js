$(document).ready(function() {
  //Lateral menu
  var isMenuOpen = false;

  $('.menu_btn').click(function()
  {
    if (isMenuOpen === false)
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
    if (isMenuOpen === true)
    {
      $("#menu_smartphone").clearQueue().animate({
        left : '-1920px'
      });
      $("#page").clearQueue().animate({
        "margin-left" : '0px'
      });
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


 if ($regions === true) {
   $("#regions-img").removeClass("regions-icon");
   $("#regions-img").addClass("regions-icon2");
   $("#atm-img").removeClass("atm-icon");
   $("#atm-img").addClass("atm-icon2");

 }
});


$("#atm-li").click(function(){

 $atm = $("#atm-li").hasClass("active");

 if ($atm === true) {
   $("#regions-img").removeClass("regions-icon2");
   $("#regions-img").addClass("regions-icon");
   $("#atm-img").removeClass("atm-icon2");
   $("#atm-img").addClass("atm-icon");
 }
});


$.ajax({
  type: "get",
  url: "js/preferences.json",
  dataType: "json",success: function (data) {
for(var i=0, t=localStorage.length; i < t; i++) {

      $(data).each(function (index, data) {$('.widgets').html(
        "<div id="+data.widgets.working.id+" class='vertical col-lg-4 col-md-6 col-sm-6 col-xs-12 "+data.widgets.working.name+" 'style='position: relative; '>"+
        "<div class='left'>"+
        "<div id='radialChart' onload='RadialWorking()'></div>"+
        "</div>"+
        "<div class='right'>"+
        "<h1 class='title-widgets' align='center'>WORKING</h1>"+
        "<a href='notification-settings.html'><span class='notification-config'></span></a>"+
        "<br>"+
        "<br>"+
        "<a href='trends.html'><span class='tendency-icon'></span></a>"+
        "</div>"+
        "<script>"+
        "RadialWorking();"+
        "</script>"+
        "</div>"+

        "<div id="+data.widgets.transactions.id+" class='complete col-lg-4 col-md-6 col-sm-6 col-xs-12 "+data.widgets.transactions.name+" ' style='position: relative; '>"+
        "<h1 class='title-widgets'>TRANSACTIONS</h1>"+
        "<a href='#'><span class='notification-config'></span></a>"+
        "<br>"+
        "<br>"+
        "<a href='trends_transactions.html'><span class='tendency-icon'></span></a>"+
        "</div>"+

        "<div id="+data.widgets.approvedTransactions.id+" class='horizontal col-lg-4 col-md-6 col-sm-6 col-xs-12 "+data.widgets.approvedTransactions.name+"' style='position: relative; '>"+
        "<div class='up'>"+
        "<h1 class='title-widgets'>APPROVED TRANSACTIONS</h1>"+
        "<a href='#'><span class='notification-config'></span></a>"+
        "<div id='approtran' onload='approtranChart()'></div>"+
        "</div>"+
        "<div class='bottom'>"+
        "<a href='trends_approved.html'><span class='tendency-icon'></span></a>"+
        "</div>"+
        "<script>"+
        "approtranChart();"+
        "</script>"+
        "</div>"+

        "<div id="+data.widgets.origin.id+" class='vertical col-lg-4 col-md-6 col-sm-6 col-xs-12 "+data.widgets.origin.name+"' style='position: relative; '>"+
        "<h1 class='title-widgets'>ORIGIN</h1>"+
        "<div id='verticalChart' onload='originChart()' class='left'></div>"+
        "<div class='right'>"+
        "<a href='#'><span class='notification-config'></span></a>"+
        "<br>"+
        "<br>"+
        "<a href='trends_origin.html'><span class='tendency-icon'></span></a>"+
        "</div>"+
        "<script>"+
        "originChart();"+
        "</script>"+
        "</div>"+

        "<div id="+data.widgets.criticalFailures.id+" class='complete col-lg-4 col-md-6 col-sm-6 col-xs-12 "+data.widgets.criticalFailures.name+"' style='position: relative;'>"+
        "<h1 class='title-widgets'>CRITICAL FAILURES</h1>"+
        "<a href='notifications-settings-cf.html'><span class='notification-config'></span></a>"+
        "</div>"+

        "<div id="+data.widgets.disposalsAvailable.id+" class='complete col-lg-4 col-md-6 col-sm-6 col-xs-12 "+data.widgets.disposalsAvailable.name+"' style='position: relative;'>"+
        "<ul class='nav nav-tabs'>"+
        "<li class='active'><a class='widget-nav title-widgets' href='#disposals' data-toggle='tab'>DISPOSALS</a></li>"+
        "<li><a class='widget-nav title-widgets' href='#available' data-toggle='tab'>AVAILABLE</a></li>"+
        "</ul>"+
        "<div class='tab-content'>"+
        "<div id='disposals' class='tab-pane fade in active'>"+
        "<p>Information Disposals</p>"+
        "<a href='#'><span class='notification-config'></span></a>"+
        "<br>"+
        "<br>"+
        "<a href='trends_Disposals.html'><span class='tendency-icon'></span></a>"+
        "</div>"+
        "<div id='available' class='tab-pane fade'>"+
        "<p>Information Available</p>"+
        "<a href='notifications-settings-cf.html'><span class='notification-config'></span></a>"+
        "<br>"+
        "<br>"+
        "<a href='trends_available.html'><span class='tendency-icon'></span></a>"+
        "</div>"+
        "</div>"+
        "</div>"+

        "<div id="+data.widgets.transactionsSecond.id+" class='complete col-lg-4 col-md-6 col-sm-6 col-xs-12 "+data.widgets.transactionsSecond.name+"' style='position: relative;'>"+
        "<h1 class='title-widgets'>TRANSACTIONS PER SECOND</h1>"+
        "<a href='#'><span class='notification-config'></span></a>"+
        "<br>"+
        "<br>"+
        "<a href='trends_transactionsSecond.html'><span class='tendency-icon'></span></a>"+
        "</div>"+

        "<div id="+data.widgets.responseTime.id+" class='vertical col-lg-4 col-md-6 col-sm-6 col-xs-12 "+data.widgets.responseTime.name+"' style='position: relative;'>"+
        "<h1 class='title-widgets'>RESPONSE TIME</h1>"+
        "<div id='BarChartVSeg' class='left' onload='responseChart()'></div>"+
        "<div class='right'>"+
        "<a href='#'><span class='notification-config'></span></a>"+
        "<br>"+
        "<br>"+
        "<a href='trends_responseTime.html'><span class='tendency-icon'></span></a>"+
        "</div>"+
        "<script>"+
        "responseChart();"+
        "</script>"+
        "</div>"+

        "<div id="+data.widgets.slaViolation.id+" class='vertical col-lg-4 col-md-6 col-sm-6 col-xs-12 "+data.widgets.slaViolation.name+"' style='position: relative;'>"+
        "<h1 class='title-widgets'>SLA VIOLATION</h1>"+
        "<div class='left'></div>"+
        "<div class='right'>"+
        "<a href='#'><span class='notification-config'></span></a>"+
        "<br>"+
        "<br>"+
        "<a href='trends_SlaViolation.html'><span class='tendency-icon'></span></a>"+
        "<ion-content overflow-scroll='true'>"+
        "<iframe id='SlaViol' class='embed-responsive-item' src='RadialChartSLAVIOLATION/index.html' frameborder='0' scrolling='no' width='100%'></iframe>"+
        "</ion-content>"+
        "</div>"+
        "</div>"+

        "<div id="+data.widgets.networkAvailability.id+" class='horizontal col-lg-4 col-md-6 col-sm-6 col-xs-12 "+data.widgets.networkAvailability.name+"' style='position: relative;'>"+
        "<h1 class='title-widgets'>NETWORK AVAILABILITY</h1>"+
        "<div class='up'>"+
        "<a href='#'><span class='notification-config'></span></a>"+
        "<div id='NetAva' onload='netavaChart()'></div>"+
        "</div>"+
        "<div class='bottom'>"+
        "<a href='trends_NAvailability.html'><span class='tendency-icon'></span></a>"+
        "</div>"+
        "<script>"+
        "netavaChart();"+
        "</script>"+
        "</div>"
);//Html
}); //each

   key = localStorage.key(i);
   $("#"+data.widgets.working.id+"").addClass(""+localStorage[data.widgets.working.id]+"");
   $("#"+data.widgets.transactions.id+"").addClass(""+localStorage[data.widgets.transactions.id]+"");
   $("#"+data.widgets.approvedTransactions.id+"").addClass(""+localStorage[data.widgets.approvedTransactions.id]+"");
   $("#"+data.widgets.origin.id+"").addClass(""+localStorage[data.widgets.origin.id]+"");
   $("#"+data.widgets.criticalFailures.id+"").addClass(""+localStorage[data.widgets.criticalFailures.id]+"");
   $("#"+data.widgets.disposalsAvailable.id+"").addClass(""+localStorage[data.widgets.disposalsAvailable.id]+"");
   $("#"+data.widgets.transactionsSecond.id+"").addClass(""+localStorage[data.widgets.transactionsSecond.id]+"");
   $("#"+data.widgets.responseTime.id+"").addClass(""+localStorage[data.widgets.responseTime.id]+"");
   $("#"+data.widgets.slaViolation.id+"").addClass(""+localStorage[data.widgets.slaViolation.id]+"");
   $("#"+data.widgets.networkAvailability .id+"").addClass(""+localStorage[data.widgets.networkAvailability.id]+"");
   // console.log('Para la clave ' + key + ' el valor es: ' + localStorage[key]);
   
}

} //DataType

});//Ajax end




}); //End
