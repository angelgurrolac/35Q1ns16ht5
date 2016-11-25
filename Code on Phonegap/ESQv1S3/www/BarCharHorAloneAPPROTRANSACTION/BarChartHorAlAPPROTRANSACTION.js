function approtranChart() {
  var margin = {top: 20, right: 30, bottom: 20, left: 30},
    width = $("#approtran").width(),
    height = 35,
    avgPercent = 0;

  var formatPercent = d3.format(".0%");

  var x = d3.scale.linear()
      .range([0, width]);

  var y = d3.scale.ordinal()
      .rangeRoundBands([height, 0], .3, .3);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickFormat(formatPercent);

  var yAxis = d3.svg.axis()
      .scale(y)
      .tickSize(0)
      .orient("left");

  var svg = d3.select("#approtran").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(0,0)");

  /*var lineGra = svg.append("linearGradient")
      .attr("id", "gradRadial")
      .attr("x1", "0%")
      .attr("y1", "100%")
      .attr("x2", "100%")
      .attr("y2", "100%");

  lineGra.append("stop")
      .attr("offset", "0%")
      .style("stop-color", "#E06060");

  lineGra.append("stop")
      .attr("offset", "100%")
      .style("stop-color", "#313B72");*/

  d3.json("js/DataAPIResponse.json", function(data) {

    for (var i = 0; i <= data.kpis['atmta.transactions'].data[0].values[0].data.length - 1; i++) {
      avgPercent = avgPercent + data.kpis['atmta.transactions'].data[0].values[0].data[i][2];
    }
    avgPercent = avgPercent / data.kpis['atmta.transactions'].data[0].values[0].data.length;
    //data = data.kpis['sstob.atms'].data[0].values[0].data[0];
    //console.log(data.kpis['atmta.transactions'].data[0].values[0].data[0]);

    data = data.kpis['atmta.transactions'].data[0].values[0].data[0];

    x.domain([0, d3.max("1")]);
    y.domain(data.map(function(d) { return data[0]; }));


    var bar = svg.selectAll(".bar")
        .data(data)
      .enter().append("g")
        .attr("class", "bar");

    bar.append("rect")
        .attr("y", 0)
        .attr("height", height)
        .attr("width", width)
        .style("fill", "#F7F0F0");

    bar.append("rect")
        .attr("class", "rectPercent")
        .attr("y", 0)
        .attr("height", height)
        .attr("width", 0)
        .style("fill", "url(#gradRadial)");

    bar.append("rect")
        .attr("class", "indicator")
        .attr("y", 0)
        .attr("x", -3)
        .attr("height", height / 1.5)
        .attr("width", "3px")
        .style("fill", "#E06060");

    bar.append("text")
        .attr("class", "percentAppro")
        .attr("text-anchor", "start")
        .attr("x", -40)
        .attr("y", function(d) {
          return y.rangeBand() - 3;
        })
        .text(0);

    bar.append("text")
        .attr("class", "avg")
        .attr("text-anchor", "start")
        .attr("x", -55)
        .attr("y", function(d) {
          return y.rangeBand() + 10;
        })
        .text(0);

    bar.select(".indicator").transition().ease("linear").duration(1000).attr("x", function(d) {
      return x((data[2] / data[1])) - 3;
    });

    bar.selectAll(".rectPercent").transition().ease("linear").duration(1000).delay(0).attr("width", function(d) { return x((data[2] / data[1])); });

    bar.select(".percentAppro").transition().ease("linear").duration(1000).delay(0)
      .attr("x", function(d) { return x((data[2] / data[1])) - 40; })
      .tween("text", function(d) {
        var i = d3.interpolate(0, (data[2] / data[1]));
        return function(t) {
          d3.select(this).text(formatPercent(i(t)));
        };
      });

    bar.select(".avg").transition().ease("linear").duration(1000).delay(0)
      .attr("x", function(d) {
        return x((data[2] / data[1])) - 55;
      })
      .tween("text", function(d) {
        var a = d3.interpolate(0, (avgPercent / data[1]));
        return function(t) {
          d3.select(this).text("AVG " + formatPercent(a(t)));
        };
      });

    svg.append("g")
        .attr("class", "x xaxisAppTran")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

  });
}
