import React, { useState, useEffect } from "react";
import Status from "./Pages/Status/Status";
import Apply from "./Pages/Apply/Apply";
import { useDispatch } from "react-redux";
import { getEntireData } from "./Store/Actions";
import "./App.scss";

function App() {
  const [clickDropdown, setClickDropdown] = useState(false);
  const [clickStatusDropdown, setClickStatusDropdown] = useState(false);
  const [clickedCurrency, setClickedCurrency] = useState("ETH");
  const dispatch = useDispatch();
  const currencyInfo = ["ETH", "DAI"];

  const handleDropdown = () => {
    setClickDropdown(!clickDropdown);
  };

  const handleStatusDropdown = () => {
    setClickStatusDropdown(!clickStatusDropdown);
  };

  const closeDropdown = () => {
    if (clickDropdown) setClickDropdown(false);
    if (clickStatusDropdown) setClickStatusDropdown(false);
  };

  const getApiData = async () => {
    const currencyData = [];
    for (let i = 0; i <= currencyInfo.length - 1; i++) {
      await fetch(
        `https://data-api.defipulse.com/api/v1/defipulse/api/GetRates?token=${currencyInfo[i]}&amount=10000&api-key=a95a9bc66477156985b917415c00e26730a0bf609e5b6da736fb0c67ccc2`
      )
        .then((res) => res.json())
        .then((res) => {
          const interestRate = Number(res.rates.Aave.lend.rate.toFixed(2));
          const interestData = () => {
            let arr = [];
            for (let i = 1; i <= 29; i++) {
              arr.push({
                date: i,
                interest: Number(
                  (Math.random() * 5 * interestRate).toFixed(2)
                ),
              });
            }
            arr.push({ date: 30, interest: interestRate });
            return arr;
          };
          currencyData[i] = {
            id: res?.token.name,
            interestRate,
            period: Math.floor(Math.random() * 10) + 1,
            investmentLimit: Math.floor(Math.random() * 10) + 1,
            applicationPeriod: 30,
            monthlyData: interestData(),
          };
        });
    }
    dispatch(getEntireData(currencyData));
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <div className="App" onClick={() => closeDropdown()}>
      <div className="interestText">최고이자율상품</div>
      <div className="contentAndStatus">
        <Apply
          handleDropdown={handleDropdown}
          clickDropdown={clickDropdown}
          clickedCurrency={clickedCurrency}
          setClickedCurrency={setClickedCurrency}
        />
        <Status
          clickStatusDropdown={clickStatusDropdown}
          handleStatusDropdown={handleStatusDropdown}
        />
      </div>
    </div>
  );
}

export default App;
