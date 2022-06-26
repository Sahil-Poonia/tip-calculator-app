// Cache all the input and output elements
const billElement = document.getElementById("input-bill"),
  tipElements = document.getElementsByName("tip-percentage"),
  peopleElement = document.getElementById("number-of-people"),
  tipOutputElement = document.getElementById("tip-amt-per-person"),
  totalOutputElement = document.getElementById("total-tip-per-person"),
  resetBtn = document.getElementById("reset-btn");

// necessary global variables
let bill, tip, people;

const reset = () => {
  billElement.value = "";

  // reseting all radio buttons with their styles
  tipElements.forEach((element) => {
    if (element.type === "number") element.value = "";
    element.parentElement.classList.remove("bg-strong-cyan");
    element.checked = false;
  });

  peopleElement.value = "";
  tipOutputElement.textContent = "0.00";
  totalOutputElement.textContent = "0.00";
  resetBtn.disabled = true;

  bill = 0;
  tip = 0;
  people = 1;
};

const calcTip = (billAmount, tipInPercent, people) => {
  const tipAmountPerPerson = (billAmount * (tipInPercent / 100)) / people;
  const totalPerPerson = billAmount / people + tipAmountPerPerson;
  return [tipAmountPerPerson, totalPerPerson];
};

const updateOutput = (tipAmountPerPerson, totalPerPerson) => {
  tipOutputElement.textContent = tipAmountPerPerson.toFixed(2);
  totalOutputElement.textContent = totalPerPerson.toFixed(2);
  resetBtn.disabled = false;
};

// Initialize the app
reset();

billElement.addEventListener("input", (event) => {
  bill = parseFloat(event.target.value);
  updateOutput(...calcTip(bill, tip, people));
});

tipElements.forEach((element) => {
  element.addEventListener("input", (event) => {
    tip = parseFloat(event.target.value);
    event.target.parentElement.classList.add("bg-strong-cyan");

    for (const tipElement of tipElements) {
      if (!tipElement.checked || event.target.type === "number")
        tipElement.parentElement.classList.remove("bg-strong-cyan");
    }

    updateOutput(...calcTip(bill, tip, people));
  });
});

peopleElement.addEventListener("input", (event) => {
  people = parseFloat(event.target.value);
  updateOutput(...calcTip(bill, tip, people));
});

resetBtn.addEventListener("click", (event) => {
  reset();
});
