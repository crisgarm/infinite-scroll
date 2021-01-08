"use strict";

const imagesContainer = document.querySelector(".js-main-container");
const loader = document.querySelector(".js-loader");
let dataResults = [];
let limit = 10;
let page = 1;

//API
function getInfoFromApi() {
  fetch(`
  https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
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
    <p class="container-author">${image.author}</p>
    <img src=${image.download_url} class="container-image" />`;

    imagesContainer.appendChild(divEl);
  });
}

//Show loader & fetch more images
function showLoader() {
  loader.classList.add("show");
  setTimeout(() => {
    loader.classList.remove("show");
    setTimeout(() => {
      page += 1;
      getInfoFromApi();
    }, 300);
  }, 1000);
}

//Scroll
function showScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 10) {
    showLoader();
  }
}

window.addEventListener("scroll", showScroll);
getInfoFromApi();
