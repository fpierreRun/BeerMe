var requestUrl = "https://api.openbrewerydb.org/breweries?by_city=";

// console.log(apiURL);

var zipcodes = [];
var breweryContainer = document.getElementById('brewery');
var fetchButton = document.getElementById('fetch-button');
var userFormEl = document.querySelector("#zipcode-form");
var zipcodeInputEl = document.querySelector("#zipcode");
var modalContainer = document.getElementById("modal");
var modalContent = document.getElementById("modal-content");
var breweryMain = document.getElementById("brewery-main");
var mapContainer = document.getElementById("map");




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
        modalContainer.classList = ("modal is-active");
    createModal();//("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      modalContainer.classList = ("modal is-active");
    createModal();//("Unable to connect");
    });
};


var getApi =function(data) {
  if (data.length === 0) {
    
    modalContainer.classList = ("modal is-active");
    createModal();
    return;
  }
  
      for (var i=0; i< data.length; i++){
        //image for div
        var brewImage = document.createElement("img");
        
        //brewery name div
        var breweryName = document.createElement("div");
        breweryName.classList = "flex2 card-content is-align-content-space-around"

        //brewery address
        var breweryAddress = document.createElement("a");
        breweryAddress.classList = "card-content";

        //brewery url
        var breweryUrl = document.createElement("a");
        breweryUrl.classList = "card-content card-shadow"

        brewImage.classList =("card-header");
        brewImage.setAttribute("src", "./assets/Images/BeerMe.png")

        var long = document.createElement("p");
        long.textContent = data[i].longitude;
        long.classList = ("is-hidden");

        var lat = document.createElement("p");
        lat.textContent=data[i].latitude;
        lat.classList = ("is-hidden");
        
        breweryAddress.textContent = data[i].street;
        breweryName.textContent= data[i].name;
        breweryUrl.textContent = data[i].website_url;

        breweryContainer.append(brewImage);
        breweryContainer.append(breweryName);
        breweryName.append(breweryAddress);
        breweryName.append(breweryUrl);
        //breweryAddress.append(lat, lon);
        console.log(lat, long);

      }

      
  
};

var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var zipcode = zipcodeInputEl.value.trim();

  if (zipcode) {
    getBrewery(zipcode);
    //getApi(zipcode);
    zipcodes.unshift({zipcode});

    // clear old content
    //repoContainerEl.textContent = "";
    zipcodeInputEl.value = "";
  } else {
    //var error = ("Please enter a zipcode");
    modalContainer.classList = ("modal is-active");
    createModal();
  }
}


var createModal =function(){
  var modalOpen = document.createElement("div");
  modalOpen.classList = ("has-background-white modal-content box");
  modalContainer.append(modalOpen);
  modalOpen.textContent = test;
};


//modal

$(".modal-close").click(function() {
  $("html").removeClass("is-clipped");
  $(this).parent().removeClass("is-active");
});


userFormEl.addEventListener("submit", formSubmitHandler);
//fetchButton.addEventListener('click', getApi);


