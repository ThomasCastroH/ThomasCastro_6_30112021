import displayLightbox from "../factories/lightbox.js";
import mediaFactory from "../factories/media.js";
import profileFactory from "../factories/profile.js";
import addLikes from "../utils/likes.js";

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
  const modalIntro = document.getElementById("contact-me");
  const contactButton = document.getElementById("contact_button");

  contactButton.addEventListener("click", () => {
    modal.setAttribute("aria-hidden", "false");
    modal.style.display = "block";
    modalIntro.focus();
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

  // Ouverture du dropdown
  const dropdownMenu = document.querySelector("#dropdown-ul");
  const dropdownLink = document.querySelector("#dropdown-menu");
  const arrow = document.getElementById("dropdown-arrow");

  function toggleDropdown() {
    if (
        !dropdownMenu.getAttribute("style") ||
        dropdownMenu.getAttribute("style") === "display: none;"
    ) {
        dropdownMenu.style.display = "block";
        dropdownLink.setAttribute("aria-expanded", "true");
        arrow.classList.add("arrow-up");
    } else {
        dropdownMenu.style.display = "none";
        dropdownLink.setAttribute("aria-expanded", "false");
        dropdownLink.focus();
        arrow.classList.remove("arrow-up");
    }
  }

  dropdownLink.addEventListener("click", (e) => {
    e.preventDefault();
    toggleDropdown();
  });

  // choix du tri dans le dropdown
  const selected = document.getElementById("selected-choice");
  const popularity = document.getElementById("choice-popularity");
  const date = document.getElementById("choice-date");
  const title = document.getElementById("choice-title");


  // Choix de tri caché dans la light box
  const selectedChoiceHidden = () => {
    if (selected.innerHTML === popularity.innerHTML) {
      popularity.innerHTML = "Popularité" + '<div class="fas fa-chevron-up"></div>'
    } else {
      popularity.innerHTML = "Popularité";
      popularity.classList.add("dropdown-menu-li");
      popularity.setAttribute("tabindex", "0");
    }
    if (selected.innerHTML === date.innerHTML) {
      date.innerHTML = "Date" + '<div class="fas fa-chevron-up"></div>'
    } else {
      date.innerHTML = "Date";
      date.classList.add("dropdown-menu-li");
      date.setAttribute("tabindex", "0");
    }
    if (selected.innerHTML === title.innerHTML) {
      title.innerHTML = "Title" + '<div class="fas fa-chevron-up"></div>'
    } else {
      title.innerHTML = "Titre";
      title.classList.add("dropdown-menu-li");
      title.setAttribute("tabindex", "0");
    }
  };

  // Tri par nombre de like
  function sortByLike() {
    selected.innerHTML = "Popularité";
    selectedChoiceHidden();
    mediaBoxes.sort((a, b) => b.likes - a.likes);
    mediaBoxes.forEach((mediaBoxe) => {
      const mediaCard = document.getElementById(mediaBoxe.id);

      mediaSection.appendChild(mediaCard);
    });
  }
  popularity.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sortByLike();
    }
  });
  popularity.addEventListener("click", () => {
    sortByLike();
  });

  // Tri par date
  function sortByDate() {
    selected.innerHTML = "Date";
    selectedChoiceHidden();
    mediaBoxes.sort((a, b) => new Date(b.date) - new Date(a.date));
    mediaBoxes.forEach((mediaBoxe) => {
      const mediaCard = document.getElementById(mediaBoxe.id);

      mediaSection.appendChild(mediaCard);
    });
  }
  date.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sortByDate();
    }
  });
  date.addEventListener("click", () => {
    sortByDate();
  });

  // Tri par titre
  function sortByTitle() {
    selected.innerHTML = "Titre";
    selectedChoiceHidden();
    function compare(a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    }
    mediaBoxes.sort(compare);
    mediaBoxes.forEach((mediaBoxe) => {
      const mediaCard = document.getElementById(mediaBoxe.id);

      mediaSection.appendChild(mediaCard);
    });
  }
  title.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sortByTitle();
    }
  });
  title.addEventListener("click", () => {
    sortByTitle();
  });

  // Affiche chaque élément
  mediaBoxes.forEach((mediaBoxe) => {
    const mediaBox = mediaFactory(mediaBoxe);
    const mediaCardDOM = mediaBox.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });

  // Tri par nombre de like par defaut
  sortByLike();

  // Compte le nombre de like du photographe
  let totalLikes = 0;
  mediaBoxes.map((element) => {
      totalLikes += element.likes;
      return totalLikes;
  });

  // Ajout du total et du coeur à la barre fixe
  const fixedBar = document.querySelector(".fixed-bar");
  const totalLike = document.createElement("p");
  totalLike.textContent = totalLikes;
  totalLike.setAttribute("class", "total-likes");
  totalLike.setAttribute("aria-label", `${totalLikes} likes`);
  fixedBar.appendChild(totalLike);
  fixedBar.setAttribute("tabindex", 0);
  const heart = document.createElement("p");
  heart.innerHTML = '<i class="fas fa-heart"></i>';
  fixedBar.appendChild(heart);
  
  // ouvrir la lightbox et faire apparaitre le media correspondant
  const lightBox = document.querySelector("#lightbox");
  const lightBoxMediaContenair = document.querySelector("#lightbox-container");
  const lightBoxTitle = document.querySelector("#lightbox-container-title");
  const prevArrow = document.getElementById("lightbox-prev");
  const nextArrow = document.getElementById("lightbox-next");

  // Création des nouveaux éléments (titres, images, vidéo) à partir du tableau lors de la
  // navigation fléchée

  // Element précédent
  const Previous = () => {
    let mediaLightBox = document.querySelector(".lightbox-container").firstChild;
    const result = mediaBoxes.find((element) => element.id === parseInt(mediaLightBox.dataset.id, 10));
    let i = mediaBoxes.indexOf(result);

    if (i === 0) {
      i = mediaBoxes.length;
    }
    const prevMedia = mediaBoxes[i - 1];

    if (prevMedia.image) {
      const newDisplayImage = prevMedia.image;
      const picture = `./assets/images/${newDisplayImage}`;
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", prevMedia.title);
      img.dataset.id = mediaBoxes[i - 1].id;

      lightBoxMediaContenair.innerHTML = "";
      lightBoxMediaContenair.appendChild(img);
      lightBoxTitle.textContent = prevMedia.title;
    }
    if (prevMedia.video) {
      const newDisplayVideo = prevMedia.video;
      const movie = `./assets/images/${newDisplayVideo}`;
      const videoDisplay = document.createElement("video");
      videoDisplay.setAttribute("src", movie);
      videoDisplay.setAttribute("controls", "");
      videoDisplay.setAttribute("aria-label",prevMedia.title);
      videoDisplay.dataset.id = mediaBoxes[i - 1].id;

      lightBoxMediaContenair.innerHTML = "";
      lightBoxMediaContenair.appendChild(videoDisplay);
      lightBoxTitle.textContent = prevMedia.title;
    }

    mediaLightBox = document.querySelector(".lightbox-container").firstChild;
  };

  // Element suivant
  const Next = () => {
    let mediaLightBox = document.querySelector(
      ".lightbox-container"
    ).firstChild;

    const result = mediaBoxes.find((element) => element.id === parseInt(mediaLightBox.dataset.id, 10));

    let i = mediaBoxes.indexOf(result);

    if (i === mediaBoxes.length - 1) {
      i = -1;
    }
    const nextMedia = mediaBoxes[i + 1];

    if (nextMedia.image) {
      const newDisplayImage = nextMedia.image;
      const picture = `./assets/images/${newDisplayImage}`;
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", nextMedia.title);
      img.dataset.id = mediaBoxes[i + 1].id;

      lightBoxMediaContenair.innerHTML = "";
      lightBoxMediaContenair.appendChild(img);
      lightBoxTitle.textContent = nextMedia.title;
    }
    if (nextMedia.video) {
      const newDisplayVideo = nextMedia.video;
      const movie = `./assets/images/${newDisplayVideo}`;
      const videoDisplay = document.createElement("video");
      videoDisplay.setAttribute("src", movie);
      videoDisplay.setAttribute("controls", "");
      videoDisplay.setAttribute("aria-label", nextMedia.title);
      videoDisplay.dataset.id = mediaBoxes[i + 1].id;

      lightBoxMediaContenair.innerHTML = "";
      lightBoxMediaContenair.appendChild(videoDisplay);
      lightBoxTitle.textContent = nextMedia.title;
    }

    mediaLightBox = document.querySelector(".lightbox-container").firstChild;
  };
  // Evenements de la lightbox
  lightBox.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      Next();
    }
  });

  lightBox.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      Previous();
    }
  });
  nextArrow.addEventListener("click", () => {
    Next();
  });

  prevArrow.addEventListener("click", () => {
    Previous();
  });
  
  addLikes(totalLikes);
  displayLightbox();
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