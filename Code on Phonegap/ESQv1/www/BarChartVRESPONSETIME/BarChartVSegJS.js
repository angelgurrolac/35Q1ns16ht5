function responseChart() {
	//Margin, width and height size definition
	var margin = {top: 20, right: 20, bottom: 30, left: 40},
		width = $("#BarChartVSeg").width(),
		height = 100;

	//Format on seconds for Y axis
	var formatSeconds = d3.time.scale("%S s");

	//Svg label definition with width and height
	var svgCont = d3.select("#BarChartVSeg").append("svg")
		.attr("width", width)
		.attr("height", height + 10);

	/*var defs = svgCont.append("defs");

	/*Shadow definition for each bar*/
	/*var shadowBar = defs.append("filter")
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

	//G label creation with containerBarChartVSeg class and the position in svg label
	var svg = svgCont.append("g")
		.attr("class", "containerBarChartVSeg")
		.attr("transform", "translate(30,5)");

	//Definition x scale for the X axis
	var x = d3.scale.ordinal()
	    .rangeRoundBands([-40, height], 1);

	//Definition y scale for the Y axis
	var y = d3.scale.linear()
		.range([height, height / 2]);

	//X Axis definition with the scale X
	var xAxis = d3.svg.axis()
		.scale(x);

	//Y Axis definition with the scale Y
	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.ticks(3);

	/*NEW Y AXIS*/
	//New Y Axis creation to show line, seconds and title of the average
	var gYAxis = svg.append("g")
		.attr("transform", "translate(0, " + height / 2 + ")");

	//Add line label to g label, this is the line of the middle
	gYAxis.append("line")
		.attr("x2", width - 30)
		.attr("class", "lineAxis");

	//Add text label to g laber, this show the second of the average
	var textAvg = gYAxis.append("text")
		.attr("class", "textAxis")
		.attr("dy", ".32em")
		.attr("x", "-9")
		.attr("y", "0")
		.style("text-anchor", "end");

	//Add text label to g laber, this show the title AVG
	gYAxis.append("text")
		.attr("class", "textAxis")
		.attr("x", width - 50)
		.attr("dy", "-.5em")
		.text("AVG");
	/*END new Y AXIS creation*/

	/*Connect with the API and get JSON information*/
	d3.json("BarChartVRESPONSETIME/data.json", function(data) {

		//Bar width definition
		var barWidth = 20;

		//Get the seconds with the correct format
		avg = formatSeconds(data.avg);

		//Add the seconds to the text
		textAvg.text(avg)
		//Add to the Y Axis the number of ticks
		yAxis.ticks(avg);
		//Map the X scale with the lenght of letters
		x.domain(data.letters.map(function(d) { return d.letter; }));
		//Give to Y scale the range with the seconds
		y.domain([0, avg]);

		//Add g label with x and axis class and the position, also call the X axis to display
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);

		//Add g label with y and axis class, also call the Y axis to display
		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis);

		//Give height to a line on X axis
		svg.selectAll(".x line")
			.attr("y2", -height);

		//Give width to a line on Y axis
		svg.selectAll(".y line")
			.attr("x2", width - 20);

		//Bar creation with the corresponding values
		var bar = svg.selectAll(".bar")
			.data(data.frequencies)
			.enter().append("rect")
			.attr("filter", "url(#shadow)")//Add the shadow to each bar
			.attr("class", "bar")//Add bar class
			.attr("x", function(d, i) {
				return 5 + (i * 35);//Add x position
			})
			.attr("width", barWidth)//Add bar width
			.attr("y", function(d) {
				return height;//Add the y position
			})
			.attr("height", 0)//Zero in height, this is for the transition begin in 0
			.attr("transform", function(d, i) { return "translate(" + i * (barWidth / 2) + ",0)"; });

		/*The transition start here*/
		bar.transition()
			.attr('height', function(d) {
				//Conditional, give the chart height to seconds if the seconds are more of double of average
				if (d.frequency > (avg * 2)) {
					d.frequency = avg * 2;
				}
				return height - y(d.frequency);//Give the height of each bar
			})
			.attr("y", function(d) {
				return y(d.frequency);//Give the y position to start below
			})
			.duration(1000)//Transition duration
			.ease('linear');//Animation
	});
}
