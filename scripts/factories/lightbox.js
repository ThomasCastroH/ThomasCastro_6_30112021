export default function displayLightbox() {

    // ouvrir la lightbox et faire apparaitre le media correspondant
    const lightBox = document.querySelector("#lightbox");
    const lightBoxLink = document.querySelectorAll(".media");
    const lightBoxMediaContenair = document.querySelector("#lightbox-container");
    const lightBoxTitle = document.querySelector("#lightbox-container-title");

    // Création des éléments de la light box à partir du clic dans la galerie

    const FeedLightBox = (element) => {
        const lightBoxLinkTitle = element.nextSibling.firstChild;
        lightBoxTitle.textContent = lightBoxLinkTitle.textContent;

        const mediaLightBoxLink = element.src;
        const altTitle = element.alt;

        if (mediaLightBoxLink.includes(".jpg")) {
        const img = document.createElement("img");
        img.setAttribute("src", mediaLightBoxLink);
        img.setAttribute("alt", altTitle);
        img.dataset.id = element.dataset.id;
        lightBoxMediaContenair.appendChild(img);
        }

        if (mediaLightBoxLink.includes(".mp4")) {
        const video = document.createElement("video");
        video.setAttribute("src", mediaLightBoxLink);
        video.setAttribute("controls", "");
        video.dataset.id = element.dataset.id;
        lightBoxMediaContenair.appendChild(video);
        }
        lightBox.setAttribute("aria-hidden", "false");
        lightBox.style.visibility = "visible";
        lightBox.focus();
    };

    lightBoxLink.forEach((element) => {
        element.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            FeedLightBox(element);
        }
        });
        element.addEventListener("click", () => {
        FeedLightBox(element);
        });
    });
}
