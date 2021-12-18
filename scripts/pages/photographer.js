async function getPhotographers() {
  let photographers = [];

  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
      photographers = data.photographers;
    });
  return {
    photographers,
  };
}

async function getMedias() {
  let media = [];

  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
      media = data.media;
    });

  return {
    media,
  };
}

async function displayProfile(photographers) {
  const photographersHeader = document.querySelector(".photograph-header");

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const pageId = urlParams.get('id');
  const pageIdParse = JSON.parse(pageId);

  const profile = photographers.find(element => element.id === pageIdParse);

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

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayProfile(photographers);
}

init();