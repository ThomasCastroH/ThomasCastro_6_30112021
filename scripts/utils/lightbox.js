const lightBox = document.getElementById("lightbox");
const lightBoxClose = document.getElementById("lightbox-close");
const lightBoxMediaContenair = document.querySelector("#lightbox-container");

function closeLightBox() {
  lightBox.setAttribute("aria-hidden", "true");
  lightBox.style.visibility = "hidden";
  lightBoxMediaContenair.innerHTML = "";
}

lightBoxClose.addEventListener("click", () => {
  closeLightBox();
});

lightBox.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightBox();
  }
});

lightBoxClose.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    lightBoxMediaContenair.focus();
  }
});