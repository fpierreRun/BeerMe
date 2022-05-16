// var requestUrl = "https://api.openbrewerydb.org/breweries?by_postal=48854";

// console.log(apiURL);

var breweryContainer = document.getElementById('brewery');
var fetchButton = document.getElementById('fetch-button');

function getApi() {
  var requestUrl = "https://api.openbrewerydb.org/breweries?by_postal=48854";

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
        breweryName.classList = "flex2"
        var breweryUrl = document.createElement("a");

        breweryName.textContent= data[i].name;
        breweryUrl.textContent = data[i].website_url;

        breweryContainer.append(breweryName);
        breweryName.append(breweryUrl);

      }
    });
}


fetchButton.addEventListener('click', getApi);
getApi();