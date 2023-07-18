//selecting elements
const input = document.querySelectorAll("input");
const form = document.querySelector(".form");
const cardHolderName = document.querySelector(".card__name");
const cardNumber = document.querySelector(".card__number");

//regex expression
const onlyNumber = /^[\d]+$/;

//show error message
const showErrorMessage = function (input, msg) {
  const inputBorder = input.parentElement;
  const ShowErrorElement = input.parentElement.nextElementSibling;

  //make the border of input red
  inputBorder.style.background = "var(--color-red)";

  if (ShowErrorElement.classList.contains("error-msg")) {
    // show error message
    ShowErrorElement.classList.remove("hidden");
    ShowErrorElement.textContent = `${msg}`;
  } else if (
    ShowErrorElement.nextElementSibling.classList.contains("error-msg")
  ) {
    ShowErrorElement.nextElementSibling.classList.remove("hidden");
    ShowErrorElement.nextElementSibling.textContent = `${msg}`;
  }
};

//hide the error message
const hideErrorMessage = function (input) {
  const ShowErrorElement = input.parentElement.nextElementSibling;

  if (ShowErrorElement.classList.contains("error-msg")) {
    ShowErrorElement.classList.add("hidden");
  }
};

//displaying the cardHolderName in the credit card image
const displayCardHolderName = function (input) {
  cardHolderName.textContent = `${input.value}`;
};

//displaying the card number the credit card image
const displayCardNumber = function (input) {
  console.log(input.value);
};

input.forEach(function (input) {
  //adding the active border color css varibale when the input is clicked
  input.addEventListener("click", function () {
    input.parentElement.style.background =
      "linear-gradient(to right,var(--linear-gradient-active-border))";
  });
});

//form validation
form.addEventListener("submit", function (e) {
  //hide error message
  input.forEach(function (input) {
    hideErrorMessage(input);
  });

  input.forEach(function (input) {
    console.log("clicked");
    //when the input field is empty
    if (input.value === "") {
      e.preventDefault();
      showErrorMessage(input, "can't be blank");
    } //test for only numbers
    else if (input.name !== "cardholder-name") {
      if (input.value !== "" && !onlyNumber.test(input.value)) {
        e.preventDefault();

        showErrorMessage(input, "Wrong format,numbers only");
      } //display a cardholdername
    } else if (input.name === "cardholder-name" && input.value !== "") {
      e.preventDefault();
      displayCardHolderName(input);
    }
    console.log(input.name === "card-number");
  });
});
