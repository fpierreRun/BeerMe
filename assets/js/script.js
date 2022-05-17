var requestUrl = "https://api.openbrewerydb.org/breweries?by_postal=";

// console.log(apiURL);

var breweryContainer = document.getElementById('brewery');
var fetchButton = document.getElementById('fetch-button');
var userFormEl = document.querySelector("#zipcode-form");
var zipcodeInputEl = document.querySelector("#zipcode");

var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var zipcode = zipcodeInputEl.value.trim();

  if (zipcode) {
    getBrewery(zipcode);

    // clear old content
    //repoContainerEl.textContent = "";
    zipcodeInputEl.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
};

var getBrewery = function(postal) {
  // format the github api url
  var apiUrl = requestUrl + postal;

  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          getApi(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect");
    });
};


var getApi =function(data) {
  if (data.length === 0) {
    alert( 'This zipcode has no breweries!');
    return;
  }
  
      for (var i=0; i< data.length; i++){
        var breweryName = document.createElement("div");
        breweryName.classList = "flex2 card-header"

        var breweryAddress = document.createElement("a");
        breweryAddress.classList = "card-content";

        var breweryUrl = document.createElement("a");
        breweryUrl.classList = "card-content card-shadow"

        breweryAddress.textContent = data[i].street;
        breweryName.textContent= data[i].name;
        breweryUrl.textContent = data[i].website_url;

        breweryContainer.append(breweryName);
        breweryName.append(breweryAddress);
        breweryName.append(breweryUrl);

      }
  
};

userFormEl.addEventListener("submit", formSubmitHandler);
fetchButton.addEventListener('click', getApi);
<<<<<<< HEAD
//getApi();
=======
//getApi();
>>>>>>> af0a1353f74adfc4c708bb86b0003a8bdacd2005
