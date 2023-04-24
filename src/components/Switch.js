import { Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Label from "./Label.js";
import "../styles/switch.css";

const Switch = ({
  label,
  validate,
  jsonKey,
  level,
  dispatch,
  onSetGroupDataHandler,
  initJsonData,
  description,
  checkBool,
}) => {
  const [switchData, setSwitchData] = useState(validate.defaultValue);

  useEffect(() => {
    let tempData = {};
    tempData[jsonKey] = switchData;
    if (level === 0) {
      dispatch({ type: "level0", payload: tempData });
    } else {
      onSetGroupDataHandler(tempData);
    }
  }, [
    switchData,
    jsonKey,
    level,
    dispatch,
    onSetGroupDataHandler,
    initJsonData,
  ]);

  let inputVal = validate.defaultValue;

  useEffect(() => {
    setSwitchData(inputVal);
  }, [checkBool, inputVal]);

  const onChangeSwitchHandler = (e) => {
    setSwitchData(e.target.checked);
  };

  let labelText = label;
  if (label.includes("_")) {
    labelText = label.split("_")[0] + " " + label.split("_")[1];
  }

  let ifRequired = false;
  if (validate.required) {
    ifRequired = true;
  }

  return (
    <div className="input_switch">
      <input
        checked={switchData}
        type="checkbox"
        id={jsonKey}
        name={jsonKey}
        className={ifRequired && "req_switch"}
        onChange={onChangeSwitchHandler}
      />
      <Label htmlFor={jsonKey}>
        {labelText}
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

export default Switch;
