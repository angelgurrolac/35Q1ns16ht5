$(document).ready(function() {
  
//Working
var Active, Inactive, TotalATM;
//Transactions
var TotalTransactions=0, AvgTransactions;
//Approved transactions
var Approved, Denied;
//Response Time
var Average, Interchange;
//Origin
var SameBank, OtherIssuer, DifferentATM;
//Critical Failures
var COne, Ctwo, CThree, CFour, CFive;
/*Disposals-Available*/
var Dis=[] , Ava=[], Instances=[];
//Transactions per Second
var TransactionsSecond;
//SLA-Violation
var breached, TotalSla;
//Network Availability
var currentMonth, lastMonth;

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

//Menu Info
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

//Data Widgets

$.ajax({
type: "get",
url: "js/DataAPIResponse.json",
dataType:"json",
success: function(data) {

//Number Format function
function SeparateNumber(val){
  while (/(\d+)(\d{3})/.test(val.toString())){
   val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
  }
    return val;
  }

//Working
Active=data.kpis["sstob.atms"].data[0].values[0].data[0][1];
Inactive=data.kpis["sstob.atms"].data[0].values[0].data[0][2];
TotalATM=data.kpis["sstob.atms"].data[0].values[0].data[0][3];
Active=SeparateNumber(Active);
Inactive=SeparateNumber(Inactive);
TotalATM=SeparateNumber(TotalATM);

//Transactions
for (var j = 0; j <= data.kpis["atmta.transactions"].data[0].values[0].data.length-1; j++){
  TotalTransactions+=data.kpis["atmta.transactions"].data[0].values[0].data[j][1];
  TotalTransactions=SeparateNumber(TotalTransactions);
}
//Transactions per Second
TransactionsSecond=data.kpis["atmta.transactions"].data[0].values[0].data[0][1];
//Approved Transactions
Approved=data.kpis["atmta.transactions"].data[0].values[0].data[0][2];
Denied=data.kpis["atmta.transactions"].data[0].values[0].data[0][3];
Approved=SeparateNumber(Approved);
Denied=SeparateNumber(Denied);
//Response Time
Average=data.kpis["atmta.transactions"].data[0].values[0].data[0][4]/300;
Interchange=data.kpis["atmta.transactions"].data[0].values[0].data[0][5]/300;
//Origin
SameBank=data.kpis["atmta.transactions"].data[0].values[0].data[0][1];
OtherIssuer=data.kpis["atmta.transactions"].data[1].values[0].data[0][1];
DifferentATM=OtherIssuer-SameBank;
SameBank=SeparateNumber(SameBank);
OtherIssuer=SeparateNumber(OtherIssuer);
DifferentATM=SeparateNumber(DifferentATM);

//Critical Failures
var CriticalFailures=[];
CriticalFailures[0]=data.kpis["sstob.atmfaults"].data[0].values[0].data[0][1];
CriticalFailures[0]+=" OUT OF SERVICE";
CriticalFailures[1]=data.kpis["sstob.atmfaults"].data[0].values[0].data[0][2];
CriticalFailures[1]+=" COMMUNICATION";
CriticalFailures[2]=data.kpis["sstob.atmfaults"].data[0].values[0].data[0][3];
CriticalFailures[2]+=" OUT OF CASH";
CriticalFailures[3]=data.kpis["sstob.atmfaults"].data[0].values[0].data[0][4];
CriticalFailures[3]+=" PRINTER";
CriticalFailures[4]=data.kpis["sstob.atmfaults"].data[0].values[0].data[0][5];
CriticalFailures[4]+=" OTHER";

CriticalFailures.sort(function(v1,v2) {
v1=parseInt(v1.match(/\d/g).join(''),10);
v2=parseInt(v2.match(/\d/g).join(''), 10);
    if (v1<v2)
      return 1;
    else
      return 0;
});

COne=CriticalFailures[0];
Ctwo=CriticalFailures[1];
CThree=CriticalFailures[2];
CFour=CriticalFailures[3];
CFive=CriticalFailures[4];

//Disposals-Available
for (var i = 0; i < data.kpis["sstob.atmcash"].data.length; i++) {
//Disposals
Dis[i]=data.kpis["sstob.atmcash"].data[i].values[0].data[0][1];
//Available
Ava[i]=data.kpis["sstob.atmcash"].data[i].values[0].data[0][2];
//Instance-Name
Instances[i]=data.kpis["sstob.atmcash"].data[i].instanceName;
}

if (data.kpis["sstob.atmcash"].data.length===1) {
  for (var k = 1; k <= 3; k++) {
    Dis[k]="";
    Ava[k]="";
    Instances[k]="";
  }
}
if (data.kpis["sstob.atmcash"].data.length===2) {
  for (var h = 2; h <= 3; h++) {
    Dis[h]="";
    Ava[h]="";
    Instances[h]="";
  }
}
if (data.kpis["sstob.atmcash"].data.length===3) {
    Dis[3]="";
    Ava[3]="";
    Instances[3]="";
}
//Function that allow simplify the numbers 
function abbrNum(number, decPlaces) {
    var orig = number;
    var dec = decPlaces;
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10, decPlaces);
    // Enumerate number abbreviations
    var abbrev = ["K", "M", "B", "T"];
    // Go through the array backwards, so we do the largest first
    for (var i = abbrev.length - 1; i >= 0; i--) {
      // Convert array index to "1000", "1000000", etc
      var size = Math.pow(10, (i + 1) * 3);
      // If the number is bigger or equal do the abbreviation
      if (size <= number) {
          // Here, we multiply by decPlaces, round, and then divide by decPlaces.
          // This gives us nice rounding to a particular decimal place.
           number = Math.round(number * decPlaces / size) / decPlaces;
          // Handle special case where we round up to the next abbreviation
          if((number == 1000) && (i < abbrev.length - 1)) {
              number = 1;
              i++;
          }
          // Add the letter for the abbreviation
          number += abbrev[i];
          // We are done... stop
          break;
      }
  }
  return number;
}
D1= abbrNum(Dis[0], 4);
D2= abbrNum(Dis[1], 4);
D3= abbrNum(Dis[2], 4);
D4= abbrNum(Dis[3], 4);
A1= abbrNum(Ava[0], 4);
A2= abbrNum(Ava[1], 4);
A3= abbrNum(Ava[2], 4);
A4= abbrNum(Ava[3], 4);

//SLA-Violation Information
breached=data.kpis["sstob.sla"].data[0].values[0].data[0][1];
breached=SeparateNumber(breached);
TotalSla=data.kpis["sstob.sla"].data[0].values[0].data[0][2];
TotalSla=SeparateNumber(TotalSla);
//Network Availability
currentMonth=data.kpis["sstob.avb"].data[0].values[0].data[0][1];
lastMonth=data.kpis["sstob.avb"].data[0].values[0].data[1][1];

},
error:function(result){
 console.log(result);
}

});

//Select KPI widgets

$.ajax({
  type: "get",
  url: "js/preferences.json",
  dataType:"json",success: function (data) {

for(var i=0, t=localStorage.length; i < t; i++) {
$(data).each(function (index, data) {$('.widgets').html(
    "<div id="+data.widgets.working.id+" class='vertical col-lg-4 col-md-6 col-sm-6 col-xs-12 "+data.widgets.working.name+" 'style='position: relative; '>"+
      "<div class='left'>"+
        "<iframe id='radialChart' class='embed-responsive-item' src='RadialChartWORKING/index.html' frameborder='0' scrolling='no' width='100%'></iframe>"+
      "</div>"+
      "<div class='right'>"+
        "<h1 class='title-widgets' align='center'>WORKING</h1>"+
        "<a href='notification-settings.html'><span class='notification-config'></span></a>"+
        "<br>"+
        "<br>"+
        "<a href='trends.html'><span class='tendency-icon'></span></a>"+
          //Information-working//
          "<div class='widget-information'>"+
            "<ul class='ul-widgets'>"+
              "<li class='li-active'>ACTIVE</li>"+
              //Information-Active//
              "<ul class='ul-infow'>"+
              "<li><span class='information-AA'>"+Active+"</span><span class='information-AI'>/ "+TotalATM+"</span></li>"+
              "</ul>"+
              "<br>"+
              "<li class='li-inactive'>INACTIVE</li>"+
               //Information-Inactive//
              "<ul class='ul-infow'>"+
              "<li><span class='information-IA'>"+Inactive+"</span><span class='information-II'>/ "+TotalATM+"</span></li>"+
              "</ul>"+
            "</ul>"+
          "</div>"+
        "</div>"+
      "</div>"+

      "<div id="+data.widgets.transactions.id+" class='complete col-lg-4 col-md-6 col-sm-6 col-xs-12 "+data.widgets.transactions.name+" ' style='position: relative; '>"+
        "<h1 class='title-widgets'>TRANSACTIONS</h1>"+
        "<a href='notifications-settings-transactions.html'><span class='notification-config'></span></a>"+
        "<br>"+
        "<br>"+
        "<a href='trends_transactions.html'><span class='tendency-icon'></span></a>"+
          //Information//
          "<div class='widget-information'>"+
          "<ul class='ul-widgetT'>"+
          "<li class='today'><span>TODAY</span></li>"+
          "<li><span class='information-T'>"+TotalTransactions+"</span><span class='glyphicon glyphicon-triangle-bottom icon-down'></span><span class='info-percentd'>%</span></li>"+
          "<li class='info-avg'>AVG </li>"+
          "</ul>"+
          "</div>"+
      "</div>"+

      "<div id="+data.widgets.approvedTransactions.id+" class='horizontal col-lg-4 col-md-6 col-sm-6 col-xs-12 "+data.widgets.approvedTransactions.name+"' style='position: relative; '>"+
        "<div class='up'>"+
          "<h1 class='title-widgets'>APPROVED TRANSACTIONS</h1>"+
          "<a href='notification-settings-approved-transactions.html'><span class='notification-config'></span></a>"+
          "<div id='approtran' onload='approtranChart()'></div>"+
        "</div>"+
        "<div class='bottom'>"+
          "<a href='trends_approved.html'><span class='tendency-icon'></span></a>"+
              //Information
              "<div class='widget-information'>"+                    
                "<div class='col-lg-5 col-md-5 col-sm-5 col-xs-5  info-ATL'>"+
                 "<ul class='ul-widgets'>"+
                  "<li class='li-active'><span>APPROVED</span>"+
                    "<ul class='ul-infow'>"+
                    "<li><span class='information-AA percent-margin'>"+Approved+"</span><span class='glyphicon glyphicon-triangle-top icon-up'></span><span class='info-percentu'>%</span></li>"+
                    "</ul>"+
                  "</li>"+
                  "</ul>"+
                "</div>"+
                "<div class='col-lg-5 col-md-5 col-sm-5 col-xs-5  info-ATR'>"+
                 "<ul class='ul-widgets'>"+
                  "<li class='li-inactive'><span>DENIED</span>"+
                    "<ul class='ul-infow'>"+
                    "<li><span class='information-IA'>"+Denied+"</span></li>"+
                    "</ul>"+
                  "</li>"+
                "</ul>"+
              "</div>"+
            "</div>"+//Widget-Information
          "</div>"+//Bottom
          "<script>"+
          "approtranChart();"+
          "</script>"+
      "</div>"+
      
      "<div id="+data.widgets.origin.id+" class='vertical col-lg-4 col-md-6 col-sm-6 col-xs-12 "+data.widgets.origin.name+"' style='position: relative; '>"+
        "<h1 class='title-widgets'>ORIGIN</h1>"+
        "<div id='verticalChart' onload='originChart()' class='left'></div>"+
        "<div class='right'>"+
          "<a href='notification-settings-origin.html'><span class='notification-config'></span></a>"+
          "<br>"+
          "<br>"+
          "<a href='trends_origin.html'><span class='tendency-icon'></span></a>"+
         "<div class='widget-information'>"+
            "<ul class='ul-widgets ul-widgetOrigin'>"+
                //Information-Same Bank//
              "<li class='li-blue'><span>SAME BANK</span>"+
                  "<ul class='ul-infow'>"+
                  "<li><span class='information-AA'>"+SameBank+"</span><span class='information-AI'>/AVG</span></li>"+
                  "</ul>"+
              "</li>"+
                //Information-Other Issues//
              "<li class='li-purple'><span>OTHER ISSUER</span>"+
                "<ul class='ul-infow'>"+
                "<li><span class='information-AA'>"+OtherIssuer+"</span><span class='information-AI'>/AVG</span></li>"+
                "</ul>"+
              "</li>"+
                //Information Different ATM
              "<li class='li-orange'><span>DIFFERENT ATM</span>"+
                "<ul class='ul-infow'>"+
                  "<li><span class='information-AA'>"+DifferentATM+"</span><span class='information-AI'>/AVG</span></li>"+
                "</ul>"+
              "</li>"+
            "</ul>"+
          "</div>"+
        "</div>"+
        "<script>"+
        "originChart();"+
        "</script>"+
        "</div>"+

        "<div id="+data.widgets.criticalFailures.id+" class='complete col-lg-4 col-md-6 col-sm-6 col-xs-12 "+data.widgets.criticalFailures.name+"' style='position: relative;'>"+
        "<h1 class='title-widgets'>CRITICAL FAILURES</h1>"+
        "<a href='notifications-settings-cf.html'><span class='notification-config'></span></a>"+
          "<br>"+
        "<div class='widget-information widget-critical'>"+
            "<div class='col-lg-6 col-md-6 col-sm-6 col-xs-6 info-CF'>"+
              "<ul class='ul-widgets'>"+
                    "<li class='li-one'><span class='percent-one'>"+COne.match(/\d/g).join('')+"%</span><span>" +COne.match(/[A-Z\s]/g).join('')+"</span></li>"+
              "</ul>"+
            "</div>"+

             "<div class='col-lg-6 col-md-6 col-sm-6 col-xs-6 info-CF'>"+
              "<ul class='ul-widgets'>"+
              "<li class='li-four'><span class='percent-four'>"+CFour.match(/\d/g).join('')+"%</span><span>" +CFour.match(/[A-Z\s]/g).join('')+"</span></li>"+   
              "</ul>"+
            "</div>"+

            "<div class='col-lg-6 col-md-6 col-sm-6 col-xs-6 info-CF'>"+
              "<ul class='ul-widgets'>"+
              "<li class='li-two'><span class='percent-two'>"+Ctwo.match(/\d/g).join('')+"%</span><span>"+ Ctwo.match(/[A-Z\s]/g).join('')+"</span></li>"+     
              "</ul>"+
            "</div>"+

             "<div class='col-lg-6 col-md-6 col-sm-6 col-xs-6 info-CF'>"+
              "<ul class='ul-widgets'>"+
              "<li class='li-five'><span class='percent-five'>"+CFive.match(/\d/g).join('')+"%</span><span>"+ CFive.match(/[A-Z\s]/g).join('')+"</span></li>"+
              "</ul>"+
            "</div>"+

            "<div class='col-lg-6 col-md-6 col-sm-6 col-xs-6 info-CF'>"+
              "<ul class='ul-widgets'>"+
              "<li class='li-three'><span class='percent-three'>"+CThree.match(/\d/g).join('')+"%</span><span>"+ CThree.match(/[A-Z\s]/g).join('')+"</span></li>"+ 
              "</ul>"+
            "</div>"+
          "</div>"+
        "</div>"+

        "<div id="+data.widgets.disposalsAvailable.id+" class='complete col-lg-4 col-md-6 col-sm-6 col-xs-12 "+ data.widgets.disposalsAvailable.name+"' style='position: relative;'>"+
        "<ul class='nav nav-tabs'>"+
        "<li class='active'><a class='widget-nav title-widgets' href='#disposals' data-toggle='tab'>DISPOSALS</a></li>"+
        "<li><a class='widget-nav title-widgets' href='#available' data-toggle='tab'>AVAILABLE</a></li>"+
        "</ul>"+
        "<div class='tab-content'>"+
        "<div id='disposals' class='tab-pane fade in active'>"+
          "<a href='notification-settings-disposals.html'><span class='notification-config'></span></a>"+
        //Information Disposals//
              "<div class='widget-information'>"+    
                "<div class='col-lg-5 col-md-5 col-sm-5 col-xs-5 info-DAL'>"+
                 "<ul class='ul-widgets'>"+
                  "<li><span class='accounting'>"+Instances[0]+"</span>"+
                    "<ul class='ul-infow'>"+
                    "<li><span class='currency'>"+D1+"</span><span class='information-AI'></span></li>"+
                    "</ul>"+
                  "</li>"+
                  "</ul>"+
                "</div>"+
                "<div class='col-lg-5 col-md-5 col-sm-5 col-xs-5 info-DAR'>"+
                 "<ul class='ul-widgets'>"+
                  "<li><span class='accounting'>"+Instances[1]+"</span>"+
                    "<ul class='ul-infow'>"+
                    "<li><span class='currency'>"+D2+"</span><span class='information-AI'></span></li>"+
                    "</ul>"+
                  "</li>"+
                "</ul>"+
                "</div>"+
                 "<div class='col-lg-5 col-md-5 col-sm-5 col-xs-5 info-DAL'>"+
                 "<ul class='ul-widgets'>"+
                  "<li><span class='accounting'>"+Instances[2]+"</span>"+
                    "<ul class='ul-infow'>"+
                    "<li><span class='currency'>"+D3+"</span><span class='information-AI'></span></li>"+
                    "</ul>"+
                  "</li>"+
                  "</ul>"+
                "</div>"+
                "<div class='col-lg-5 col-md-5 col-sm-5 col-xs-5 info-DAR'>"+
                 "<ul class='ul-widgets'>"+
                  "<li><span class='accounting'>"+Instances[3]+"</span>"+
                    "<ul class='ul-infow'>"+
                    "<li><span class='currency'>"+D4+"</span><span class='information-AI'></span></li>"+
                    "</ul>"+
                  "</li>"+
                "</ul>"+
                "</div>"+
              "</div>"+ //Information-Disposals
        "</div>"+//Disposals

        "<div id='available' class='tab-pane fade'>"+
        "<a href='notifications-settings-available.html'><span class='notification-config'></span></a>"+

      //Information Available//
            "<div class='widget-information'>"+
                
                "<div class='col-lg-5 col-md-5 col-sm-5 col-xs-5 info-DAL'>"+
                 "<ul class='ul-widgets'>"+
                  "<li><span class='accounting'>"+Instances[0]+"</span>"+
                    "<ul class='ul-infow'>"+
                    "<li><span class='currency'>"+A1+"</span><span class='information-AI'></span></li>"+
                    "</ul>"+
                  "</li>"+
                  "</ul>"+
                "</div>"+

                "<div class='col-lg-5 col-md-5 col-sm-5 col-xs-5 info-DAR'>"+
                 "<ul class='ul-widgets'>"+
                  "<li><span class='accounting'>"+Instances[1]+"</span>"+
                    "<ul class='ul-infow'>"+
                    "<li><span class='currency'>"+A2+"</span><span class='information-AI'></span></li>"+
                    "</ul>"+
                  "</li>"+
                "</ul>"+
                "</div>"+

                 "<div class='col-lg-5 col-md-5 col-sm-5 col-xs-5 info-DAL'>"+
                 "<ul class='ul-widgets'>"+
                  "<li><span class='accounting'>"+Instances[2]+"</span>"+
                    "<ul class='ul-infow'>"+
                    "<li><span class='currency'>"+A3+"</span><span class='information-AI'></span></li>"+
                    "</ul>"+
                  "</li>"+
                  "</ul>"+
                "</div>"+

                "<div class='col-lg-6 col-md-6 col-sm-6 col-xs-6 info-DAR'>"+
                 "<ul class='ul-widgets'>"+
                  "<li><span class='accounting'>"+Instances[3]+"</span>"+
                    "<ul class='ul-infow'>"+
                    "<li><span class='currency'>"+A4+"</span><span class='information-AI'></span></li>"+
                    "</ul>"+
                  "</li>"+
                "</ul>"+
                "</div>"+
              "</div>"+ //Information-Disposals

        "</div>"+ //Available
        "</div>"+//Tab content
        "</div>"+ //Widget end

        "<div id="+data.widgets.transactionsSecond.id+" class='complete col-lg-4 col-md-6 col-sm-6 col-xs-12 "+data.widgets.transactionsSecond.name+"' style='position: relative;'>"+
        "<h1 class='title-widgets'>TRANSACTIONS PER SECOND</h1>"+
        "<a href='notification-settings-transactionsPS.html'><span class='notification-config'></span></a>"+
        "<br>"+
        "<br>"+
        "<a href='trends_transactionsSecond.html'><span class='tendency-icon'></span></a>"+
             //Information//
          "<div class='widget-information'>"+
            "<ul class='ul-widgetT'>"+
            "<li class='today'><span>TODAY</span></li>"+
            "<li><span class='information-T'>"+TransactionsSecond+"</span><span class='glyphicon glyphicon-triangle-bottom icon-down'></span><span class='info-percentd'>%</span></li>"+
            "<li class='info-avg'>AVG</li>"+
            "</ul>"+
          "</div>"+

        "</div>"+

        "<div id="+data.widgets.responseTime.id+" class='vertical col-lg-4 col-md-6 col-sm-6 col-xs-12 "+data.widgets.responseTime.name+"' style='position: relative;'>"+
        "<h1 class='title-widgets'>RESPONSE TIME</h1>"+
        "<div id='BarChartVSeg' class='left' onload='responseChart()'></div>"+
        "<div class='right'>"+
        "<a href='notification-settings-responseT.html'><span class='notification-config'></span></a>"+
        "<br>"+
        "<br>"+
        "<a href='trends_responseTime.html'><span class='tendency-icon'></span></a>"+

         "<div class='widget-information'>"+
            "<ul class='ul-widgets ul-ResponseT'>"+
                //Information-Same Bank//
              "<li class='li-purple'><span>AVERAGE</span>"+
                  "<ul class='ul-infow'>"+
                  "<li><span class='information-AA'>"+Average+"</span><span class='information-AI'>/AVG 1</span></li>"+
                  "</ul>"+
              "</li>"+
                //Information-Other Issues//
              "<li class='li-orange'><span>INTERCHANGE</span>"+
                "<ul class='ul-infow'>"+
                "<li><span class='information-AA'>"+Interchange+"</span><span class='information-AI'>/AVG 1</span></li>"+
                "</ul>"+
              "</li>"+            
            "</ul>"+
          "</div>"+
        "</div>"+
        "<script>"+
        "responseChart();"+
        "</script>"+
        "</div>"+

        "<div id="+data.widgets.slaViolation.id+" class='vertical col-lg-4 col-md-6 col-sm-6 col-xs-12 "+data.widgets.slaViolation.name+"' style='position: relative;'>"+
        "<h1 class='title-widgets'>SLA VIOLATION</h1>"+
            "<div class='left'>"+
              "<div class='widget-information info-SLA'>"+
                "<ul class='ul-widgets'>"+
                  "<li class='li-active'>BREACHED</li>"+
                  "<ul class='ul-infow'>"+
                  "<li><span class='information-AA'>"+breached+"</span><span class='information-AI'>/ "+TotalSla+"</span></li>"+
                  "</ul>"+
                "<ul>"+
              "</div>"+
            "</div>"+
        "<div class='right'>"+
        "<a href='notification-settings-slaV.html'><span class='notification-config'></span></a>"+
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
        "<a href='notification-settings-networkA.html'><span class='notification-config'></span></a>"+
        "<div id='NetAva' onload='netavaChart()'></div>"+
        "</div>"+
        "<div class='bottom'>"+
        "<a href='trends_NAvailability.html'><span class='tendency-icon'></span></a>"+
            
            "<div class='widget-information'>"+    
                "<div class='col-lg-5 col-md-5 col-sm-5 col-xs-5  info-NAL'>"+
                 "<ul class='ul-widgets'>"+
                  "<li><span class='accounting'>CURRENT MONTH</span>"+
                    "<ul class='ul-infow'>"+
                    "<li><span class='currency'>"+currentMonth+"</span><span class='information-AI'>/</span></li>"+
                    "</ul>"+
                  "</li>"+
                  "</ul>"+
                "</div>"+
                "<div class='col-lg-5 col-md-5 col-sm-5 col-xs-5  info-NAR'>"+
                 "<ul class='ul-widgets'>"+
                  "<li><span class='accounting'>LAST MONTH</span>"+
                    "<ul class='ul-infow'>"+
                    "<li><span class='currency'>"+lastMonth+"</span><span class='information-AI'>/</span></li>"+
                    "</ul>"+
                  "</li>"+
                "</ul>"+
              "</div>"+
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
   //console.log('Para la clave ' + key + ' el valor es: ' + localStorage[key]);

$(".false").detach();
$(".true").prepend();
}

} //DataType
});//Ajax end




}); //End
