
var globalPlaceNames;

function optionChanged(newPlace){
  thisPlace = globalPlaceNames.find(d => d.Geography == newPlace);
  year = d3.select("#selYear").property("value");
  update(thisPlace, year);
} 

function optionChanged2(year){
  newPlace = d3.select("#selDataset").property("value");
  thisPlace = globalPlaceNames.find(d => d.Geography == newPlace);
  update(thisPlace, year);
}

function update(thisPlace, year){
  deleteMap();
  deleteGraph();
  getMap(thisPlace.Geography, thisPlace.Latitude, thisPlace.Longitude);
  income(thisPlace.Geography, year);
  age(thisPlace.Geography, year);
  race(thisPlace.Geography, year);
}

function deleteGraph() {
  d3.selectAll("svg").remove();
}


function deleteMap() {
    d3.select("#map-id").remove();
    d3.select("body").append("div").attr("id", "map-id");
}

//Create a map centered on US 
function getMap(place, lat, long) {

  // Define variables for our base layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
  });

  // Create a marker
  var marker = L.marker([lat, long])
  .bindPopup("<h3>" + place + "<h3>");

  // Define a map object
  var map = L.map("map-id", {
    center: [lat, long],
    zoom: 6,  
    layers: [marker, streetmap] 
    });
  

}


function init() {
 
  d3.json("/places").then((placeNames) => {
    year();
    var i;
    for (i =0; i < placeNames.length; i++) {
      place = placeNames[i];
      
      d3.select("#selDataset")  
        .append("option")
        .text(place.Geography)
        .property("value", place.Geography);
    };
    globalPlaceNames = placeNames;

    const firstPlace = placeNames[213].Geography;
    const firstLat = placeNames[213].Latitude;
    const firstLong = placeNames[213].Longitude;
    getMap(firstPlace, firstLat, firstLong);
    income(firstPlace, "2005");
    race(firstPlace, "2005");
    age(firstPlace, "2005");
  

  }); 
 
}

// Transforming the data into callable years.
function year(){

var years = [];
var yearListDicts; 
  
  years = ["2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"];
  yearListDicts = years.map(d => {console.log("d", d); return {year:d}});
  var options = d3.select("#selYear")
  .selectAll("option")
  .data(yearListDicts);
  
  options.enter().append("option")
  .text(function (d) {
    console.log(d.year);
    return d.year;
  });
}




// Building the three d3 interactive charts for the cities.
  function buildCharts(data, variables, year, title){
   
    var dataByYear;
    years = ["2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"];

    yearsIndex = years.indexOf(year);
    dataByYear = data.map(x=> x[yearsIndex]);


    // svg container
    var height = 300;
    var width = 500;
    
    // margins
    var margin = {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50
    };
    
    // chart area minus margins
    var chartHeight = height - margin.top - margin.bottom;
    var chartWidth = width - margin.left - margin.right;
    
    // create svg container
    var svg = d3.select("#right").append("svg")
        .attr("height", height)
        .attr("width", width);
    
    // shift everything over by the margins
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    //scale y to chart height
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataByYear)])
        .range([chartHeight, 0]);
    
    // scale x to chart width
    var xScale = d3.scaleBand()
        .domain(variables)
        .range([0, chartWidth])
        .padding(0.1);
    
    // create axes
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale)
    
    
    // set x to the bottom of the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis)
          .selectAll("text")  
          .style("text-anchor", "end")
          .attr("transform", "rotate(-65)");

    
    // set y to the y axis
    chartGroup.append("g")
        .call(yAxis);
    
    // future fix take the titles out of html and put it on to each chart with d3.
    // var titles = ['Race', 'Income', 'Age'];
    // chartGroup.append("text")
    //     .attr("font-size", "16x")
    //     .attr("fill", "black")
    //     .attr("text-anchor", "middle")
    //     .text(titles[0]);
          
    // Create the rectangles using data binding
    
    var barsGroup = chartGroup.selectAll("rect")
        .data(dataByYear)
        .enter()
        .append("rect")
        .attr("x", (d, i) => xScale(variables[i]))
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => chartHeight - yScale(d))
        .attr("fill", "#112d32");
    
  

    // Create the event listeners with transitions
    barsGroup.on("mouseover", function() {
      d3.select(this)
                .transition()
                .duration(500)
                .attr("fill", "#112d32");
    })
        .on("mouseout", function() {
          d3.select(this)
                .transition()
                .duration(500)
                .attr("fill", "#112d32");
        });
       
      }

      
    
// Call the function.  
init();



