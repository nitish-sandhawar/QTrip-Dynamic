
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
   let city = search.slice(6)
   return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let cityResponse = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    let cityAdventure = await cityResponse.json();
    return cityAdventure;
  }catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let row = document.getElementById("data");
  adventures.forEach(activity =>{
    let {id, category, image, name, costPerHead, duration} = activity;
    let card = document.createElement("div");
    card.classList.add("col-lg-3", "col-sm-6", "col-6", "mb-4");
    card.innerHTML = `<a href = "detail/?adventure=${id}" id = "${id}">
                       <div class = "activity-card">
                        <div class = "category-banner">${category}</div>
                         <img src="${image}" alt="${id}">
                         <div class = "d-flex justify-content-between w-100 pt-2 pb-1">
                           <div class= "ps-2 h6">${name}</div>
                           <div class= "pe-2">&#8377;${costPerHead}</div>
                         </div>
                         <div class= "d-flex justify-content-between w-100 pt-1 pb-2">
                           <div class= "ps-2 h6">Duration</div>
                           <div class= "pe-2">${duration} hours</div>
                         </div>
                       </div>
                      </a>`;
    row.append(card);
  })
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList = list.filter(adventures =>{
    return (adventures.duration >= low && adventures.duration <= high);
  })
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = list.filter(adventures =>{
    return categoryList.includes(adventures.category)
  })
  return filteredList;
}

//filtering by duration and category both
function filterByCategoryAndDuration(list, low, high, categoryList){
  let filteredList = list.filter(adventures=>{
    return adventures.duration >= low && adventures.duration <= high && categoryList.includes(adventures.category)
  })
  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if(filters.duration && filters.category.length ===0){
    let range = filters.duration.split("-")
    let low = parseInt(range[0]);    //duration lowest range
    let high = parseInt(range[1]);   // duration highest range
    let filteredList = filterByDuration(list, low, high)
    return filteredList
  }
  // Place holder for functionality to work in the Stubs
  else if(filters.category.length !==0 && !filters.duration){
    let categoryList = filters.category
    console.log(categoryList)
    let filteredList = filterByCategory(list,categoryList);
    return filteredList;
  }
  else if(filters.duration && filters.category.length !==0){
    let range = filters.duration.split("-")
    let low = parseInt(range[0]);    //duration lowest range
    let high = parseInt(range[1]);
    let categoryList = filters.category;
    console.log(low, high, categoryList)
    let filteredList = filterByCategoryAndDuration(list, low, high, categoryList);
    return filteredList;
  }
    return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters))
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(window.localStorage.getItem("filters"));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  if(filters.category.length!==0){
    let categoryPillsSpace = document.getElementById("category-list")
    filters.category.forEach(category =>{
      let categoryPills = document.createElement("div");
      categoryPills.classList.add("category-filter");
      categoryPills.innerText = category;
      categoryPillsSpace.append(categoryPills);
    })
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
