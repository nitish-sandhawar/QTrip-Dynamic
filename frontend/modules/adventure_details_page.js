import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let adventureId = search.slice(11);
  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let response = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    let adventureDetails = await response.json();
    return adventureDetails;
  }catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let adventureName = document.getElementById("adventure-name");
  adventureName.innerHTML = adventure.name;

  let subTitle = document.getElementById("adventure-subtitle");
  subTitle.innerHTML = adventure.subtitle;

  let photoGallery = document.getElementById("photo-gallery");
  adventure.images.forEach(imageURL=>{
    let imageCard = document.createElement("div");
    imageCard.innerHTML = `<img src="${imageURL}" class="activity-card-image"/>`;
    photoGallery.append(imageCard);
  })

  let activityContent = document.getElementById("adventure-content");
  let para = document.createElement("p");
  para.innerText = adventure.content;
  activityContent.append(para);
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  let count = 0;
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGalleryCarousel = document.getElementById("photo-gallery");
  photoGalleryCarousel.innerHTML="";
  let carouselSlide = document.createElement("div");
  carouselSlide.classList.add("carousel", "slide");
  carouselSlide.setAttribute("data-bs-ride","carousel");
  carouselSlide.setAttribute("id","carouselIndicators");

  let carouselIndicators = document.createElement("div");
  carouselIndicators.classList.add("carousel-indicators");
  carouselIndicators.innerHTML = `<button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>`;
  carouselSlide.append(carouselIndicators);

  let carouselInner = document.createElement("div");
  carouselInner.classList.add("carousel-inner");
  images.forEach(img =>{
    let carouselItem = document.createElement("div");
    if(count === 0){
      carouselItem.classList.add("carousel-item","active");
    }else{
      carouselItem.classList.add("carousel-item");
    }
    let image = document.createElement("img");
    image.setAttribute("src", img);
    image.classList.add("d-block", "w-100", "activity-card-image");
    carouselItem.append(image);
    carouselInner.append(carouselItem);
    count++;
  })
  carouselSlide.append(carouselInner);

  let controlButton1 = document.createElement("button");
  controlButton1.classList.add("carousel-control-prev");
  controlButton1.setAttribute("type","button");
  controlButton1.setAttribute("data-bs-target","#carouselIndicators");
  controlButton1.setAttribute("data-bs-slide","prev");
  controlButton1.innerHTML = `<span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>`;
  carouselSlide.append(controlButton1);
  
  let controlButton2 = document.createElement("button");
  controlButton2.classList.add("carousel-control-next");
  controlButton2.setAttribute("type","button");
  controlButton2.setAttribute("data-bs-target","#carouselIndicators");
  controlButton2.setAttribute("data-bs-slide","next");
  controlButton2.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>`;
  carouselSlide.append(controlButton2);

  photoGalleryCarousel.append(carouselSlide);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
  }else{
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let reservationCost = adventure.costPerHead * persons;
  document.getElementById("reservation-cost").innerHTML = reservationCost;
}

//Implementation of reservation form submission
async function reservation(payload){
  let url = `${config.backendEndpoint}/reservations/new`;
  try{
    let response = await fetch(url,{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
        },
      body:JSON.stringify(payload),
    });
    let dataResponse = await response.json();
    if(dataResponse.success===true){
      alert("Success!");
    }else{
      alert("Failed!");
    }
  }catch(err){
    alert("Failed!");
  }
}
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form = document.getElementById("myForm");
  let name = form.elements["name"];
  let date = form.elements["date"];
  let person = form.elements["person"];
  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let reservationDetail = {
      name : name.value,
      date : date.value,
      person : person.value,
      adventure: adventure.id
    }
    reservation(reservationDetail);
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved === true){
    document.getElementById("reserved-banner").style.display="block";
  }
  else if(adventure.reserved === false){
    document.getElementById("reserved-banner").style.display="none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
