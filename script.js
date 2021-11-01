class Calculator {
  constructor(previousBtn, currentBtn) {
    this.previousBtn = previousBtn;
    this.currentBtn = currentBtn;
    this.clear();
  }
  clear() {
    this.previousValue = "";
    this.currentValue = "";
    this.operationValue = undefined;
  }
  delete() {
    this.currentValue = this.currentValue.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentValue.includes(".")) return;
    this.currentValue = this.currentValue.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentValue === "") return;
    if (this.previousValue != "") {
      this.process();
    }
    this.operationValue = operation;
    this.previousValue = this.currentValue;
    this.currentValue = "";
  }
  process() {
    let result;
    const prev = parseFloat(this.previousValue);
    const cur = parseFloat(this.currentValue);
    if (isNaN(prev) || isNaN(cur)) return;
    switch (this.operationValue) {
      case "+":
        result = prev + cur;
        break;
      case "-":
        result = prev - cur;
        break;
      case "x":
        result = prev * cur;
        break;
      case "÷":
        result = prev / cur;
        break;
      default:
        return;
    }
    this.previousValue = "";
    this.currentValue = result;
    this.operationValue = undefined;
  }
  getDisplayNumber(number) {
    const stringNum = number.toString();
    const intNum = parseFloat(stringNum.split(".")[0]);
    const decimalNum = stringNum.split(".")[1];
    let intDisplay;
    if (isNaN(intNum)) {
      intDisplay = "";
    } else {
      intDisplay = intNum.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalNum != null) {
      return `${intDisplay}.${decimalNum}`;
    } else {
      return intDisplay;
    }
  }
  updateDisplay() {
    this.currentBtn.innerText = this.getDisplayNumber(this.currentValue);
    if (this.operationValue != null) {
      this.previousBtn.innerText = `${this.getDisplayNumber(
        this.previousValue
      )} ${this.operationValue}`;
    } else {
      this.previousBtn.innerText = "";
    }
  }
}

const numberBtn = document.querySelectorAll("[data-number]");
const operationBtn = document.querySelectorAll("[data-operation]");
const equalBtn = document.querySelector("[data-equals]");
const clearBtn = document.querySelector("[data-all-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const previousBtn = document.querySelector("[data-previous]");
const currentBtn = document.querySelector("[data-current]");

const calculator = new Calculator(previousBtn, currentBtn);

numberBtn.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationBtn.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalBtn.addEventListener("click", () => {
  calculator.process();
  calculator.updateDisplay();
});

clearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
