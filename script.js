const radioInputs = document.getElementsByName("tip-percentage");
let tipPrecentage;

radioInputs.forEach((element) => {
  element.addEventListener("input", (event) => {
    tipPrecentage = parseInt(event.target.value);
    event.target.parentElement.classList.add("bg-strong-cyan");
    for (const radioInput of radioInputs) {
      if (!radioInput.checked || event.target.type === "number") {
        radioInput.parentElement.classList.remove("bg-strong-cyan");
      }
    }
  });
});
