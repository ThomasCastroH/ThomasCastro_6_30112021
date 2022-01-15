const form = document.getElementById("form");

// Regex
const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const nameRegex = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;

// Inputs
const inputIn = document.querySelectorAll('.text-control');

// close modal
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// close event
const modal = document.getElementById("contact_modal");
const closeCross = document.getElementById("close-button");

closeCross.addEventListener("click", () => {
    closeModal();
});
  
modal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
});

// Eventslisteners for all inputs
inputIn[0].addEventListener("change", isFirstnameValid);
inputIn[1].addEventListener("change", isLastnameValid);
inputIn[2].addEventListener("change", isEmailValid);
inputIn[3].addEventListener("change", isMessageValid);

// Functions
// check if firstname is valid
function isFirstnameValid() {
    if (nameRegex.test(inputIn[0].value)) {
        inputIn[0].parentElement.setAttribute("data-error-visible", "false");
        return true;
    } else {
        inputIn[0].parentElement.setAttribute("data-error-visible", "true");
        return false;
    }
}
  
// check if lastname is valid
function isLastnameValid() {
    if (nameRegex.test(inputIn[1].value)) {
        inputIn[1].parentElement.setAttribute("data-error-visible", "false");
        return true;
    } else {
        inputIn[1].parentElement.setAttribute("data-error-visible", "true");
        return false;
    }
}
  
// check if email adress is valid
function isEmailValid() {
    if (emailRegex.test(inputIn[2].value)) {
        inputIn[2].parentElement.setAttribute("data-error-visible", "false");
        return true;
    } else {
        inputIn[2].parentElement.setAttribute("data-error-visible", "true");
        return false;
    }
}

// check if message is valid
function isMessageValid() {
if (inputIn[3].value !== "") {
    inputIn[3].parentElement.setAttribute("data-error-visible", "false");
    return true;
    } else {
    inputIn[3].parentElement.setAttribute("data-error-visible", "true");
    return false;
    }
}

// check if all the form is valid
function isFormValid(e) {
    e.preventDefault();
    if (isFirstnameValid() && isLastnameValid() && isEmailValid() && isMessageValid()) {
      console.log();
      console.log();
      console.log();
    } else {
      isFirstnameValid();
      isLastnameValid();
      isEmailValid();
      isMessageValid();
    }
}

// validation event
form.addEventListener("submit", isFormValid);