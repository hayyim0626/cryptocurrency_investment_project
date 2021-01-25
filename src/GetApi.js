import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function GetApi() {
  const currencyApi =
    "https://data-api.defipulse.com/api/v1/defipulse/api/GetRates?token=DAI&amount=10000";

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
}
