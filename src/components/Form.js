import { useEffect, useReducer, useState } from "react";
import { Switch } from '@material-ui/core'
import Button from "./Button.js";
import Element from "./Element.js";
import "../styles/form.css";

const initialReducer = {};
const reducer = (state, action) => {
  if (action.type === "level0") {
    const tempData = {
      ...state,
      ...action.payload,
    };
    return tempData;
  } else if (action.type === "level1") {
    const level1Data = {
      ...state[action.payload.prevJson],
      ...action.payload.itsData,
    };
    console.log(level1Data, action.payload.prevJson);
    const tempData = {
      ...state,
    };
    tempData[action.payload.prevJson] = level1Data;
    return tempData;
  } else if (action.type === "reset") {
    return {};
  }

  return {};
};
const Form = ({ initJsonData, initialJson, onSetPrevjsonData }) => {
  const [advanced, setAdvanced] = useState(false)
  const handleToggle = () => {
    setAdvanced(!advanced)
  }
  const [element, setElement] = useState();
  const [checkBool, setBool] = useState(true);
  const [formData, dispatch] = useReducer(reducer, initialReducer);
  useEffect(() => {
    let tempElement = initialJson?.map((each) => {
      return (
        <Element
          key={each.jsonKey}
          uiType={each.uiType}
          label={each.label}
          jsonKey={each.jsonKey}
          validate={each.validate}
          subParameters={each?.subParameters}
          level={each.level}
          description={each.description}
          dispatch={dispatch}
          initJsonData={initJsonData}
          checkBool={checkBool}
          placeholder={each.placeholder}
          advanced={advanced}
        />
      );
    });
    if (JSON.stringify(initJsonData) !== JSON.stringify(initialJson)) {
      onSetPrevjsonData(initialJson);
      dispatch({ type: "reset" });
    }
    setElement(tempElement);
  }, [initialJson, initJsonData, onSetPrevjsonData, checkBool, advanced]);

  if (element) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setBool(!checkBool);
          console.log("You Submitted the form, Here is Your Data: ", formData);
        }}
        className="form "
      >
        {element}
        <div className="all_btns">
          <div>
            <label className='text-sm'>Show Advanced fields</label>
            <Switch color="primary" size="small" checked={advanced} onChange={handleToggle} />
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setBool(!checkBool);
              console.log("you cancel the form");
            }}
          >
            Cancel
          </Button>
          <Button>Submit</Button>
        </div>
      </form>
    );
  }
  return <p className="error">Wrong Json Schema</p>;
};
export default Form;
