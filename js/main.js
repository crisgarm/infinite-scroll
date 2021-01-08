"use strict";

const imagesContainer = document.querySelector(".js-main-container");
const loader = document.querySelector(".js-loader");
let dataResults = [];
let limit = 6;
let page = 1;

//API
function getInfoFromApi() {
  fetch(
    `https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}`
  )
    .then((response) => response.json())
    .then((data) => {
      dataResults = data;
      console.log(dataResults);
      renderImages();
    });
}
//RENDER
function renderImages() {
  dataResults.forEach((image) => {
    const divEl = document.createElement("div");
    divEl.classList.add("container");
    divEl.innerHTML = `
    <p class="container-id">${image.id}</p>
    <img src=${image.url} class="container-image" />`;

    imagesContainer.appendChild(divEl);
  });
}

getInfoFromApi();
