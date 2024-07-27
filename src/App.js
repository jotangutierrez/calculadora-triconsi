import React, {
  useState,
  useEffect,
  useRef
} from "react";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <div id="App">
      <Calculator />
    </div>
  );
};

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [stack, setStack] = useState("");
  const [tempStack, setTempStack] = useState("");
  const [operatorFlag, setOperatorFlag] = useState(0);
  const [result, setResult] = useState("");
  const [operatorArr, setOperatorArr] = useState("");

  const calculate = (e) => {
    const flag = e.target.value;
    if (flag === "=") {
      const calculation = eval(stack + tempStack); //using eval is risky for security. don't do this.
      setStack(String(calculation));
      setResult(String(calculation));
      setDisplay(String(calculation));
      setTempStack("");
    } else if (flag === "clear") {
      setStack("");
      setDisplay("0");
      setResult("");
      setTempStack("");
    }
  };

  return (
    <div id="calculator-wrapper">
      <TopDiv display={display} />
      <MiddleDiv calculate={calculate} />
      <BottomDiv
        operatorFlag={operatorFlag}
        setOperatorFlag={setOperatorFlag}
        operatorArr={operatorArr}
        setOperatorArr={setOperatorArr}
        tempStack={tempStack}
        setTempStack={setTempStack}
        stack={stack}
        setStack={setStack}
        display={display}
        setDisplay={setDisplay}
      />
    </div>
  );
};

const TopDiv = (props) => {
  return (
    <div id="top-div" class="partition-div">
      <h2 id="display">{props.display}</h2>
    </div>
  );
};

const MiddleDiv = (props) => {
  return (
    <div id="middle-div" className="partition-div">
      <button id="clear" value="clear" onClick={props.calculate}>
        Delete
      </button>
      <button id="equals" value="=" onClick={props.calculate}>
        =
      </button>
    </div>
  );
};

const BottomDiv = (props) => {
  const handleClick = (e) => {
    const value = e.target.value;

    //prevents multiple decimal points
    if (
      (value === "." && String(props.stack).slice(-1) == ".") ||
      (props.display.indexOf(".") != -1 && value === ".")
    ) {
      return;
    }
    //prevents numbers starting w/ multiple zeroes
    if (value === "0" && props.display === "0") {
      return;
    }

    //when operatorFlag switches, tempStack is added to stack. Used to handle operator logic correctly.
    if (!props.operatorFlag) {
      if (value == "+" || value == "/" || value == "*" || value == "-") {
        props.setOperatorFlag(1);
        props.setStack(props.stack + props.tempStack);
        props.setTempStack(value);
        props.setDisplay(value);
      } else {
        props.setTempStack(props.tempStack + value);
        props.setDisplay(props.tempStack + value);
      }
    } else {
      //if props.operatorFlag true
      //if next value is a number and tempStack needs to be added to stack
      if (value !== "+" && value !== "/" && value !== "*" && value !== "-") {
        if (props.tempStack.length > 1) {
          //handles when more than one operator in tempStack
          if (props.tempStack.slice(-1) == "-") {
            //accounts for when using negative numbers
            props.setStack(props.stack + props.tempStack.slice(-2));
            props.setTempStack(value);
            props.setDisplay(value);
            props.setOperatorFlag(0);
          } else {
            props.setStack(props.stack + props.tempStack.slice(-1));
            props.setTempStack(value);
            props.setDisplay(value);
            props.setOperatorFlag(0);
          }
        } else {
          //when only one operator in tempStack, no calculus needed
          props.setStack(props.stack + props.tempStack);
          props.setTempStack(value);
          props.setDisplay(value);
          props.setOperatorFlag(0);
        }
      } else {
        props.setTempStack(props.tempStack + value);
        props.setDisplay(props.tempStack + value);
      }
    }
  };

  return (
    <div id="bottom-div" class="partition-div">
      <div id="numbers-div">
        <button class="number" id="nine" value="9" onClick={handleClick}>
          9
        </button>
        <button class="number" id="eight" value="8" onClick={handleClick}>
          8
        </button>
        <button class="number" id="seven" value="7" onClick={handleClick}>
          7
        </button>
        <button class="number" id="six" value="6" onClick={handleClick}>
          6
        </button>
        <button class="number" id="five" value="5" onClick={handleClick}>
          5
        </button>
        <button class="number" id="four" value="4" onClick={handleClick}>
          4
        </button>
        <button class="number" id="three" value="3" onClick={handleClick}>
          3
        </button>
        <button class="number" id="two" value="2" onClick={handleClick}>
          2
        </button>
        <button class="number" id="one" value="1" onClick={handleClick}>
          1
        </button>
        <button class="number" id="zero" value="0" onClick={handleClick}>
          0
        </button>
        <button class="decimal" id="decimal" value="." onClick={handleClick}>
          .
        </button>
      </div>
      <div id="operators-div">
        <button class="operator" id="add" value="+" onClick={handleClick}>
          +
        </button>
        <button class="operator" id="subtract" value="-" onClick={handleClick}>
          -
        </button>
        <button class="operator" id="multiply" value="*" onClick={handleClick}>
          x
        </button>
        <button class="operator" id="divide" value="/" onClick={handleClick}>
          /
        </button>
      </div>
    </div>
  );
};

export default App;
