import './App.css';
import React from 'react';

function App() {
  const [answer, setAnswer] = React.useState("")
  let operators = ["+", "-", "*", "/"]
  //let postfix_array = []

  function handleOperand(event){
    setAnswer(prevAnswer => {
      let newAnswer = prevAnswer + event.target.value;

      if ((operators.includes(newAnswer.charAt(newAnswer.length - 1))) && (operators.includes(newAnswer.charAt(newAnswer.length - 2)))) {
        newAnswer = newAnswer.slice(0, -1)
      }

      return newAnswer;
  });
} //perform the check i want inside the callback, where prevanswer reflects most uptodate state right **before** new value is added.
//newAnswer now contains the latest change.
//MUST return newAnswer so react knows this is what the new state should be.
//could also use useeffect here to check each time answer changes. 
  //yt tutorial at end to see best practice 


  function handleDelete(){
    setAnswer(prevAnswer => prevAnswer.substring(0, prevAnswer.length -1))
  }

  function handleAC() {
    setAnswer("")
  }

  function getPrecedence(op) {
    if (op === "+" || op === "-") return 1;
    if (op === "*" || op === "/") return 2;
    }

  function infix_postfix() {
    let tokens = answer.split(/([+\-*/])/)
    let operators = ["+", "-", "*", "/"]

    let opStack = []
    let queue = []

      for (let i = 0; i < tokens.length; i ++) {
          if (tokens[i].match(/\d+/g)) {
              queue.push(Number(tokens[i]))

          } else if (operators.includes(tokens[i])) { 
              if (opStack.length && (getPrecedence(tokens[i])) >= (getPrecedence(opStack.at(-1)))) {
                  queue.push(tokens[i])
              } else if (opStack.length && (getPrecedence(tokens[i])) <= (getPrecedence(opStack.at(-1)))) {
                  queue.push(opStack.at(-1))
                  opStack.splice(-1, 1)
                  opStack.push(tokens[i])
              } else {
                  opStack.push(tokens[i])
              }
          }
      }
      let postfix_array = (queue.concat(opStack))
      console.log(postfix_array)
      return postfix_array
      
  }

  function evaluate(postfix) {
    let stack = []

    for (let i=0; i < postfix.length; i++) {

        if (!operators.includes(postfix[i])) {
            stack.push(postfix[i])
            console.log(stack)
        }

        if (operators.includes(postfix[i])) {
            if (postfix[i] === "+") {
                let result = Number(stack.at(-2) + stack.at(-1))
                stack.splice(-2, 2)
                stack.push(result)
            } else if ((postfix[i] === "-")) {
                let result = Number(stack.at(-2) - stack.at(-1))
                stack.splice(-2, 2)
                stack.push(result)
            } else if ((postfix[i] === "*")) {
                let result = Number(stack.at(-2) * stack.at(-1))
                stack.splice(-2, 2)
                stack.push(result)
            } else if ((postfix[i] === "/")) {
                let result = Number(stack.at(-2) / stack.at(-1))
                stack.splice(-2, 2)
                stack.push(result)
            }
        console.log(stack)
        setAnswer(stack)
        }
    }  
}
  function handleOperation() {
    let output = infix_postfix()
    evaluate(output)
    }

  return (
    <div>
      <input className="display" 
      type="text"
      value={answer === "" ? 0 : answer}
      />

    <div className="container">
      <button value="AC" onClick={handleAC}>AC</button>
      <button value="DE" onClick={handleDelete}>DE</button>
      <button value="%">%</button>
      <button value="+/-">+/-</button>
      <button value="MR">MR</button>
      <button value="MC">MC</button>
      <button value="M+">M+</button>
      <button value="M-">M</button>
      <button value="/" onClick={handleOperand}>/</button>
      <button value="7" onClick={handleOperand}>7</button>
      <button value="8" onClick={handleOperand}>8</button>
      <button value="9" onClick={handleOperand}>9</button>
      <button value="*" onClick={handleOperand}>*</button>
      <button value="4" onClick={handleOperand}>4</button>
      <button value="5" onClick={handleOperand}>5</button>
      <button value="6" onClick={handleOperand}>6</button>
      <button value="-" onClick={handleOperand}>-</button>
      <button value="1" onClick={handleOperand}>1</button>
      <button value="2" onClick={handleOperand}>2</button>
      <button value="3" onClick={handleOperand}>3</button>
      <button value="+" onClick={handleOperand}>+</button>
      <button value="0" onClick={handleOperand}>0</button>
      <button value=".">.</button>
      <button value="=" onClick={handleOperation}>=</button>
    </div>
    </div>
  )
}
 

export default App;
