$(document).ready(function() {
  var data = {
  };

  var total;
  function ಠ_ಠ() {
    d3.json("AreaChartMonthlyWORKING/data.json", function(datas) {
      drawLineChart(    'TrendMWork',    datas.lineChart );
    });
  }

  var DURATION = 1500;
  var DELAY    = 0;

  /**
   * draw the fancy line chart
   *
   * @param {String} elementId elementId
   * @param {Array}  data      data
   */
  function drawLineChart( elementId, data ) {
    // parse helper functions on top
    var formatNumbers = d3.format("0,000");
    var formatPercent = d3.format(".0%");

    total = d3.max(data, function( d ) { return d.value; });

    // TODO code duplication check how you can avoid that
    var containerEl = document.getElementById( elementId ),
        BAR_PADDING = 0,
        width       = $(".workMonthly").width(),
        height      = $(".workToday").height(),

        detailWidth  = 98,
        detailHeight = 55,
        detailMargin = 10,

        container   = d3.select( containerEl ),
        svgContainer         = container.select( 'svg' )
                                .attr( 'width', width + 15 )
                                .attr( 'height', height + 50),

        x = d3.scale.linear()
          .domain([0, d3.max(data, function(d) { return d.date; })])
          .range([0, width + 30]),
        y = d3.scale.linear()
          .range( [ (height - 40), 0 ] ),

        xAxis = d3.svg.axis()
          .scale( x )
          .ticks ( 4 )
          .tickSize( -height )
          .tickFormat(function(d) {
            return data[d].label;
          }),

        /*xAxisTicks = d3.svg.axis()
          .scale( x )
          .ticks( 4 )
          .tickSize( -height ),*/

        yAxisTicks = d3.svg.axis()
          .scale( y )
          .ticks( 4 )
          .tickValues([0, 0.25, 0.5, 0.75, 1])
          .tickFormat(d3.format("%"))
          .orient( 'left' ),

        area = d3.svg.area()
          .interpolate( 'monotone' )
          .x( function( d )  { return x( d.date ); } )
          .y0( height )
          .y1( function( d ) {
            y1 = 0;
            //total = 18309;
            y1 = d.value / total;
            return y( y1 );
          } ),

        line = d3.svg.line()
          .interpolate( 'monotone' )
          .x( function( d ) { return x( d.date ); } )
          .y( function( d ) {
            yLine = 0;
            //total = 18309;
            yLine = d.value / total;
            return y( yLine );
          } ),

        startData = data.map( function( datum ) {
          return {
            date  : datum.date,
            value : 0
          };
        } ),

        circleContainer;

    var svg = svgContainer.append("g")
  		.attr("class", "containerBarChartV")
  		.attr("transform", "translate(0,50)");

    // Compute the minimum and maximum percentage.
    y.domain( [ 0, d3.max( "1" ) ] );

    // Add the area path.
    svg.append( 'path' )
        .datum( startData )
        .attr( 'class', 'lineChart--area' )
        .attr( 'd', area )
        .transition()
        .duration( DURATION )
        .attrTween( 'd', tween( data, area ) )
        .attr("fill", "url(#lineChart--gradientBackgroundAreaMon)");

    // Add the line path.
    svg.append( 'path' )
        .datum( startData )
        .attr( 'class', 'lineChart--areaLine' )
        .attr( 'd', line )
        .transition()
        .duration( DURATION )
        .delay( 0 )
        .attrTween( 'd', tween( data, line ) )
        .each( 'end', function() {
          drawCircles( data );
        } );

    svg.append( 'g' )
        .attr( 'class', 'lineChart--xAxisTicks' )
        .attr( 'transform', 'translate(0,' + (height - 20)  + ')' )
        .call( xAxis );

    svg.append( 'g' )
      .attr( 'class', 'lineChart--yAxisTicks' )
      .attr( 'transform', 'translate(' + detailWidth / 2.5 + ',0)' )
      .call( yAxisTicks );


    // Helper functions!!!
    function drawCircle( datum, index ) {
      circleContainer.datum( datum )
                    .append( 'circle' )
                    .attr( 'class', 'lineChart--circle' )
                    .attr( 'r', 0 )
                    .attr(
                      'cx',
                      function( d ) {
                        return x( d.date );
                      }
                    )
                    .attr(
                      'cy',
                      function( d ) {
                        cy = 0;
                        if (d.value === 0 || d.value === null) {
                          d3.select(this).attr("class", "hidden");
                        }
                        else {
                          //total = 18309;
                          cy = d.value / total;
                          return y( cy );
                        }
                      }
                    )
                    .on( 'mouseenter', function( d ) {
                      d3.select( this )
                        .attr(
                          'class',
                          'lineChart--circle lineChart--circle__highlighted'
                        )
                        .attr( 'r', 7 );

                        var cxSelected = d3.select(this)
                          .attr("cx");

                        d3.select('[transform="translate(' + cxSelected +',0)"] text').style({
                          "font-family": "SFUIDisplay-Bold"
                        });

                        d.active = true;

                        showCircleDetail( d );
                    } )
                    .on( 'mouseout', function( d ) {
                      d3.select( this )
                        .attr(
                          'class',
                          'lineChart--circle'
                        )
                        .attr( 'r', 6 );

                      if ( d.active ) {
                        hideCircleDetails();

                        d.active = false;
                      }
                    } )
                    .on( 'click touch', function( d ) {
                      if ( d.active ) {
                        showCircleDetail( d );
                      } else {
                        hideCircleDetails();
                      }
                    } )
                    .transition()
                    .delay( DURATION / 13 * index )
                    .attr( 'r', 6 );
    }

    function drawCircles( data ) {
      circleContainer = svg.append( 'g' );

      data.forEach( function( datum, index ) {
        drawCircle( datum, index );
      } );
    }

    function hideCircleDetails() {
      circleContainer.selectAll( '.lineChart--bubble' )
                      .remove();

      d3.selectAll('.lineChart--xAxisTicks .tick text').style({
        "font-family": "SFUIDisplay-Regular"
      });
    }

    function showCircleDetail( data ) {
      var details = circleContainer.append( 'g' )
                        .attr( 'class', 'lineChart--bubble' )
                        .attr(
                          'transform',
                          function() {

                            var result = 'translate(';

                            result += x( data.date ) - 50;
                            result += ', ';
                            result += y( data.value / total ) - detailHeight - detailMargin;
                            result += ')';

                            return result;
                          }
                        );

      details.append( 'path' )
              .attr("class", "sombra")
              .style("fill", "#F7F0F0")
              .attr( 'd', 'm9.74375,26.09958l0,0c0.06589,-3.78053 -0.53092,-3.73961 4.50487,-3.73961l8.7578,0l0,0l19.89401,0l37.30124,0c4.92259,0 5.85786,-0.27983 7.37011,0.48273c1.51226,0.76257 1.74797,2.26507 1.74797,3.25688l0,9.34902l0,0l0,5.60941l0,0c-0.13181,4.76065 -2.76422,3.55584 -7.47052,3.80086l-25.655,-0.06125l-7.15615,2.79216l-7.19876,-2.79216l-22.97749,0c-7.7378,-0.06125 -9.11809,0.71475 -9.11809,-3.73961l0,0l0,-5.60941l0,0l0,-9.34902l-0.00001,0l-0.00001,-0.00001l0,0.00001l0.00001,0l0.00001,0l0.00001,0z' )
              .attr( 'width', detailWidth )
              .attr( 'height', detailHeight );

      var triangle = details.append("path")
        .attr("dy", "1em");

      var text = details.append( 'text' )
                        .attr( 'class', 'lineChart--bubble--text' );

      var DiffPercentage = text.append( 'tspan' )
          .attr( 'class', 'lineChart--bubble--label' )
          .attr( 'x', detailWidth / 1.43 )
          .attr( 'y', detailHeight / 4 * 2.7 )
          .attr( 'text-anchor', 'start' );

      difference = (data.value / data.avg) - 1;
      //total = 18309;
      //data.value = data.value * total;

      if (difference < 0) {
        triangle.attr("d", "M58 32 L63 36 L68 32 Z")
          .style("fill", "#E3509D");
        difference = Math.abs(difference);
        DiffPercentage.style("fill", "#E3509D");
      }
      else if (difference > 0) {
        triangle.attr("d", "M58 35 L63 32 L68 35 Z")
          .style("fill", "#3A8686");
        difference = Math.abs(difference);//Convert the negative value to a positive
      }

      DiffPercentage.text( formatPercent(difference));

      text.append( 'tspan' )
          .attr( 'class', 'lineChart--bubble--value' )
          .attr( 'x', detailWidth / 3 )
          .attr( 'y', detailHeight / 4 * 2.8 )
          .attr( 'text-anchor', 'middle' )
          .text( formatNumbers(data.value) );
    }

    function tween( b, callback ) {
      return function( a ) {
        var i = d3.interpolateArray( a, b );

        return function( t ) {
          return callback( i ( t ) );
        };
      };
    }
  }

  // yeah, let's kick things off!!!
  ಠ_ಠ();

});
