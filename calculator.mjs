import operations from './operations.mjs';

//--------------------------------------------------------

const viewCalculation = {
    calculationFormulation: document.getElementById('calculationFormulation'),
    numberPresentation: document.getElementById('numberPresentation')
};

const action = {
    allClear: document.getElementById('allClear'),
    clear: document.getElementById('clear'),
    backSpace: document.getElementById('backSpace')
};

const operators = {
    sum: document.getElementById('sum'),
    subtraction: document.getElementById('subtraction'),
    division: document.getElementById('division'),
    multiplication: document.getElementById('multiplication'),
    result: document.getElementById('result')
};

const operand = document.getElementsByClassName('operand');

const signalChange = document.getElementById('signalChange');

const comma = document.getElementById('comma');

//--------------------------------------------------------


const globalVariables = {
    numberOfCharactersAllowed: 10,
    formattedNumbers: '',
    values: [],
    operators: []    
}

const Value = {
    signal: '',
    integer: '',
    comma: '',
    decimal: '',
    toNumber(){
        return `${this.signal}${this.integer}${this.comma}${this.decimal}`
    }
};

//--------------------------------------------------------

function clear (){
  Value.signal = '';
  Value.integer = '';
  Value.comma = '';
  Value.decimal = '';
  // presentNumber();
  viewCalculation.numberPresentation.innerText = '0';
  // values = []
}

function clearAll (){
  clear();
  viewCalculation.calculationFormulation.textContent = '0';
}

function maximumNumberOfCharactersAllowedReached () {
    let amountOfCharactersValueInteger = (Value.integer).toString().length;
    let amountOfCharactersValueDecimal = (Value.decimal).toString().length;
    let totalCaracters = amountOfCharactersValueInteger + amountOfCharactersValueDecimal;
    return totalCaracters >= globalVariables.numberOfCharactersAllowed ? true : false;
}

function includeNumber (btnClicked) {
    const numberClicked = btnClicked.target.innerHTML;
    // console.log(numberClicked)
    if (!maximumNumberOfCharactersAllowedReached()) {
        if (Value.comma === '') {
            Value.integer = Value.integer + numberClicked;
            // presentNumber();
        } else {
            Value.decimal = Value.decimal + numberClicked;
            // presentNumber();
        }
    } else {
        alert('Número máximo de caracteres permitidos alcançado');
    }
}

function includeNumbers(){
    globalVariables.values.push(Value.toNumber())
    clear()
}

function includeOperator(event){
  const selectedOperator = event.target.id
  globalVariables.operators.push(selectedOperator)
  includeNumbers()
}

function changeSign () {
  switch(Value.signal){
  case '':
      Value.signal = '-';
      break;
  case '-':
      Value.signal = '+';
      break;
  case '+':
      Value.signal = '-';
      break; 
  }
}

function includeComma () {
    Value.comma = ',';
    // presentNumber();
}

// Ao clicar no sinal de igual deve-se incluir na 'expressão'
// o último número digitado
function calculateExpression(){
  console.log(globalVariables.values, globalVariables.operators)
}


//--------------------------------------------------------

// Value.integer = '4566'
// Value.comma = ','
// Value.decimal = '5323'

// globalVariables.values.push(Value.toNumber())

// Value.integer = '4566'
// Value.comma = ''
// Value.decimal = ''

// globalVariables.values.push(Value.toNumber())

// console.log(globalVariables.values)

//--------------------------------------------------------

for (const iterator of operand) {
    iterator.addEventListener('click', includeNumber);
}

signalChange.addEventListener('click', changeSign);

comma.addEventListener('click', includeComma);

action.clear.addEventListener('click', clear);

action.allClear.addEventListener('click', clearAll);

// action.backSpace.addEventListener('click', bsPresentNumber);

operators.sum.addEventListener('click', includeOperator);

operators.subtraction.addEventListener('click', includeOperator);

operators.division.addEventListener('click', includeOperator);

operators.multiplication.addEventListener('click', includeOperator);

operators.result.addEventListener('click', calculateExpression)

//--------------------------------------------------------

