// from data.js
var tableData = data;

// YOUR CODE HERE!
// Use D3 to select the table body
var tbody = d3.select("tbody");

// load all sightings
buildTable(tableData);

// Build table by loop tableData array and get keys/vals write cells
function buildTable(sightings){
    tbody.html("");//remove any rows of data from the table
    sightings.forEach((sighting) => {
        // Append one table row per object
        var row = tbody.append("tr");
        // append one td for each key value
        Object.entries(sighting).forEach(([key, value]) => {
        var cell = row.append("td");
        //set the td value to the key value
        cell.text(value);
        });
    });
};

//Build a table filter
var button = d3.select("#filter-btn");
var form = d3.select("form");

//handlers
button.on("click", filterData);
form.on("submit", filterData);

//function to filter data
function filterData() {
    //interupt server connection
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    var datetimeElement = d3.select("#datetime");
    console.log(datetimeElement);
 
    // Get the value property of the datetimeElement / input element
    var datetime = datetimeElement.property("value");
    console.log(datetime);

    // Use the form input to filter the data by datetime
    filteredData = tableData.filter( item => item.datetime === datetime);
    console.log(filteredData);
    buildTable(filteredData);
};
   
