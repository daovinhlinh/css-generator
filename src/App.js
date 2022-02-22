import "./App.css";
import RangeSlider from "./components/RangeSlider";
import { useEffect, useState } from "react";

function App() {
  const [shiftRight, setShiftRight] = useState(0);
  const [shiftDown, setShiftDown] = useState(0);
  const [spread, setSpread] = useState(3);
  const [blur, setBlur] = useState(5);
  const [opacity, setOpacity] = useState(20);
  const [inset, setInset] = useState(false);
  const [color, setColor] = useState({
    shadow: "#000000",
    preview_background: "#ffffff",
    shape: "#3d9df6",
  });
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
      inset,
      color: color["shadow"],
    },
  ]);

  const [selectLayer, setSelectLayer] = useState(0);

  const handleColorChange = (e, type) => {
    const data = { ...color };
    data[type] = e.target.value;
    setColor(data);
  };

  const handleAddLayer = () => {
    const data = {
      shiftRight: 0,
      shiftDown: 0,
      spread: 3,
      blur: 5,
      opacity: 20,
      inset: false,
      color: "#000000",
    };

    setShadowList([...shadowList, data]);
    setCode([...code, "rgba(0,0,0,0.2) 0px 0px 5px 3px"]);
  };

  const handleDeleteLayer = (e, index) => {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    if (shadowList.length > 1) {
      let newData = [...shadowList];
      newData.splice(index, 1);
      setShadowList(newData);

      let newCode = [...code];
      newCode.splice(index, 1);
      setCode(newCode);

      if (selectLayer === 0) {
        setSelectLayer(0);
      } else if (selectLayer === shadowList.length - 1) {
        setSelectLayer(selectLayer - 1);
      }
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
      color: color["shadow"],
      inset,
    };
    setShadowList(data);

    setShiftRight(item.shiftRight);
    setShiftDown(item.shiftDown);
    setSpread(item.spread);
    setBlur(item.blur);
    setOpacity(item.opacity);
    setInset(item.inset);
    setColor({ ...color, shadow: item.color });
    setSelectLayer(index);
  };

  const handleUpdateCode = (index) => {
    let data = [...code];
    data[index] = `${hexToRgbA(
      color["shadow"],
      opacity
    )} ${shiftRight}px ${shiftDown}px ${blur}px ${spread}px ${
      inset === true ? "inset" : ""
    }`;
    setCode(data);
  };

  const hexToRgbA = (hex, opacity) => {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      return (
        "rgba(" +
        [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
        "," +
        `${opacity / 100})`
      );
    }
  };

  useEffect(() => {
    handleUpdateCode(selectLayer);
  }, [shiftRight, shiftDown, spread, blur, opacity, inset, color]);

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
        <div className="checkbox">
          <input
            type="checkbox"
            id="inset"
            name="inset"
            checked={inset}
            onChange={() => setInset(!inset)}
          ></input>
          <span>Inset</span>
        </div>
        <input
          type="color"
          className="color_picker"
          name="head"
          value={color["shadow"]}
          onChange={(e) => handleColorChange(e, "shadow")}
        />
        <hr className="divider" />
        <button type="button" className="layer_button" onClick={handleAddLayer}>
          <div>Add Layer</div>
        </button>
        {shadowList.map((item, key) => {
          if (key == selectLayer) {
            return (
              <div
                className={`layer_row ${selectLayer === key && "select_layer"}`}
                key={key}
              >
                <div>
                  {shiftRight}px {shiftDown}px {blur}px {spread}
                  px {hexToRgbA(color["shadow"], opacity)}
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
                className={`layer_row ${selectLayer === key && "select_layer"}`}
                key={key}
                onClick={() => handleSelectLayer(item, key)}
              >
                <div>
                  {item.shiftRight}px {item.shiftDown}px {item.blur}px{" "}
                  {item.spread}
                  px {hexToRgbA(item.color, item.opacity)}
                </div>
                <div className="layer_row_icon">
                  <i className="fa fa-pencil"></i>
                  <i
                    className=" fa fa-trash"
                    onClick={(e) => handleDeleteLayer(e, key)}
                  ></i>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="preview">
        <div
          className="preview_area"
          style={{ backgroundColor: color["preview_background"] }}
        >
          <div className="preview_area_header">
            <h2>Preview</h2>
            <div>
              <input
                type="color"
                className="color_picker"
                name="head"
                value={color["preview_background"]}
                onChange={(e) => handleColorChange(e, "preview_background")}
              />
              <input
                type="color"
                className="color_picker"
                name="head"
                value={color["shape"]}
                onChange={(e) => handleColorChange(e, "shape")}
              />
            </div>
          </div>
          <div
            className="preview_shape"
            style={{
              boxShadow: code.join(" ,"),
              backgroundColor: color["shape"],
            }}
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
