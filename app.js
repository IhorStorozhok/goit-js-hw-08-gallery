const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const galleryListEl = document.querySelector("ul.js-gallery");

function makeGellaryMarkup(ar) {
  const newAr = [...ar];

  const markupArr = [];
  newAr.forEach((el) => {
    markupArr.push(`<li class="gallery__item">
  <a
    class="gallery__link"
    
  >
    <img
      class="gallery__image"
      src=${el.preview}
      data-source=${el.original}
      alt=${el.description}
    />
  </a>
</li>`);
  });
  return markupArr;
}

const insertMarkup = (galleryListEl.innerHTML =
  makeGellaryMarkup(galleryItems).join(""));

function changeOpenedImagesProperties(src, alt) {
  openedImage.src = src;
  openedImage.alt = alt;
}

function getOrigins(ev) {
  changeOpenedImagesProperties(ev.target.dataset.source, ev.target.alt);
}

//function getOriginalImageUrl(ev) {
//let newUrl = ev.target.dataset.source;
//return newUrl;
//}
//function getOriginalImageAlt(ev) {
//let newAlt = ev.target.alt;
//return newAlt;
//}

const modalWindow = document.querySelector("div.lightbox");
const openedImage = document.querySelector(".lightbox__image");
const closeButton = document.querySelector("button[data-action]");
const modalOverlay = document.querySelector("div.lightbox__overlay");
const imagesList = document.querySelectorAll("img.gallery__image");
const imagesUrlList = galleryItems.map((el) => el.original);
const imagesAltsList = galleryItems.map((el) => el.description);
console.log(imagesUrlList);

function openModalWindow(ev) {
  modalWindow.classList.add("is-open");
  getOrigins(ev);
}

function closeModalWindow(ev) {
  modalWindow.classList.remove("is-open");
  openedImage.src = "";
}

function closeModalWindowByEsc(ev) {
  if (ev.code === "Escape") {
    closeModalWindow(ev);
  }
}

function getNextImageUrl(ev) {
  if (ev.code === "ArrowRight") {
    let currentImgUrlNumder = imagesUrlList.indexOf(openedImage.src);
    if (currentImgUrlNumder < imagesUrlList.length - 1) {
      changeOpenedImagesProperties(
        imagesUrlList[currentImgUrlNumder + 1],
        imagesAltsList[currentImgUrlNumder + 1]
      );
    } else openedImage.src = imagesUrlList[0];
  }
}

function getPrewImageUrl(ev) {
  console.log(ev.code);
  if (ev.code === "ArrowLeft") {
    let currentImgUrlNumder = imagesUrlList.indexOf(openedImage.src);
    if (currentImgUrlNumder > 0) {
      changeOpenedImagesProperties(
        imagesUrlList[currentImgUrlNumder - 1],
        imagesAltsList[currentImgUrlNumder - 1]
      );
    } else openedImage.src = imagesUrlList[imagesUrlList.length - 1];
  }
}

galleryListEl.addEventListener("click", openModalWindow);
closeButton.addEventListener("click", closeModalWindow);
modalOverlay.addEventListener("click", closeModalWindow);
window.addEventListener("keyup", closeModalWindowByEsc);
window.addEventListener("keyup", getNextImageUrl);
window.addEventListener("keyup", getPrewImageUrl);
