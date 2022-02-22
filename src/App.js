import logo from "./logo.svg";
import "./App.css";
import RangeSlider from "./components/RangeSlider";
import { useState } from "react";

function App() {
  const [shiftRight, setShiftRight] = useState(0);
  const [shiftDown, setShiftDown] = useState(0);
  const [spread, setSpread] = useState(3);
  const [blur, setBlur] = useState(5);
  const [opacity, setOpacity] = useState(20);
  const [code, setCode] = useState([
    `rgba(0,0,0,${
      opacity / 100
    }) ${shiftRight}px ${shiftDown}px ${blur}px ${spread}px`,
  ]);

  const [shadowList, setShadowList] = useState([
    {
      shiftRight,
      shiftDown,
      spread,
      blur,
      opacity,
    },
  ]);

  const [selectLayer, setSelectLayer] = useState(0);

  const [color, setColor] = useState("#000000");

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleAddLayer = () => {
    const data = {
      shiftRight: 0,
      shiftDown: 0,
      spread: 3,
      blur: 5,
      opacity: 20,
    };

    setShadowList([...shadowList, data]);
    setCode([...code, "rgba(0,0,0,0.2) 0px 0px 5px 3px"]);
  };

  const handleDeleteLayer = (index) => {
    if (shadowList.length > 1) {
      let newData = [...shadowList];
      newData.splice(index, 1);
      setShadowList(newData);

      let newCode = [...code];
      newCode.splice(index, 1);
      setCode(newCode);

      setSelectLayer(selectLayer == 0 ? 0 : selectLayer - 1);
    }
  };

  const handleSelectLayer = (item, index) => {
    const data = [...shadowList];
    data[selectLayer] = {
      shiftRight,
      shiftDown,
      spread,
      blur,
      opacity,
    };
    setShadowList(data);

    setShiftRight(item.shiftRight);
    setShiftDown(item.shiftDown);
    setSpread(item.spread);
    setBlur(item.blur);
    setOpacity(item.opacity);
    setSelectLayer(index);
  };

  return (
    <div className="App">
      <div className="slider_list">
        <h2>Box-Shadow CSS Generator</h2>
        <RangeSlider
          label="Shift right"
          onChange={(e) => setShiftRight(e.target.value)}
          value={shiftRight}
          min={-50}
          max={50}
        />
        <RangeSlider
          label="Shift down"
          onChange={(e) => setShiftDown(e.target.value)}
          value={shiftDown}
          min={-50}
          max={50}
        />
        <RangeSlider
          label="Spread"
          onChange={(e) => setSpread(e.target.value)}
          value={spread}
          min={0}
          max={100}
        />
        <RangeSlider
          label="Blur"
          onChange={(e) => setBlur(e.target.value)}
          value={blur}
          min={0}
          max={100}
        />
        <RangeSlider
          label="Opacity"
          onChange={(e) => setOpacity(e.target.value)}
          value={opacity}
          min={0}
          max={100}
        />
        {/* <div className="checkbox">
          <input
            type="checkbox"
            id="inset"
            name="inset"
            value={inset}
            onChange={(e) => handleInset(e)}
          ></input>
          <span>Inset</span>
        </div> */}
        <input
          type="color"
          className="color_picker"
          name="head"
          value={color}
          onChange={handleColorChange}
        />
        <hr></hr>
        <button type="button" className="layer_button" onClick={handleAddLayer}>
          <div>Add Layer</div>
        </button>
        {shadowList.map((item, key) => {
          if (key == selectLayer) {
            return (
              <div
                className={`layer_row ${selectLayer == key && "select_layer"}`}
                key={key}
              >
                <div>
                  {shiftRight}px {shiftDown}px {blur}px {spread}
                  px rgba(0,0,0,
                  {opacity / 100})
                </div>
                <div className="layer_row_icon">
                  <i className="fa fa-pencil"></i>

                  <i
                    className=" fa fa-trash"
                    onClick={() => handleDeleteLayer(key)}
                  ></i>
                </div>
              </div>
            );
          } else {
            return (
              <div
                className={`layer_row ${selectLayer == key && "select_layer"}`}
                key={key}
                onClick={() => handleSelectLayer(item, key)}
              >
                <div>
                  {item.shiftRight}px {item.shiftDown}px {item.blur}px{" "}
                  {item.spread}
                  px rgba(0,0,0,
                  {item.opacity / 100})
                </div>
                <div className="layer_row_icon">
                  <i className="fa fa-pencil"></i>
                  <i
                    className=" fa fa-trash"
                    onClick={() => handleDeleteLayer(key)}
                  ></i>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="preview">
        <div className="preview_area">
          <h2>Preview</h2>
          <div
            className="preview_shape"
            style={{ boxShadow: code.join(" ,") }}
          ></div>
        </div>
        <div className="preview_code">
          <h2>CSS Code</h2>
          <div>box-shadow: {code.join(" ,")}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
