$(document).ready(function() {
  var activeTooltip = true;
  //var activeDblClick=true;
  var percent;
  var tapped=false;

  var margin = {top: 20, right: 30, bottom: 20, left: 30},
    width = $('.originWeek').width(),
    height = $('.originToday').height();

  var formatPercent = d3.format(".0%");
  var formatNumber = d3.format("0,000");

  var xPercent = d3.scale.linear()
      .range([0, width - 20]);

  var x = d3.scale.linear()
      .range([0, width - 20]);

  var y = d3.scale.ordinal()
      .rangeRoundBands([height, 0], 0.2, 0.1);

  var yTooltip = d3.scale.linear()
      .range([height, 0]);

  var xAxisPercent = d3.svg.axis()
      .scale(xPercent)
      .orient("bottom")
      .tickValues([0, 0.25, 0.5, 0.75, 1])
      .tickFormat(d3.format(".0%"));

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickFormat(d3.format("%"));

  var yAxis = d3.svg.axis()
      .scale(y)
      .tickSize(0)
      .orient("left");

  var svgCont = d3.select("#WeekOrigin").append("svg")
      .attr({
        "width": width,
        "height": height + margin.top + margin.bottom
      });

  var def = svgCont.append("defs");

  shadowBar = def.append("filter")
      .attr({
        "id": "f2",
        "x": "-10",
        "y": "-10",
        "width": "100",
        "height": "100"
      });

  shadowBar.append("feFlood")
      .attr({
        "result": "flood",
        "flood-color": "#F59292",
        "flood-opacity": "1"
      });

  shadowBar.append("feComposite")
      .attr({
        "in": "flood",
        "result": "mask",
        "in2": "SourceGraphic",
        "operator": "in"
      });

  shadowBar.append("feMorphology")
      .attr({
        "in": "mask",
        "result": "dilated",
        "operator": "dilate",
        "radius": "2"
      });

  shadowBar.append("feGaussianBlur")
      .attr({
        "in": "dilated",
        "result": "blurred",
        "stdDeviation": "5"
      });

  var ferMerge = shadowBar.append("feMerge");

  ferMerge.append("feMergeNode")
      .attr("in", "blurred");

  ferMerge.append("feMergeNode")
      .attr("in", "SourceGraphic");

  shadowTool = def.append("filter")
      .attr({
        "id": "f1",
        "x": "-10",
        "y": "-10",
        "width": "100",
        "height": "100"
      });

  shadowTool.append("feOffset")
      .attr({
        "result": "offOut",
        "in": "SourceGraphic",
        "dx": "0",
        "dy": "0"
      });

  shadowTool.append("feColorMatrix")
      .attr("values", "0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0");

  shadowTool.append("feGaussianBlur")
      .attr({
        "result": "blurOut",
        "in": "matrixOut",
        "stdDeviation": "5"
      });

  shadowTool.append("feBlend")
      .attr({
        "in": "SourceGraphic",
        "in2": "blurOut"
      });

  var lineGra = def.append("linearGradient")
      .attr({
        "id": "gradForeground",
        "x1": "0%",
        "y1": "100%",
        "x2": "70%",
        "y2": "30%"
      });

  lineGra.append("stop")
      .attr("offset", "0%")
      .style("stop-color", "#E06060");

  lineGra.append("stop")
      .attr("offset", "100%")
      .style("stop-color", "#100311");

  var lineGraBackground = def.append("linearGradient")
      .attr({
        "id": "gradBackground",
        "x1": "0%",
        "y1": "50%",
        "x2": "100%",
        "y2": "50%"
      });

  lineGraBackground.append("stop")
      .attr("offset", "0%")
      .style({
        "stop-color": "#E06060",
        "stop-opacity": "0.85"
      });

  lineGraBackground.append("stop")
      .attr("offset", "100%")
      .style({
        "stop-color": "#313B72",
        "stop-opacity": "0.85"
      });

  var svg = svgCont.append("g")
      .attr("transform", "translate(20,10)");

  d3.json("BarCharHorWeekOrigin/data.json", function(error, data) {
    var diffDiary = 0;
    var diffWeekly = 0;
    var MaxValue = d3.max(data, function( d ) { return d.frequency; });

    data.reverse();

    xPercent.domain([0, d3.max("1")]);
    x.domain([0, d3.max(data, function( d ) { return d.frequency; })]);
    y.domain(data.map(function(d) { return d.letter; }));


    var bar = svg.selectAll(".bar")
        .data(data)
      .enter().append("g")
        .order()
        .attr("class", "bar");

    bar.append("rect")
        .attr({
          "y": function(d) {
            return y(d.letter);
          },
          "height": y.rangeBand(),
          "width": width
        })
        .style("fill", "url(#gradBackground)");

    bar.append("rect")
        .attr({
          "class": "j",
          "y": function(d) {
            return y(d.letter);
          },
          "height": y.rangeBand(),
          "width": 0
        })
        .style("fill", "url(#gradForeground)")
        .on('click', function(d, i, e) {
          //console.log(d.avgDiary);
          svg.selectAll( '.too' ).remove();

            var coordinates = [0, 0];
            coordinates = d3.mouse(this);
            var xPosition = coordinates[0];
            var yPosition = coordinates[1];
            yPosition = ((-30 ) + y(d.letter));
            if (yPosition <= 32) {
              yPosition = 12;
            }
            //console.log(yPosition);
            if (xPosition >= width - 140 ){
              xPosition = width - 140;
            }
            else if(xPosition <= 29){
              xPosition = 5;
            }
            else{
              xPosition = xPosition - 50;
            }

            var tooltip = svg.append("g")
              .attr("class", "too")
              .attr("transform", function() {
                //console.log(xPosition);
                return "translate(" + xPosition + "," + yPosition +")";
              });

            xPosition = 0;
            sombra = d3.select(this)
              .transition()
              .duration(500)
              .attr("class", "shadowWeek");

            tooltip.append("rect")
              .attr("class", "tooltipBar")
              .attr("x", 4)
              .attr("width", 110)
              .attr("height", 60)
              .attr("rx", "4px")
              .attr("ry", "4px")
              .transition().duration(300)
              .ease('linear');

            tooltip.append("text")
              .attr("class", "textTooltip")
              .attr("x", 8)
              .attr("y", 18)
              .text(function() {
                  if (d.frequency > 99999) {
                    formatNumber = d3.format("s");
                  }
                  return formatNumber(d.frequency);
                });

            tooltip.append("text")
              .attr("class", "textTooltipDay")
              .attr("x", 8)
              .attr("y", 38)
              .text("LAST " + d.letter);

            tooltip.append("text")
              .attr("class", "textTooltipDay")
              .attr("x", 58)
              .attr("y", 38)
              .text("LAST WEEK");

            var gTriangle = tooltip.append("g")
              .attr("transform", "translate(75,10)");

            var triangleDiary = gTriangle.append("path")
              .attr("dy", "1em");

            var triangleWeekly = gTriangle.append("path")
              .attr("dy", "1em");

            var ud = gTriangle.append("text")
              .attr("class", "textDifference")
              .attr("text-anchor", "middle")
              .attr("dx", "-4.5em")
              .attr("dy", "4em");

            var ud2 = gTriangle.append("text")
              .attr("class", "textDifference")
              .attr("text-anchor", "middle")
              .attr("dx", "0.5em")
              .attr("dy", "4em");

            //console.log(d.avgDiary);
            diffDiary = (d.avgDiary - d.frequency) / 100;
            diffWeekly = (d.avgWeekly - d.frequency) / 100;


            if (diffDiary > 0 ) {
              triangleDiary.attr("d", "M-63 40 L-68 35 L-58 35 Z")
                .style("fill", "#E3509D");

              ud.style("fill", "#E3509D");
              diffDiary = Math.abs(diffDiary);
            }
            else if (diffDiary < 0 ) {
              triangleDiary.attr("d", "M-63 35 L-58 40 L-68 40 Z")
                .style("fill", "#3A8686");

              ud.style("fill", "#3A8686");
              diffDiary = Math.abs(diffDiary);//Convert the negative value to a positive
            }

            if (diffWeekly > 0 ) {
              triangleWeekly.attr("d", "M-13 40 L-18 35 L-8 35 Z")
                .style("fill", "#E3509D");

              ud2.style("fill", "#E3509D");
              diffWeekly = Math.abs(diffWeekly);
            }
            else if (diffWeekly < 0) {
              triangleWeekly.attr("d", "M-13 35 L-8 40 L-18 40 Z")
                .style("fill", "#3A8686");

              ud2.style("fill", "#3A8686");
              diffWeekly = Math.abs(diffWeekly);
            }

            ud.text(formatPercent(diffDiary));
            ud2.text(formatPercent(diffWeekly));

            tooltip.transition().duration(500).delay(3000).style('opacity', 0).ease('linear').remove();

            sombra.transition().duration(500).delay(3000).style('filter', "").ease('linear').each('end', function() {
              activeTooltip = false;
              //activeDblClick = false;
              //tapped=false;
            });

        })
        .on('dblclick',function(e) {
            //activeDblClick = true;
            //alert(":)");

        })
        .on('touchstart', function(event) {
          if(!tapped){
              tapped=setTimeout(function(){
                  //alert("single");
                  //single_tap();
                  tapped=null;
              },300); //wait 300ms
            } else {
              clearTimeout(tapped);
              tapped=null;
              //alert("dbl");
              //double_tap();
            }
          event.preventDefault();
        });

    bar.selectAll(".j").transition().ease("quad-out").duration(2000).delay(0).attr("width", function(d) { return x(d.frequency); }).each('end', function() {
      activeTooltip = false;
      //activeDblClick = false;
      //tapped=false;
    });

    svg.append("g")
        .attr({
          "class": "x axis",
          "transform": "translate(0," + height + ")"
        })
        .call(xAxisPercent)
        .selectAll("line")
        .attr("y2", -height);

    d3.select(".x.axis .tick:last-of-type > text")
        .attr("x", "-20");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .selectAll("text")
        .attr({
          "transform": "rotate(-90)",
          "y": -10,
          "x": 8
        })
        .style("font-weight","bold");

    //d3.select(self.frameElement).style("height", (height + margin.top + margin.bottom) + "px");

  });
});
