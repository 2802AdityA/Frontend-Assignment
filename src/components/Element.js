import AllRadio from "./AllRadio.js";
import Group from "./Group.js";
import Input from "./Input.js";
import Select from "./Select.js";
import Switch from "./Switch.js";
import UiIgnore from "./UiIgnore.js";
const Element = (props) => {

  switch (props.uiType) {
    case "Input":
      return (props.validate.required || props.advanced) && (
        (
          <Input
            label={props.label}
            jsonKey={props.jsonKey}
            validate={props.validate}
            level={props.level}
            dispatch={props.dispatch}
            onSetGroupDataHandler={props?.onSetGroupDataHandler}
            initJsonData={props.initJsonData}
            description={props.description}
            checkBool={props.checkBool}
            disable={props?.disable ? props.disable : false}
            placeholder={props.placeholder}
          />
        ));
    case "Select":
      return (props.validate.required || props.advanced) && (
        (
          <Select
            label={props.label}
            jsonKey={props.jsonKey}
            validate={props.validate}
            level={props.level}
            dispatch={props.dispatch}
            onSetGroupDataHandler={props?.onSetGroupDataHandler}
            initJsonData={props.initJsonData}
            description={props.description}
            checkBool={props.checkBool}
            disable={props?.disable ? props.disable : false}
          />
        ));

    case "Group":
      return (props.validate.required || props.advanced) && (
        (
          <Group
            label={props.label}
            validate={props.validate}
            jsonKey={props.jsonKey}
            subParameters={props.subParameters}
            level={props.level}
            dispatch={props.dispatch}
            onSetGroupDataHandler={props?.onSetGroupDataHandler}
            initJsonData={props.initJsonData}
            description={props.description}
            checkBool={props.checkBool}
            disable={props?.disable ? props.disable : false}
          />
        ));

    case "Switch":
      return (props.validate.required || props.advanced) && (
        (
          <Switch
            label={props.label}
            jsonKey={props.jsonKey}
            validate={props.validate}
            level={props.level}
            dispatch={props.dispatch}
            onSetGroupDataHandler={props?.onSetGroupDataHandler}
            initJsonData={props.initJsonData}
            description={props.description}
            checkBool={props.checkBool}
            disable={props?.disable ? props.disable : false}
          />
        ));

    case "Radio":
      return (props.validate.required || props.advanced) && (
        (
          <AllRadio
            validate={props.validate}
            level={props.level}
            jsonKey={props.jsonKey}
            dispatch={props.dispatch}
            onSetGroupDataHandler={props?.onSetGroupDataHandler}
            initJsonData={props.initJsonData}
            description={props.description}
            checkBool={props.checkBool}
            disable={props?.disable ? props.disable : false}
          />
        ));

    case "Ignore":
      return (props.validate.required || props.advanced) && (
        (
          <UiIgnore
            validate={props.validate}
            level={props.level}
            jsonKey={props.jsonKey}
            dispatch={props.dispatch}
            onSetGroupDataHandler={props?.onSetGroupDataHandler}
            initJsonData={props.initJsonData}
            subParameters={props.subParameters}
            checkBool={props.checkBool}
            conditions={props.conditions}
            groupData={props.groupData}
            disable={props?.disable ? props.disable : false}
          />
        ));

    default:
      return "";
  }
};
export default Element;
