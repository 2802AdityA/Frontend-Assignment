import { Tooltip } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Label from "./Label.js";
import "../styles/input.css";

const Input = ({
  label,
  validate,
  jsonKey,
  level,
  dispatch,
  onSetGroupDataHandler,
  initJsonData,
  description,
  checkBool,
  disable,
  placeholder
}) => {
  const [inputVal, setInputValue] = useState("");
  useEffect(() => {
    let timeoutId = setTimeout(() => {
      const inputData = {};
      inputData[jsonKey] = inputVal.trim();
      if (level === 0) {
        dispatch({ type: "level0", payload: inputData });
      } else {
        onSetGroupDataHandler(inputData);
      }
    }, 700);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputVal, jsonKey, level, onSetGroupDataHandler, dispatch, initJsonData]);

  useEffect(() => {
    setInputValue("");
  }, [checkBool]);
  let ifRequired = false;

  if (validate.required) {
    ifRequired = true;
  }
  return (
    // show only if disable is false
    !disable &&
    <div
      className={`input_text ${level === 0 ? "fields_css" : "fields_css_2"}`}
    >
      <input
        type="text"
        value={inputVal}
        className="input_field"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        id={jsonKey}
        name={jsonKey}
        required={ifRequired}
        placeholder={placeholder}
      />
      <Label htmlFor={jsonKey} required={ifRequired}>
        {label}
        {ifRequired && <span className="required ">*</span>}
        {description.length > 0 && (
          <Tooltip label={description}>
            <i aria-hidden="true" className="fa fa-info-circle info"></i>
          </Tooltip>
        )}

      </Label>
    </div>
  );
};
export default Input;
