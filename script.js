const billInput = document.getElementById("input-bill");
const radioInputs = document.getElementsByName("tip-percentage");
const peopleInput = document.getElementById("total-people");
const timAmtOutput = document.getElementById("tip-amt");
const totalPeopleOutput = document.getElementById("total-tip");
const resetBtn = document.getElementById("reset-btn");

let tipPercentage = 0,
  billAmount = parseInt(billInput.value),
  totalPeople = parseInt(peopleInput.value);

const calcTip = (bill, tip, people) => {
  const tipAmtPerPerson = (bill * (tip / 100)) / people;
  const totalPerPerson = tipAmtPerPerson + bill / people;
  return [tipAmtPerPerson, totalPerPerson];
};

const updateOutput = (tipAmt, total) => {
  timAmtOutput.textContent = tipAmt.toFixed(2);
  totalPeopleOutput.textContent = total.toFixed(2);
  resetBtn.disabled = false;
};

billInput.addEventListener("input", (event) => {
  billAmount = parseInt(event.target.value);
  updateOutput(...calcTip(billAmount, tipPercentage, totalPeople));
});

radioInputs.forEach((element) => {
  element.addEventListener("input", (event) => {
    tipPercentage = parseInt(event.target.value);
    event.target.parentElement.classList.add("bg-strong-cyan");
    for (const radioInput of radioInputs) {
      if (!radioInput.checked || event.target.type === "number") {
        radioInput.parentElement.classList.remove("bg-strong-cyan");
      }
    }
    updateOutput(...calcTip(billAmount, tipPercentage, totalPeople));
  });
});

peopleInput.addEventListener("input", (event) => {
  totalPeople = parseInt(event.target.value);
  updateOutput(...calcTip(billAmount, tipPercentage, totalPeople));
});

resetBtn.addEventListener("click", (event) => {
  billInput.value = 0;
  for (const radioInput of radioInputs) {
    radioInput.checked = false;
    radioInput.parentElement.classList.remove("bg-strong-cyan");
  }
  peopleInput.value = 1;
  timAmtOutput.textContent = "0.00";
  totalPeopleOutput.textContent = "0.00";
  resetBtn.disabled = true;
  tipPercentage = 0;
  billAmount = parseInt(billInput.value);
  totalPeople = parseInt(peopleInput.value);
});
