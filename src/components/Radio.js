import { Tooltip } from "@chakra-ui/react";
import "../styles/radio.css";
const Radio = (props) => {
  let inputVal = props.defaultValue;
  return (
    <li>
      <input
        type="radio"
        id={props.value}
        value={props.value}
        name="same"
        defaultChecked={inputVal}
        onChange={props.onsetRadioDataHandler}
      />
      <label className="" htmlFor={props.value}>
        {props.label}
        {props.description.length > 0 && (
          <Tooltip label={props.description}>
            <i aria-hidden="true" className="fa fa-info-circle info"></i>
          </Tooltip>
        )}
      </label>
    </li>
  );
};
export default Radio;
