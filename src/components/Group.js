import { Tooltip } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import Element from "./Element.js";
import { Switch } from '@material-ui/core'
import "../styles/group.css";
const Group = ({
  label,
  validate,
  jsonKey,
  subParameters,
  dispatch,
  initJsonData,
  description,
  checkBool,
}) => {
  const [advanced, setAdvanced] = useState(false)
  const handleToggle = () => {
    setAdvanced(!advanced)
  }
  const [groupData, setData] = useState({});
  let toggle = true;
  const onSetGroupDataHandler = useCallback((data) => {
    setData((prevState) => {
      let tempData = {
        ...prevState,
        ...data,
      };

      return tempData;
    });
  }, []);

  useEffect(() => {
    let tempData = {};
    tempData[jsonKey] = { ...groupData };

    dispatch({ type: "level0", payload: tempData });
  }, [groupData, jsonKey, dispatch, initJsonData]);

  let labelName = label;

  if (labelName.includes("_")) {
    labelName = label.split("_")[0] + " " + label.split("_")[1];
  }

  let ifRequired = false;
  if (validate.required) {
    ifRequired = true;
  }

  let allGroupElement = subParameters.map((each) => {
    toggle = toggle && each.validate.required
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
        prevjsonKey={jsonKey}
        onSetGroupDataHandler={onSetGroupDataHandler}
        initJsonData={initJsonData}
        checkBool={checkBool}
        conditions={each.conditions}
        groupData={groupData}
        advanced={advanced}
      />
    );
  });

  return (
    <div key={jsonKey} className="group_field">
      <div className={ifRequired && "req"}>{allGroupElement}</div>
      <label className="group_label">
        {labelName}
        {ifRequired && <span className="required ">*</span>}
        {description.length > 0 && (
          <Tooltip label={description}>
            <i aria-hidden="true" className="fa fa-info-circle info"></i>
          </Tooltip>
        )}
      </label>
      {!toggle &&
        <div>
          <label className='text-sm'>Show Advanced fields</label>
          <Switch color="primary" size="small" checked={advanced} onChange={handleToggle} />
        </div>
      }
    </div>
  );
};
export default Group;
