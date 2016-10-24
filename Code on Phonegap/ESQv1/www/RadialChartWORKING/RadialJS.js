$(document).ready(function() {
  
  /* Variables definition (angle, percent, avgPercent, difference)
  * angle: this had the value of oval charted
  * percent: this is the percent that show about how many ATM's are working
  * avgPercent: this show the average about how many ATM's are working
  * difference: this is the difference between percent and average, this show value in percentage
  */
  var angle = 0;
  var percent = 0;
  var avgPercent = 0;
  var difference = 0;

  /*Here is defined the values of size for chart and the format*/
  var width = $("#radialChart").width(), //Get in the variable width the container width
      widthRad = width / 3, //WidthRad is the width of radius and this is the container width divided by 3
      heightRad = widthRad, //heightRad is the same value of widthRad
      height = width - 40, //This is the height of chart, this is equals to the width minus 40 pixels
      twoPi = 2 *  Math.PI, //Gets the circle gray
      formatPercent = d3.format(".0%"); //Percentage format, this is a d3 internal function

  /*Arch creation, the arch start in the angle 0, it had two radius, the widthRad and heightRad values*/
  var arc = d3.svg.arc()
      .startAngle(0)
      .innerRadius(widthRad)
      .outerRadius(heightRad);

  /*Create the svg with the container width and height, then add label g with the circle class to svg and it's move to the middle of svg */
  var svg = d3.select("#radialChart").append("svg")
      .attr("width", width)
      .attr("height", height+20)
    .append("g")
      .attr("class", "circle")
      .attr("transform", "translate(" + width / 2 + "," + height /2 + ")");

  /*Create the color gradient label and add to svg*/
  var lineGra = svg.append("linearGradient")
      .attr("id", "gradRadial")
      .attr("x1", "0%")
      .attr("y1", "50%")
      .attr("x2", "100%")
      .attr("y2", "50%");

  /*Add to color gradient label a stop label with the offset 0% and color*/
  lineGra.append("stop")
      .attr("offset", "0%")
      .style("stop-color", "rgba(224, 96, 96, 1)");

  /*Add to color gradient label a stop label with the offset 100% and color*/
  lineGra.append("stop")
      .attr("offset", "100%")
      .style("stop-color", "rgba(49, 59, 114, 1)");

  /*Create and add a g label with progress-meter class to svg, this is for the percentage of the circle*/
  var meter = svg.append("g")
      .attr("class", "progress-meter");

  /*Create and add a g label with avg-meter class to svg, this is for the average*/
  var avgMeter = svg.append("g")
      .attr("class", "avg-meter");

  /*Create and add a g label with UD-meter class to svg, this is for the difference*/
  var UDMeter = svg.append("g")
      .attr("class", "UD-meter")
      .attr("dx", "-203em");

  /*Add a background circle with the backgroundclass and a d attribute with the value twoPi*/
  meter.append("path")
      .attr("class", "background")
      .attr("d", arc.endAngle(twoPi));

  /*Add a foreground circle to meter with the foreground class and a stroke attribute with the value url(#gradRadial), 
  the url(#gradRadial) is added to paint the circle with the gradient color*/
  var foreground = meter.append("path")
      .attr("class", "foreground")
      .style("stroke", "url(#gradRadial)");

  /*Add a text label to a meter with position text-anchor to the end, then the value on y position is 0.50em and x position is 0.35em*/
  var text = meter.append("text")
      .attr("text-anchor", "end")
      .attr("dy", "-0.50em")
      .attr("dx", "0.35em");

  /*Add a text label in avgMeter with position text-anchor to the end, then the value on y position is 3em and x position is 2em, 
  this is the difference percent*/
  var avg = avgMeter.append("text")
      .attr("text-anchor", "end")
      .attr("dy", "3em")
      .attr("dx", "2em");

  /*Add a path label in avgMeter with position text-anchor to the end, then the value on y position is 1em, 
  this triangle indicates if it is above or below the average*/
  var triangle = UDMeter.append("path")
      .attr("dy", "1em");

  /*Add a path label in UDMeter with position text-anchor in the middle, then the value on y position is -0.5em and x position is 0.5em, 
  this text indicates the average percent*/
  var ud = UDMeter.append("text")
      .attr("text-anchor", "middle")
      .attr("dx", "-0.5em")
      .attr("dy", "0.5em");

  /*Connect with the API and get JSON information*/
  d3.json("RadialChartWORKING/data.json", function(data){
    percent = data.total;//percent is equals to a total of ATM's that are working
    angle = percent * twoPi;//The angle is equals to a percent times twoPi, this multiplication gives the circle size that will paint
    avgPercent = data.avg;//avgPercent gives the average
    angle2 = avgPercent *  twoPi;//angle2 is the imaginary circle and it's equals to a avgPercent times twoPi
    difference = avgPercent - percent;//difference is equals to avgPercent minus percent
    
    /*Here is a condition that paint the triangle, if the difference is higher than 0 the triangle will be pink color*/
    if (difference > 0) {
      triangle.attr("d", "M-25 5 L-30 0 L-20 0 Z")
        .style("fill", "#E3509D");

      ud.style("fill", "#E3509D");
    }
    /*if the difference is smaller than 0 the triangle will be green color*/
    else if (difference < 0) {
      triangle.attr("d", "M-25 0 L-20 5 L-30 5 Z")
        .style("fill", "#3A8686");

      ud.style("fill", "#3A8686");
      Math.abs(difference);//Convert the negative value to a positive
    }

    /*Create the interpolate for each value difference, avgPercent and angle, this is for the transition*/
    var d = d3.interpolate(0, Math.abs(difference));//the first interpolate go until the difference
    var h = d3.interpolate(avgPercent, angle2);//the second interpolate go until the angle2
    var i = d3.interpolate(percent, angle);//the third interpolate go until the angle

    /*Here is the transition, the transition will last 1 second*/
    d3.transition().duration(1000).tween(0, function() {
      /*Return a function with the parameter t, this parameter go until 1*/
      return function(t) {
        difference = d(t);//difference is the interpolate d and give the t parameter
        avgPercent = h(t) / twoPi;//avgPercent is the interpolate h and give the t parameter
        angle = i(t) - 0.05;//angle is the interpolate i and give the t parameter

        /*Here is a condition, if angle is equals to 0 dissapear stroke attribute*/
        if (angle == 0) {
          foreground.style("stroke", "")
        }
        else{
          angle = i(t) - 0.05;//angle is the interpolate i and give the t parameter
          percent  = (angle + 0.05) / twoPi;//percent is equals to angle divided by twoPi
          foreground.attr("d", arc.endAngle(angle));//Add value to a label foreground
        }
        /*Add values to a labels like foreground, text, avg and ud*/
        foreground.attr("d", arc.endAngle(angle));
        text.text(formatPercent(percent));
        avg.text("AVG " + formatPercent(avgPercent));
        ud.text(formatPercent(difference));
      };
    });
  });

  /*The values like width, widthRad, heightRad, height change when resize the container and then pass the values to a labels again,
  this is for a responsive design*/
  $(window).resize(function() {
      width = $("#radialChart").width(),
      widthRad = width / 3,
      heightRad = widthRad,
      height = width - 40;

      d3.select("svg")
        .attr("width", width)
        .attr("height", height + 20);

      d3.select(".circle")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      arc.startAngle(0)
      .innerRadius(widthRad)
      .outerRadius(heightRad);

      d3.select(".background")
        .attr("d", arc.endAngle(twoPi));

      d3.select(".foreground")
        .attr("d", arc.endAngle(angle))
  });




  //Porcentaje de acuerdo a la linea
  /*
  *Operación
  * Math.PI = 3.141592653589793
              6.283185307179586
  *    <-------------/--<
  * 6.283185307179586 = 1
  * Total --X--^
  ********************************************
  *
  * 1---------------------/--6.283185307179586
  * porcentaje(decimales)--X--^
  *
  *
  */

});