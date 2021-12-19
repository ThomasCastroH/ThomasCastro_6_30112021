async function getPhotographers() {
  let photographers = [];

  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
      photographers = data.photographers;
    });

  return {photographers};
}

async function displayData(photographers) {
  // Sélectionne l'élement dans lequel la carte du photographe sera affiché
  const photographersSection = document.querySelector(".photographer_section");

  // Créé une carte pour chaque photographe dans l'objet
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes et les affiche
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
