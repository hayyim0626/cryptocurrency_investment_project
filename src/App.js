import React, { useState, useEffect } from "react";
import EthImg from "./Images/ehtereum_logo.svg";
import DaiImg from "./Images/dai.png";
import Status from "./Pages/Status/Status";
import Apply from "./Pages/Apply/Apply";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getEntireData } from "./Store/Actions";
import "./App.scss";

function App() {
  const [clickDropdown, setClickDropdown] = useState(false);
  const [clickStatusDropdown, setClickStatusDropdown] = useState(false);
  const [clickedCurrency, setClickedCurrency] = useState("ETH");
  const currencyApi = `https://data-api.defipulse.com/api/v1/defipulse/api/GetRates?token=${clickedCurrency}&amount=10000&api-key=62be5285721a9c9c5ad2ac05a57650d93dde5060ddb06816f1f70e27fa67`;
  const dispatch = useDispatch();
  const entireData = useSelector((store) => store.entireDataReducer);
  console.log(entireData);
  const CURRENCY_INFO = [
    {
      id: "ETH",
      period: 1,
      img: EthImg,
      interestRate: entireData.interestRate,
      investmentLimit: 3,
      applicationPeriod: 30,
    },
    {
      id: "DAI",
      period: 2,
      interestRate: entireData.interestRate,
      img: DaiImg,
      investmentLimit: 8,
      applicationPeriod: 40,
    },
  ];

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
    try {
      const response = await axios.get(currencyApi);
      const interestRate = Number(response.data.rates.Aave.lend.rate).toFixed(2);
      const interestData = () => {
        let arr = [];
        for (let i = 1; i <= 29; i++) {
          arr.push({
            date: i,
            interest: Number((Math.random() * 10 * interestRate).toFixed(2)),
          });
        }
        arr.push({ date: 30, interest: interestRate });
        return arr;
      };
      const apiCurrencyData = {
        id: response.data.token.name,
        interestRate,
        monthlyData: interestData(),
      };
      dispatch(getEntireData(apiCurrencyData));
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getApiData();
  // }, []);

  // useEffect(() => {
  //   getApiData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [clickedCurrency]);

  return (
    <div className="App" onClick={() => closeDropdown()}>
      <div className="interestText">최고이자율상품</div>
      <div className="contentAndStatus">
        <Apply
          handleDropdown={handleDropdown}
          clickDropdown={clickDropdown}
          clickedCurrency={clickedCurrency}
          setClickedCurrency={setClickedCurrency}
          CURRENCY_INFO={CURRENCY_INFO}
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
