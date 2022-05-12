var zipcodeFormEl = document.querySelector("#zipcode-form");
var zipcodeInputEl = document.querySelector("#zipcode");

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var zipCode = zipcodeInputEl.value.trim();
  
    if (zipCode) {
      getBreweries(zipCode);
  
      // clear old content
        zipcodeFormEl.textContent = "";
        zipcodeInputEl.value = "";
    } else {
      alert("Please enter a GitHub username");
    }
  };


var getBreweries = function(postal_code) {
    // format the github api url
    var apiUrl = "https://api.openbrewerydb.org/breweries?by_postal="+ zipcode;
    // console(apiUrl);

    // make a get request to url
  fetch(apiUrl)
  .then(function(response) {
    // request was successful
    if (response.ok) {
      console.log(response);
      response.json().then(function(data) {
        console.log(data);
        //displayRepos(data, postal_code);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  })
  .catch(function(error) {
    alert("Unable to connect to site");
  });
};


zipcodeFormEl.addEventListener("submit", formSubmitHandler);


