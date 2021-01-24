import React, { useState, useEffect } from "react";
import Status from "./Pages/Status/Status";
import Content from "./Pages/Content/Content";
import "./App.scss";

function App() {
  const [clickDropdown, setClickDropdown] = useState(false);
  const [clickStatusList, setClickStatusList] = useState(false);

  const handleDropdown = () => {
    setClickDropdown(!clickDropdown);
  };

  const closeModal = () => {
    if (clickDropdown) setClickDropdown(false);
    if (clickStatusList) setClickStatusList(false);
  };

  const handleStatusList = () => {
    setClickStatusList(!clickStatusList);
  };

  return (
    <div className="App" onClick={() => closeModal()}>
      <div className="interestText">최고이자율상품</div>
      <div className="contentAndStatus">
        <Content
          clickDropdown={clickDropdown}
          handleDropdown={handleDropdown}
        />
        <Status
          clickStatusList={clickStatusList}
          handleStatusList={handleStatusList}
        />
      </div>
    </div>
  );
}

export default App;
