
function DrawBar(dataset){
    var margin = {top:50,right:20,bottom:50,left:100};
    var width = 800;
    var height = 400;

    var minDate = dataset[0][0].substr(0,4);
    minDate = new Date(minDate);

    var maxDate = dataset[dataset.length-1][0].substr(0,4);
    maxDate = new Date(maxDate);

    var xAxisScale = d3.scaleTime()
        .domain([minDate,maxDate])
        .range([0,width])

    var yAxisScale = d3.scaleLinear()
        .domain([0,d3.max(dataset,function (d) {
            return d[1];
        })])
        .range([height,0]);

    var xAxis = d3.axisBottom(xAxisScale);
    var yAxis = d3.axisLeft(yAxisScale);

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .attr("id", "tooltip")
        .style("opacity", 0);


    // function mouseoverHandler(d) {
    //     tooltip.transition().style('opacity', .8);
    //     tooltip.style({
    //         'left' : (d3.event.pageX + 10) + 'px',
    //         'top' : (d3.event.pageY + 15) + 'px'
    //     })
    //          .html('<p> Date: ' + d[0] + '</p>'
                 // + '<p> Billions: ' + d[1] + '</p>');
    //
    //     d3.select(this)
    //         .style('opacity', .1);
    // }

    // function mouseoutHandler(d) {
    //     tooltip.transition().style('opacity', 0);
    //     d3.select(this)
    //         .style('opacity', 1);
    // }
    //
    // function mouseMoving (d) {
    //     tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
    //     d3.select(this)
    //         .style('opacity', 0.8);
    // }

    var svg = d3.select("#barGraph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height",height + margin.top + margin.bottom)
        .attr("class", "graph-svg-component")
        .append("g")
        .attr("transform","translate("+margin.left+","+margin.top+")");

    // console.log(dataset);

    svg.selectAll("bar")
        .data(dataset)
        .enter()
        .append("rect")
        .style("fill","steelblue")
        .attr("class","bar")
        .attr("data-date", function (d,i) {
            return d[0];
        })
        .attr("data-gdp", function (d,i) {
            return d[1];
        })
        .attr("x",(d,i)=> i*(width/dataset.length))
        .attr("y",(d)=>yAxisScale(d[1]))
        .attr("width",width/dataset.length)
        .attr("height",(d)=>height-yAxisScale(d[1]))
        .on('mouseover',function (d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div .html('<p> Date: ' + d[0] + '</p>'
                + '<p> Billions: ' + d[1] + '</p>')
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY + 10) + "px");
        })
        .on('mousemove',function (d) {
            div.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
            d3.select(this)
                .style('opacity', 0.5);
        })
        .on('mouseout',function (d) {
            div.transition().style('opacity', 0);
            d3.select(this)
                .style('opacity', 1);
        });

    svg.append("g")
        .attr("class", "x axis")
        .attr("id","x-axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.5em")
        .attr("dy", "-.55em")
        .attr("y", 30)
        .attr("transform", "rotate(-45)" );

    svg.append("g")
        .attr("class", "y axis")
        .attr("id","y-axis")
        .call(yAxis);
        // .append("text")
        // .attr("transform", "rotate(-90)")
        // .attr("y", -85)
        // .attr("dy", "0.8em")
        // .attr("text-anchor", "end")
        // .text("Value (billions)");
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -85)
    .attr("x",0 - (height / 3))
    .attr("dy", "1em")
    .style("text-anchor", "end")
    .text("Value (billions)");
}


d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json",function (data) {
    var dataset = data.data;
    // console.log('hell');
    DrawBar(dataset);
})
