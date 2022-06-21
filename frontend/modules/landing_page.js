import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let citiesResponse = await fetch(config.backendEndpoint + "/cities");
    let cities = await citiesResponse.json();
    return cities;
  }catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  let row = document.getElementById("data");
  let card = document.createElement("div");
  card.classList.add("col-lg-3", "col-sm-6", "col-6", "mb-4")
  card.innerHTML = `<a href = "pages/adventures/?city=${id}" id = ${id}>
                      <div class = "tile">
                        <img src="${image}" alt="${id}">
                        <div class= "tile-text">
                            <p class="header">${city}</p>
                            <p>${description}</p>
                        </div>
                      </div>
                    </a>`;
  row.append(card);
}

export { init, fetchCities, addCityToDOM };
