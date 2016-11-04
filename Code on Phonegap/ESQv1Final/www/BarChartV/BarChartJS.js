$(document).ready(function() {
	var margin = {top: 20, right: 20, bottom: 30, left: 40},
		width = $("#verticalChart").width(),
		height = width - 94;

	var formatPercent = d3.format(".0%");

	var svgCont = d3.select("#verticalChart").append("svg")
		.attr("width", width)
		.attr("height", height + 24);

	var shadowBar = svgCont.append("filter")
      	.attr("id", "f2");

	shadowBar.append("feGaussianBlur")
	    .attr("in", "SourceAlpha")
	    .attr("stdDeviation", "1.5");

	shadowBar.append("feOffset")
	    .attr("dx", "0")
	    .attr("dy", "0");

	var fermerge = shadowBar.append("feMerge");

	fermerge.append("feMergeNode");

	fermerge.append("feMergeNode")
		.attr("in", "SourceGraphic");
		
	var svg = svgCont.append("g")
		.attr("class", "containerBarV")
		.attr("transform", "translate(35,20)");

	var x = d3.scale.ordinal()
	    .rangeRoundBands([-70, width], 2.5);

	var y = d3.scale.linear()
		.range([height, 0]);

	var xAxis = d3.svg.axis()
		.scale(x);

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.ticks(3, "%");

	d3.json("BarChartV/data.json", function(data) {
		console.log(data);

		var barWidth = width / data.letters.length;

		x.domain(data.letters.map(function(d) { return d.letter; }));
		y.domain([0, d3.max("1")]);			

		svg.selectAll(".containerBarV")
			.data(data.frequencies)
			.enter().append("text")
			.attr("class", "percent")
			.attr("x", function(d, i) {
				console.log(d);
				return 20 + (i  * (barWidth / 1.3)) + (barWidth / 100);
			})
			.attr("y", height)
	      	.text(0);

	    d3.selectAll(".percent")
			.transition()
	      	.ease("linear")
	      	.duration(1000)
	      	.delay(0)
	      	.attr("y", function(d) { 
	      		return y(d.frequency) - 3; 
	      	})
	      	.tween("text", function(d) {
	      		var i = d3.interpolate(0, d.frequency);
	      		return function(t) {
		        	d3.select(this).text(formatPercent(i(t)));
		      };
	      	});

	    svg.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate(0,0)")
			.call(yAxis);

		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);

		d3.selectAll(".x line")
			.attr("y2", -height - margin.top);

		svg.selectAll(".y line")
			.attr("x2", width);

		var bar = svg.selectAll(".bar")
			.data(data.frequencies)
			.enter().append("rect")
			.attr("filter", "url(#f2)")
			.attr("class", "bar")
			.attr("x", function(d, i) {
				return 5 + (i * 25);
			})
			.attr("width", barWidth / 2.5)
			.attr("y", function(d) {
				return height;
			})
			.attr("height", 0)
			.attr("transform", function(d, i) { return "translate(" + i * (barWidth / 3) + ",0)"; });

		bar.transition()
			.attr('height', function(d) {
				return height - y(d.frequency);
			})
			.attr("y", function(d) {
				return y(d.frequency);
			})
			.delay(0)
			.duration(1000)
			.ease('linear');

	});
});