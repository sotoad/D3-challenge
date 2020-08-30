// @TODO: YOUR CODE HERE!
// Define SVG area dimensions
var svgWidth = 800;
var svgHeight = 600;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 20,
  bottom: 90,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// // Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// // to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from csv
d3.csv("assets/data/data.csv").then(function(Data) {

  console.log(Data);


  Data.forEach(function(graphData) {
    graphData.poverty = +graphData.poverty;
    graphData.healthcare = +graphData.healthcare;

    console.log(graphData);

  });

   // create scales
   const xScale = d3.scaleLinear().range([0, chartWidth]);

   const yScale = d3.scaleLinear().range([chartHeight, 0]);

    // create axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    
    xScale.domain([10, d3.max(Data, function(data) {
        return data.poverty})
    ]);
    yScale.domain([0, d3.max(Data, function(data) {
        return data.healthcare})
    ]);
   

    // append axes
    chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(xAxis);

    chartGroup.append("g")
      .call(yAxis);

     // append circles
     const circles = chartGroup.selectAll("circle")
     .data(Data)
     .enter()
     .append("circle")
     .attr("cx", d => xScale(d.poverty))
     .attr("cy", d => yScale(d.healthcare))
     .attr("r", "15")
     .attr("opacity", ".35")
     .attr("fill", "blue");

     chartGroup.append("text")
     .style("font-size", "14px")
     .selectAll("tspan")
     .data(Data)
     .enter()
     .append("tspan")
     .attr("x", d => xScale(d.poverty))
     .attr("y", d => yScale(d.healthcare))
     .text(d => d.abbr);

      chartGroup.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 0 - chartMargin.left - 5)
     .attr("x", 0 - (chartHeight / 1.5))
     .attr("dy", "1em")
     .attr("class", "axisText")
     .text("Lack Healthcare (%)");

     chartGroup.append("g")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top})`)
    .attr("class", "axisText")
    .text("In Poverty (%)");


});
