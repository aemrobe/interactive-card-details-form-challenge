// //selecting elements
// const input = document.querySelectorAll("input");
// const form = document.querySelector(".form");
// const cardHolderName = document.querySelector(".card__name");
// const cardNumber = document.querySelector(".card__number");

// //regex expression
// const onlyNumber = /^[\d]+$/;

// //show error message
// const showErrorMessage = function (input, msg) {
//   const inputBorder = input.parentElement;
//   const ShowErrorElement = input.parentElement.nextElementSibling;

//   //make the border of input red
//   inputBorder.style.background = "var(--color-red)";

//   if (ShowErrorElement.classList.contains("error-msg")) {
//     // show error message
//     ShowErrorElement.classList.remove("hidden");
//     ShowErrorElement.textContent = `${msg}`;
//   } else if (
//     ShowErrorElement.nextElementSibling.classList.contains("error-msg")
//   ) {
//     ShowErrorElement.nextElementSibling.classList.remove("hidden");
//     ShowErrorElement.nextElementSibling.textContent = `${msg}`;
//   }
// };

// //hide the error message
// const hideErrorMessage = function (input) {
//   const ShowErrorElement = input.parentElement.nextElementSibling;

//   if (ShowErrorElement.classList.contains("error-msg")) {
//     ShowErrorElement.classList.add("hidden");
//   }
// };

// //displaying the cardHolderName in the credit card image
// const displayCardHolderName = function (input) {
//   cardHolderName.textContent = `${input.value}`;
// };

// //displaying the card number the credit card image
// const displayCardNumber = function (input) {
//   console.log(input.value);
// };

// //form validation
// form.addEventListener("submit", function (e) {
//   //hide error message
//   input.forEach(function (input) {
//     hideErrorMessage(input);
//   });

//   input.forEach(function (input) {
//     console.log("clicked");
//     //when the input field is empty
//     if (input.value === "") {
//       e.preventDefault();
//       showErrorMessage(input, "can't be blank");
//     } //test for only numbers
//     else if (input.name !== "cardholder-name") {
//       if (input.value !== "" && !onlyNumber.test(input.value)) {
//         e.preventDefault();

//         showErrorMessage(input, "Wrong format,numbers only");
//       } //display a cardholdername
//     } else if (input.name === "cardholder-name" && input.value !== "") {
//       e.preventDefault();
//       displayCardHolderName(input);
//     } else if (input.name === "card-number") {
//       e.preventDefault();
//       console.log("hello");
//     }
//   });
// });

//selecting elements
//inputFields
const nameField = document.querySelector('input[name="cardholder-name"]');
const NumberField = document.querySelector('input[name="card-number"]');
const expMonthField = document.querySelector('input[name="card-month"]');
const expYearFeild = document.querySelector('input[name="card-year"]');
const cvcField = document.querySelector('input[name= "CVC"]');

//form element
const form = document.querySelector("form");

//thank you card
const thankyouCard = document.querySelector(".thankyou");

//element on the credit card image
const cardName = document.querySelector(".card__name");
const cardNumber = document.querySelector(".card__number");
const cardExpMonth = document.querySelector(".card__exp-month");
const cardExpYear = document.querySelector(".card__exp-year");

//displaying the cardHolderName in the credit card image
const displayValue = function (field, value) {
  field.cardElement && (field.cardElement.textContent = `${value}`);
};

// individual focussed validator functions. Test one condition each
// return an error message if validation fails
function validateRequried(value) {
  return value === "" ? `fill the blank` : null;
}

function validateNumeric(value) {
  return /^[\d]+$/.test(value) ? null : "Wrong format, numbers only";
}

function validateBetween(min, max) {
  return function (value) {
    return value < min || value > max ? "out of bounds" : null;
  };
}

// Run a set of validators on a value, return the first error message found
function validateField(validators, value) {
  for (const validator of validators) {
    const error = validator(value);
    if (error) return error;
  }

  return null;
}

//show error message
function showError(field, message) {
  // logic here to set the `aria-invalid` state of the field and add the correct error message text

  //setting the input element border red
  field.parentElement.style.background = "var(--color-red)";

  //setting aria invalid state
  field.setAttribute("aria-invalid", "true");

  //selecting the element which shows us the error message
  const showErrorElement = field.parentElement.nextElementSibling;

  if (showErrorElement.classList.contains("error-msg")) {
    // show error message for the input elements except the input with name of card month
    showErrorElement.classList.remove("hidden");
    showErrorElement.textContent = `${message}`;
  }
}

//hide the error message
const hideErrorMessage = function (field) {
  //selecting the element which shows us the error message
  const ShowErrorElement = field.parentElement.nextElementSibling;

  //remove the `aria-invalid` state
  field.setAttribute("aria-invalid", "false");

  //changing the color of the border of input
  field.parentElement.style.background = "var(--Light-grayish-violet)";

  //hiding the error message
  if (ShowErrorElement.classList.contains("error-msg")) {
    ShowErrorElement.classList.add("hidden");
  }
};

// array associating the fields with the specific set of validators
const fields = [
  { element: nameField, cardElement: cardName, validators: [validateRequried] },
  {
    element: NumberField,
    cardElement: cardNumber,
    validators: [validateRequried, validateNumeric],
  },
  {
    element: expMonthField,
    cardElement: cardExpMonth,
    validators: [validateRequried, validateNumeric, validateBetween(1, 12)],
  },
  {
    element: expYearFeild,
    cardElement: cardExpYear,
    validators: [validateRequried, validateNumeric],
  },
  { element: cvcField, validators: [validateRequried, validateNumeric] },
];

//display the card details update in a real-time
fields.forEach(function (field) {
  field.element.addEventListener("keyup", function () {
    if (field.element.name === "card-number") {
      const inputValue = field.element.value;

      const chunks = [];

      for (let i = 0; i < inputValue.length; i += 4) {
        chunks.push(inputValue.slice(i, i + 4));
      }
      console.log();

      //display the value of the card number
      displayValue(field, chunks.join(" "));
    } else {
      displayValue(field, field.element.value);
    }
  });
});

//sumbmit handler
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formErrors = [];

  for (const field of fields) {
    //calling the validate function on the value of the input
    const fieldError = validateField(field.validators, field.element.value);

    if (fieldError) {
      formErrors.push(fieldError);
      showError(field.element, fieldError);
    } else {
      hideErrorMessage(field.element);
    }
  }

  //when form is valid
  if (formErrors.length === 0) {
    thankyouCard.classList.remove("hidden");
    form.classList.add("hidden");
  } else {
    // form is invalid, maybe show a message next to the submit button
  }
});
