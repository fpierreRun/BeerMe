var requestUrl = "https://api.openbrewerydb.org/breweries?by_postal=48854";

// console.log(apiURL);

var breweryContainer = document.getElementById('brewery');
var fetchButton = document.getElementById('fetch-button');
var userFormEl = document.querySelector("#zipcode-form");

var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);

    // clear old content
    repoContainerEl.textContent = "";
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
};



var getApi =function() {
  //var requestUrl = "https://api.openbrewerydb.org/breweries?by_city=grand_rapids&per_page=10";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Use the console to examine the response
      console.log(data);
      // TODO: Loop through the data and generate your HTML
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
    })
};

userFormEl.addEventListener("submit", formSubmitHandler);
fetchButton.addEventListener('click', getApi);
getApi();