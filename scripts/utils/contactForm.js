// DOM Elements
const modalBtn = document.querySelectorAll(".contact_button");
const modal = document.getElementById("contact_modal");

// open modal
function displayModal() {
	modal.style.display = "flex";
}
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", displayModal));

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

