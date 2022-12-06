import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ChromePicker } from "react-color";

import "./styles.css";

function App() {
  const [colors, setColors] = useState(null);
  const colorPicker = (e) => {
    const newColor = {
      hex: e.hex,
      rgb: "(" + e.rgb.r + "," + e.rgb.g + "," + e.rgb.b + "," + e.rgb.a + ")",
    };
    setColors(newColor);
  };
  return (
    <div className="App">
      <h1>React Color Picker</h1>
      <h2>Chrome Picker: finding hex and rgba</h2>
      <div style={{ wodth: "50%", float: "left" }}>
        <ChromePicker
          color={colors !== null && colors.hex}
          onChange={(e) => colorPicker(e)}
          disableAlpha
          renderers={false}
        />
      </div>
      {colors !== null && (
        <React.Fragment>
          Hex: {colors.hex}
          <br />
          RGBa: {colors.rgb}
        </React.Fragment>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
