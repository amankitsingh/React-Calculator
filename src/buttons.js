import React from "react";

export default function Buttons(props) {
  const clearStyle = { background: "#ac3939" },
    operatorStyle = { background: "#666666" },
    equalsStyle = {
      background: "#004466",
      position: "absolute",
      height: 130,
      bottom: 5
    };
  return (
    <div>
      <button
        className="jumbo"
        id="clear"
        onClick={props.initialize}
        style={clearStyle}
        value="AC"
      >
        AC
      </button>
      <button
        id="divide"
        value="/"
        style={operatorStyle}
        onClick={props.operators}
      >
        /
      </button>
      <button
        id="multiply"
        onClick={props.operators}
        style={operatorStyle}
        value="x"
      >
        x
      </button>
      <button id="seven" value="7" onClick={props.numbers}>
        7
      </button>
      <button id="eight" value="8" onClick={props.numbers}>
        8
      </button>
      <button id="nine" value="9" onClick={props.numbers}>
        9
      </button>

      <button
        id="subtract"
        value="-"
        style={operatorStyle}
        onClick={props.operators}
      >
        -
      </button>
      <button id="four" value="4" onClick={props.numbers}>
        4
      </button>
      <button id="five" value="5" onClick={props.numbers}>
        5
      </button>
      <button id="six" value="6" onClick={props.numbers}>
        6
      </button>

      <button
        id="add"
        value="+"
        style={operatorStyle}
        onClick={props.operators}
      >
        +
      </button>
      <button id="one" value="1" onClick={props.numbers}>
        1
      </button>
      <button id="two" value="2" onClick={props.numbers}>
        2
      </button>
      <button id="three" value="3" onClick={props.numbers}>
        3
      </button>
      <button className="jumbo" id="zero" value="0" onClick={props.numbers}>
        0
      </button>
      <button id="decimal" value="." onClick={props.decimal}>
        .
      </button>
      <button
        id="equals"
        value="="
        style={equalsStyle}
        onClick={props.evaluate}
      >
        =
      </button>
    </div>
  );
}
