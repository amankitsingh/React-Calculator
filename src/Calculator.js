/* eslint-disable
 no-eval */

import React from "react";

import Output from "./output";
import Formula from "./formula";
import Buttons from "./buttons";

const isOperator = /[x/+‑]/,
  endsWithOperator = /[x+‑/]$/,
  endsWithNegativeSign = /[x/+]‑$/;

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: "0",
      prevValue: "0",
      formula: "",
      currentSign: "pos",
      lastClicked: ""
    };
    this.maxDigitWarning = this.maxDigitWarning.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.initialize = this.initialize.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
  }

  maxDigitWarning() {
    this.setState({
      currentValue: "Digit Limit Met",
      prevValue: this.state.currentValue
    });
    setTimeout(
      () => this.setState({ currentValue: this.state.prevValue }),
      1000
    );
  }

  handleEvaluate() {
    if (!this.state.currentValue.includes("Limit")) {
      let expression = this.state.formula;
      while (endsWithOperator.test(expression)) {
        expression = expression.slice(0, -1);
      }
      expression = expression.replace(/x/g, "*").replace(/‑/g, "-");
      try {
        let answer =
          Math.round(1000000000000 * eval(expression)) / 1000000000000;

        this.setState({
          currentValue: answer.toString(),
          formula:
            expression.replace(/\*/g, "⋅").replace(/-/g, "‑") + "=" + answer,
          prevValue: answer,
          evaluated: true
        });
      } catch {
        this.setState({
          currentValue: "Wrong Value"
        });
      }
    }
  }

  handleOperators(e) {
    if (!this.state.currentValue.includes("Limit")) {
      const value = e.target.value;
      const { formula, prevValue, evaluated } = this.state;
      this.setState({ currentValue: value, evaluated: false });
      if (evaluated) {
        this.setState({ formula: prevValue + value });
      } else if (!endsWithOperator.test(formula)) {
        this.setState({
          prevValue: formula,
          formula: formula + value
        });
      } else if (!endsWithNegativeSign.test(formula)) {
        this.setState({
          formula:
            (endsWithNegativeSign.test(formula + value) ? formula : prevValue) +
            value
        });
      } else if (value !== "‑") {
        this.setState({
          formula: prevValue + value
        });
      }
    }
  }

  handleNumbers(e) {
    if (!this.state.currentValue.includes("Limit")) {
      const { currentValue, formula, evaluated } = this.state;
      const value = e.target.value;
      this.setState({ evaluated: false });
      if (currentValue.length > 21) {
        this.maxDigitWarning();
      } else if (evaluated) {
        this.setState({
          currentValue: value,
          formula: value !== "0" ? value : ""
        });
      } else {
        this.setState({
          currentValue:
            currentValue === "0" || isOperator.test(currentValue)
              ? value
              : currentValue + value,
          formula:
            currentValue === "0" && value === "0"
              ? formula === ""
                ? value
                : formula
              : /([^.0-9]0|^0)$/.test(formula)
              ? formula.slice(0, -1) + value
              : formula + value
        });
      }
    }
  }

  handleDecimal() {
    if (this.state.evaluated === true) {
      this.setState({
        currentValue: "0.",
        formula: "0.",
        evaluated: false
      });
    } else if (
      !this.state.currentValue.includes(".") &&
      !this.state.currentValue.includes("Limit")
    ) {
      this.setState({ evaluated: false });
      if (this.state.currentValue.length > 21) {
        this.maxDigitWarning();
      } else if (
        endsWithOperator.test(this.state.formula) ||
        (this.state.currentValue === "0" && this.state.formula === "")
      ) {
        this.setState({
          currentValue: "0.",
          formula: this.state.formula + "0."
        });
      } else {
        this.setState({
          currentValue: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + ".",
          formula: this.state.formula + "."
        });
      }
    }
  }

  initialize() {
    this.setState({
      currentValue: "0",
      prevValue: "0",
      formula: "",
      currentSign: "pos",
      lastClicked: "",
      evaluated: false
    });
  }

  render() {
    return (
      <div className="calculator">
        <Formula formula={this.state.formula.replace(/x/g, "*")} />
        <Output currentValue={this.state.currentValue} />
        <Buttons
          decimal={this.handleDecimal}
          evaluate={this.handleEvaluate}
          initialize={this.initialize}
          numbers={this.handleNumbers}
          operators={this.handleOperators}
        />
      </div>
    );
  }
}
export default Calculator;
