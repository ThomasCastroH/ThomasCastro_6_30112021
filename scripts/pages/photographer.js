async function getPhotographers() {
  let photographers = [];

  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
      photographers = data.photographers;
    });
    
  return {photographers};
}

async function getMedias() {
  let media = [];

  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
      media = data.media;
    });

  return {media};
}

async function displayProfile(photographers) {
  // Sélectionne l'élement dans lequel le profile sera affiché
  const photographersHeader = document.querySelector(".photograph-header");

  // Récupère l'id du photographe dans l'URL
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const pageId = urlParams.get('id');
  const pageIdParse = JSON.parse(pageId);

  // Récupère les datas correspondant à l'id du photographe
  const profile = photographers.find(photographer => photographer.id === pageIdParse);

  // Affiche le profile du photographe
  const photographersProfile = profileFactory(profile);
  const userProfileDOM = photographersProfile.getUserProfileDOM();
  photographersHeader.appendChild(userProfileDOM);

  // Ouverture de la modale
  const modal = document.getElementById("contact_modal");
  const contactButton = document.getElementById("contact_button");

  contactButton.addEventListener("click", () => {
    modal.setAttribute("aria-hidden", "false");
    modal.style.display = "block";
  });
}

async function displayMedia(media) {
  // Sélectionne l'élément dans lequel la galerie sera affichée
  const mediaSection = document.querySelector(".photograph-media");

  // Récupère l'id du photographe dans l'URL
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const pageId = urlParams.get('id');
  const pageIdParse = JSON.parse(pageId);

  // Récupère les éléments en gardant uniquement ceux correspondant à l'id du photographe
  const mediaBoxes = media.filter(media => media.photographerId === pageIdParse);

  // Affiche chaque élément
  mediaBoxes.forEach((mediaBoxe) => {
    const mediaBox = mediaFactory(mediaBoxe);
    const mediaCardDOM = mediaBox.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes et les affiche
  const { photographers } = await getPhotographers();
  displayProfile(photographers);

  // Récupère les datas des photos & vidéos et les affiche
  const { media } = await getMedias();
  displayMedia(media);
}

init();