rows = [];

/*
var data = d3.json("./cgi-bin/test.py?offset=0&count=10", function(data) {
      
      //for (var i = 0, item; item = data[i]; i++){
      //  rows.push(item);
      //}
      console.log(data);
      myDataIsReady();
});
*/
var query = "offset=0&count=10";

var url = "./cgi-bin/test.py?" + query;

var data = d3.request(url)
    .mimeType("application/json")
    .response(function(xhr) { return JSON.parse(xhr.responseText); })
    .get(function(data) {
        if (data != null){
            for (var i = 0, item; item = data[i]; i++){
                rows.push({lat: item[0], lng:item[1]});
            }
        }
      myDataIsReady();
  });


console.log(data);

function myDataIsReady() {
    console.log("??");
    console.log(rows);
    for (var i = 0, item; item = rows[i]; i++){
        console.log(item);
    }
}

/*
var data = d3.csv("../data/movie_filtered.csv", function(error, data) {
    data.forEach( function(d){
        d.US_Gross = parseInt(d.US_Gross);
        d.Worldwide_Gross = parseInt(d.Worldwide_Gross);
        d.Production_Budget = parseInt(d.Production_Budget);
        d.Release_Date = new Date(d.Release_Date);
        d.Rotten_Tomatoes_Rating = parseInt(d.Rotten_Tomatoes_Rating);
        d.IMDB_Rating = parseFloat(d.IMDB_Rating);
        d.IMDB_Votes = parseInt(d.IMDB_Votes);
    });

    var config = {width: 500, height: 500, margin:{left: 50, top: 50}};
    var idVars = ["Title", "Release_Date", "Director"];
    var numericVars = ["US_Gross", "Worldwide_Gross", "Production_Budget", "Rotten_Tomatoes_Rating", "IMDB_Rating", "IMDB_Votes"];
    var categoricalVars = ["MPAA_Rating", "Source", "Major_Genre", "Creative_Type"];
    var scales = ["Linear", "Ordinal", "Point", "Band", "Log", "Pow"];

    var params = {}
        params["x"] = "Production_Budget";
        params["y"] = "Worldwide_Gross";
        params["color"] = "MPAA_Rating";
        params["shape"] = "Major_Genre";
        params["size"] = "IMDB_Rating";

    var scatterplot = ScatterPlot()
        .visualVariables(params)
        .x(function(d) { return d[params.x]; })
        .y(function(d) { return d[params.y]; })
        .color(function(d) { return d[params.color]; })
        .shape(function(d) { return d[params.shape]; })
        .size(function(d) { return d[params.size]; })
        .width(800)
        .height(500)
        .margin({left:50, right:25, top:25, bottom:50 });

    var svg = d3.select("#scatterplot");

    svg
        .datum(data)
        .call(scatterplot);
});
*/