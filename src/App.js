import React, { useState, useEffect } from "react";
import Status from "./Pages/Status/Status";
import Apply from "./Pages/Apply/Apply";
import axios from "axios";
import "./App.scss";

function App() {
  const [clickDropdown, setClickDropdown] = useState(false);
  const [clickStatusList, setClickStatusList] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState("ETH");
  const CURRENCY_ITEM = ["ETH", "DAI"];
  const apiKey = "df57938d5b5cd1aac46a7954592ad50a9581944278a17405183f64f3145d";
  const currencyApi =
    `https://data-api.defipulse.com/api/v1/defipulse/api/GetRates?token=${currentCurrency}&amount=10000&api-key=${apiKey}`;

  const handleDropdown = () => {
    setClickDropdown(!clickDropdown);
  };

  const handleStatusList = () => {
    setClickStatusList(!clickStatusList);
  };

  const closeModal = () => {
    if (clickDropdown) setClickDropdown(false);
    if (clickStatusList) setClickStatusList(false);
  };

  const getApiData = async () => {
    try {
      const response = await axios.get(currencyApi);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  useEffect(() => {
    getApiData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCurrency]);

  return (
    <div className="App" onClick={() => closeModal()}>
      <div className="interestText">최고이자율상품</div>
      <div className="contentAndStatus">
        <Apply
          clickDropdown={clickDropdown}
          handleDropdown={handleDropdown}
          CURRENCY_ITEM={CURRENCY_ITEM}
          currentCurrency={currentCurrency}
          setCurrentCurrency={setCurrentCurrency}
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
