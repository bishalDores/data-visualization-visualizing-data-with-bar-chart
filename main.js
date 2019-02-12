
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

    var toopltip = d3.select('body').append('div').style({
        'position':'absolute',
        'padding':'4px',
        'background':'#fff',
        'border':'1px solid #000',
        'color':'#000'
    });

    var svg = d3.select("#barGraph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height",height + margin.top + margin.bottom)
        .attr("class", "graph-svg-component")
        .append("g")
        .attr("transform","translate("+margin.left+","+margin.top+")");

    // console.log(dataset);

    svg.selectAll("bar").data(dataset).enter().append("rect")
        .style("fill","steelblue")
        .attr("x",(d,i)=> i*(width/dataset.length))
        .attr("y",(d)=>yAxisScale(d[1]))
        .attr("width",width/dataset.length)
        .attr("height",(d)=>height-yAxisScale(d[1]))

        .on('mouseover',mouseoverHandler)
        .on('mousemove',mouseMoving)
        .on('mouseout',mouseoutHandler);

    svg.append("g")
        .attr("class","x axis")
        .attr("transform", "translate(0,"+height+")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor","end")
        .attr("dx","-0.5em")
        .attr("dy","-.55em")
        .attr("y",30)
        .attr("transform","rotate(-45)")

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -85)
        .attr("dy", "0.8em")
        .attr("text-anchor", "end")
        .text("Value (billions)");
}


d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json",function (data) {
    var dataset = data.data;
    // console.log('hell');
    DrawBar(dataset);
})