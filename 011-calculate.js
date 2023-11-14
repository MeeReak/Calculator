class Calculator {
  constructor(displayPre, displayCur) {
    this.displayPre = displayPre;
    this.displayCur = displayCur;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.preveiwOperand = "";
    this.operator = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number == "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  appendOperator(operator) {
    if (this.currentOperand == "") return;
    if (this.preveiwOperand != "") {
      this.compute();
    }
    this.operator = operator;
    this.preveiwOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let total;
    const prev = parseFloat(this.preveiwOperand);
    const curr = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operator) {
      case "+":
        total = prev + curr;
        break;
      case "-":
        total = prev - curr;
        break;
      case "*":
        total = prev * curr;
        break;
      case "÷":
        total = prev / curr;
        break;
      default:
        return;
    }
    this.currentOperand = total;
    this.operator = undefined;
    this.preveiwOperand = "";
  }

  getDisplayNumber(number) {
    const stringNum = number.toString();
    const integer = parseFloat(stringNum.split(".")[0]);
    const decimal = stringNum.split(".")[1];
    let integerDispaly;
    if (isNaN(integer)) {
      integerDispaly = "";
    } else {
      integerDispaly = integer.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimal != null) {
      return `${integer}.${decimal}`;
    } else {
      return integerDispaly;
    }
  }

  update() {
    this.displayCur.innerHTML = this.getDisplayNumber(this.currentOperand);
    if (this.operator != null) {
      this.displayPre.innerHTML = `${this.getDisplayNumber(
        this.preveiwOperand
      )} ${this.operator}`;
    }else{
      this.displayPre.innerHTML = ''
    }
  }
}

const displayPre = document.querySelector(".pre-number");
const displayCur = document.querySelector(".cur-number");
const numberbtn = document.querySelectorAll(".btnNumber");
const operateBtn = document.querySelectorAll(".btnOperate");
const allClearBtn = document.querySelector(".btnAllClear");
const deleteBtn = document.querySelector(".btnDelete");
const equalBtn = document.querySelector(".btnEqual");

const calculator = new Calculator(displayPre, displayCur);

numberbtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.appendNumber(btn.innerHTML);
    calculator.update();
  });
});

operateBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.appendOperator(btn.innerHTML);
    calculator.update();
  });
});

equalBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.update();
});

deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.update();
});

allClearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.update();
});
