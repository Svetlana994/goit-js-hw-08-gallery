import images from './gallery-items.js';

const galleryList = document.querySelector(".js-gallery");
const lightbox = document.querySelector(".js-lightbox");
const origImage = document.querySelector(".lightbox__image");
const btnClose = document.querySelector('[data-action="close-lightbox"]');
const overlay = document.querySelector('.lightbox__overlay');

galleryList.addEventListener('click', OnOpenModal);
btnClose.addEventListener('click', onCloseModal);
overlay.addEventListener('click', onBackdropClick);


function createGallery(images) {
    return images.map(({preview, original, description}) => {
        return  `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
   }).join('')
}

const createMarkUp = createGallery(images)

galleryList.insertAdjacentHTML('beforeend', createMarkUp);

function OnOpenModal(event) {
  event.preventDefault();
    
  if (!event.target.classList.contains('gallery__image')) {
    return
  }

  lightbox.classList.add('is-open');
  origImage.src = event.target.getAttribute("data-source");
  
  window.addEventListener('keyup', onEscPress);

  
}

function arrowClick(arrows) {
  if (arrows === "ArrowRight") {
  for (let i = 0; i < images.length; i++) {
    if (origImage.src === images[i].original && i < images.length - 1) {
      origImage.src = images[i + 1].original;
      break
    }
  }
  }
  else {
    for (let i = 0; i < images.length; i++) {
    if (origImage.src === images[i].original && i > 0) {
      origImage.src = images[i - 1].original;
      break
    }
  }
  }
}

function onCloseModal() {
  lightbox.classList.remove("is-open");
  origImage.src = "";

  window.removeEventListener("keyup", onEscPress);
}

function onEscPress(event) {
  if (event.code === "Escape") {
    onCloseModal();
  }

  if(event.code === 'ArrowRight' || event.code === 'ArrowLeft') {
  arrowClick(event.code)
  }
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}