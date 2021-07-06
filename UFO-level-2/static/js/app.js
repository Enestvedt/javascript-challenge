// from data.js
var tableData = data;

// YOUR CODE HERE!
// Use D3 to select the table body
var tbody = d3.select("tbody");



// ------------------------------------------------
// populate the drop-down menues

menus = ["datetime", "city", "state", "country", "shape"];

menus.forEach(menu => {
    if (menu === "datetime"){
        var options = tableData.map(item => item[menu]);
        options = [...new Set(options)];
        options.sort(function (a, b) {
            a = a.toString().split('/');
            b = b.toString().split('/');
            return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
        });
        populateDrop(menu, options);
    }
    else {
        var options = tableData.map(item => item[menu]);
        options = [...new Set(options)].sort();
        console.log(options);
        populateDrop(menu, options);
    }
});

function populateDrop(drop, dropVals) {
    var dropElement = d3.select("#" + drop);
    dropVals.forEach((dropVal) => {
        var option = dropElement.append("option");
        option.text(dropVal);
        option.attr("value", dropVal);
        }
    );
};




// ------------------------------------------------
// load all sightings
buildTable(tableData);


//Function to populate table with all or user filtered data
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




// ------------------------------------------------
//Build a table filter for user to select options
var button = d3.select("#filter-btn");
var form = d3.select("form");

//handlers
button.on("click", filterData);
form.on("submit", filterData);

//function to filter data
function filterData() {
    //interupt page refresh if user press enter/return
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    var datetimeElement = d3.select("#datetime");
    var cityElement = d3.select("#city");
    var stateElement = d3.select("#state");
    var countryElement = d3.select("#country");
    var shapeElement = d3.select("#shape");
 
    // Get the value property of the datetimeElement / input element
    var datetime = datetimeElement.property("value");
    var city = cityElement.property("value");
    var state = stateElement.property("value");
    var country = countryElement.property("value");
    var shape = shapeElement.property("value");


    // create an object to store filter criteria and populate with user input
    searchCriteria = {};
    if (datetime){
        if (datetime != "all"){
            searchCriteria.datetime = datetime;  
        };
    };
    if (city){
        if (city != "all"){
            searchCriteria.city = city;  
        };    };
    if (state){
        if (state != "all"){
            searchCriteria.state = state;  
        };
    };
    if (country){
        if (country != "all"){
            searchCriteria.country = country;  
        };    };
    if (shape){
        if (shape != "all"){
            searchCriteria.shape = shape;  
        };    };

    // set var to subset of tableData
    var filteredData = tableData;

    // Loop searchCriteria keys and values filtering data each time
    Object.entries(searchCriteria).forEach(([key, value]) => {
        filteredData = filteredData.filter( item => item[key] === value);
    });
    
    // call function to build the table with filtered data
    buildTable(filteredData);
};



