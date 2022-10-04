const resultDisplay = document.getElementById("result");
const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const equalsButton = document.querySelector(".equals");

class Calculator {
    constructor(actualNumber, previousNumber){
        this.previousNumber = previousNumber;
        this.actualNumber = actualNumber;

    }

    operator = "";
    typingEffect = new Audio("./sounds/iphone_typing_click.mp3");

    addNumber(number){
        if(this.actualNumber.length >= 11){
            return;
        }
        if(this.actualNumber === "" && number === "."){
            this.actualNumber = "0.";
        }
        if(this.actualNumber.includes(".") && number === "."){
            return;
        }
        if(this.actualNumber === "" && number === "0"){
            return;
        }

        this.actualNumber += number;

    }

    operation(operationType){
        if(operationType === "AC"){
            this.allClear();
        }
        if(operationType === "+/-"){
            this.actualNumber = this.actualNumber * (-1);
            this.showResult();
        }
        if(operationType === "%"){
            console.log("Procent")
            this.actualNumber = this.actualNumber / 100;
            this.showResult();
        }
        if(operationType === "+"){
            this.chooseOperator(operationType);
        }
        if(operationType === "-"){
            this.chooseOperator(operationType);
        }
        if(operationType === "X"){
            this.chooseOperator(operationType = "*");
        }
        if(operationType === "/"){
            this.chooseOperator(operationType);
        }
        if(operationType === "="){
            this.calculate(operationType);
        }
    }

    chooseOperator(actualOperator){
        this.operator = actualOperator;
        if(this.actualNumber !== ""){
            this.previousNumber = this.actualNumber;
        }else{ 
            return;
        }
        
        this.actualNumber = "";
        if(this.previousNumber === "") return;
        if(this.previousNumber !== ""){
            this.calculate();
        }

    }

    showResult(){
        resultDisplay.textContent = this.actualNumber;
        if(resultDisplay.textContent === ""){
            resultDisplay.textContent = "0";
        }
        if(this.actualNumber.length <= 11){ 
            resultDisplay.style.fontSize = `3.2rem`;
        }else if(this.actualNumber.length > 11){
            resultDisplay.style.fontSize = `2.4rem`;
        }else if(this.actualNumber.length >= 14){
            resultDisplay.style.fontSize = `1.8rem`;
        }
    }

    allClear(){
        this.actualNumber = "";
        this.previousNumber = "";
        this.operator = "";
        resultDisplay.textContent = "0";
        resultDisplay.style.fontSize = `3.2rem`;
    }

    calculate(){
        let result;
        const prev = parseFloat(this.previousNumber);
        const current = parseFloat(this.actualNumber);
        console.log(prev, this.operator, current);
        if(isNaN(prev) || isNaN(current)) return;
        if(this.operator === "+"){
            result = prev + current;
        }
        if(this.operator === "-"){
            result = prev - current;
        }
        if(this.operator === "*"){
            result = prev * current;
        }
        if(this.operator === "/"){
            result = prev / current;
        }

        this.actualNumber = String(result);
        this.previousNumber = "";
        this.operator = "";
        this.showResult();
        console.log(result)
    }

    playTypingSound(){
        this.typingEffect.play();
    }
}

let calculator = new Calculator("");

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.playTypingSound();
        calculator.addNumber(button.innerText);
        calculator.showResult();
    });
});

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.playTypingSound();
        calculator.operation(button.innerText);
    })
})

equalsButton.addEventListener("click", () => {
    calculator.playTypingSound();
    calculator.calculate();
    calculator.showResult();
})
