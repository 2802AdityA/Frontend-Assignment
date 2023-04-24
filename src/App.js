import "./styles/App.css";
import Form from "./components/Form.js";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import sampleData from "./data.json";
import { useCallback, useEffect, useState } from "react";

function App() {
  const initialData = sampleData;
  const [jsonData, setJsonData] = useState(initialData);
  const [prevJsonData, setPrevJsonData] = useState({});

  const changingValue = (data) => {
    setJsonData(data.jsObject);
  };
  const onSetPrevjsonData = useCallback((data) => {
    setPrevJsonData(data);
  }, []);
  useEffect(() => {
    // Sort the data by the "sort" field
    jsonData.sort((a, b) => { return a.sort - b.sort });
    // Sort the data by the boolean "required" field
    jsonData.sort((a, b) => { return (b.validate.required ? b.validate.required : false) - (a.validate.required ? a.validate.required : false) });
    setJsonData(jsonData);
  }, [jsonData]);
  return (
    <div className="App">
      <div className="json_editor">
        <JSONInput
          id="a_unique_id"
          placeholder={jsonData}
          locale={locale}
          height="100vh"
          width="100%"
          onChange={changingValue}
        />

      </div>
      <div className="form_app">
        <Form
          onSetPrevjsonData={onSetPrevjsonData}
          initJsonData={prevJsonData}
          initialJson={jsonData}
        />
      </div>
    </div>
  );
}

export default App;
