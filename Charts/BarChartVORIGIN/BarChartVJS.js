$(document).ready(function() {
	//Margin, width and height size definition
	var margin = {top: 20, right: 20, bottom: 30, left: 40},
		width = $("#verticalChart").width(),
		height = width - 94;

	//Format on percentage for Y axis
	var formatPercent = d3.format(".0%");

	//Svg label definition with width and height
	var svgCont = d3.select("#verticalChart").append("svg")
		.attr("width", width)
		.attr("height", height + 24);

	/*Shadow definition for each bar*/
	var shadowBar = svgCont.append("filter")
      	.attr("id", "shadow");//Shadow identifier

	shadowBar.append("feGaussianBlur")
	    .attr("in", "SourceAlpha")
	    .attr("stdDeviation", "1.5");//Shadow size

	shadowBar.append("feOffset")
	    .attr("dx", "0")//Cero desviation in x position
	    .attr("dy", "0");//Cero desviation in x position

	var fermerge = shadowBar.append("feMerge");

	fermerge.append("feMergeNode");

	fermerge.append("feMergeNode")
		.attr("in", "SourceGraphic");
	/*End shadow definition*/

	//G label creation with containerBarChartV class and the position in svg label
	var svg = svgCont.append("g")
		.attr("class", "containerBarChartV")
		.attr("transform", "translate(35,20)");

	//Definition x scale for the X axis
	var x = d3.scale.ordinal()
	    .rangeRoundBands([-70, width], 2.5);

	//Definition y scale for the Y axis
	var y = d3.scale.linear()
		.range([height, 0]);

	//X Axis definition with the scale X
	var xAxis = d3.svg.axis()
		.scale(x);

	//Y Axis definition with the scale Y
	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.ticks(3, "%");

	/*Connect with the API and get JSON information*/
	d3.json("data.json", function(data) {

		//Bar width definition
		var barWidth = (width / data.letters.length) / 1.2;
		console.log(barWidth);
		//Map the X scale with the lenght of letters
		x.domain(data.letters.map(function(d) { return d.letter; }));
		//Give to Y scale the range with 1, 1 equals 100%
		y.domain([0, d3.max("1")]);

		//Add text label for the percentage above each bar
		svg.selectAll(".containerBarChart")
			.data(data.frequencies)
			.enter().append("text")
			.attr("class", "percent")
			.attr("x", function(d, i) {
				return 15 + (i  * (barWidth / 1.15)) + (barWidth / 100);
			})
			.attr("y", height)
	      	.text(0);
			/*Transition start here*/
	    d3.selectAll("text")
				.transition()
	      .ease("linear")//Animation
	      .duration(1000)//Transition duration
	      .attr("y", function(d) {
	      	return y(d.frequency) - 3;//Set the position for percentage according bar height on the transition
	      })
	      .tween("text", function(d) {//Add transition to the values for percentage
	      	var i = d3.interpolate(0, d.frequency);
	      		return function(t) {
		        	d3.select(this).text(formatPercent(i(t)));//Add the percentage to text label
		    };
	    });
			/*End transition*/

		//Add g label with y and axis class and the position, also call the Y axis to display
	  svg.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate(0,0)")
			.call(yAxis);

		//Add g label with x and axis class and the position, also call the X axis to display
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);

		//Give height to a line on X axis
		d3.selectAll(".x line")
			.attr("y2", -height - margin.top);

		//Give width to a line on Y axis
		svg.selectAll(".y line")
			.attr("x2", width);

		//Bar creation with the corresponding values
		var bar = svg.selectAll(".bar")
			.data(data.frequencies)
			.enter().append("rect")
			.attr("filter", "url(#shadow)")//Bar creation with the corresponding values
			.attr("class", "bar")//Add bar class
			.attr("x", function(d, i) {
				return 5 + (i * 25);//Add x position
			})
			.attr("width", barWidth / 2.5)//Add bar width
			.attr("y", function(d) {
				return height;//Add the y position
			})
			.attr("height", 0)//Zero in height, this is for the transition begin in 0
			.attr("transform", function(d, i) { return "translate(" + i * (barWidth / 2.5) + ",0)"; });

		/*The transition start here*/
		bar.transition()
			.attr('height', function(d) {
				return height - y(d.frequency);//Give the height of each bar
			})
			.attr("y", function(d) {
				return y(d.frequency);//Give the y position to start below
			})
			.delay(0)
			.duration(1000)//Transition duration
			.ease('linear');//Animation
	});
});
