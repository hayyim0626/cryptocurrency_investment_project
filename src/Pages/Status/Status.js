import React, { useState, useEffect } from "react";
import "./Status.scss";

export default function Status({ clickStatusList, handleStatusList }) {
  const STATUS_CASE = ["전체", "승인", "완료"];
  const CURRENCY_ITEM = ["All", "ETH", "DAI"];
  const [currentStatus, setCurrentStatus] = useState("전체");
  const date = new Date();

  const getFormatDate = (date) => {
    let year = date.getFullYear();
    let month = 1 + date.getMonth();
    let day = date.getDate();
    month = month >= 10 ? month : "0" + month;
    day = day >= 10 ? day : "0" + day;
    return year + "-" + month + "-" + day;
  };

  const applyDate = getFormatDate(date);

  const filterStatus = (status) => {
    setCurrentStatus(status);
  };

  return (
    <div className="Status">
      <header className="statusHeader">
        <div className="statusText">Status</div>
        <div className="statusBox" onClick={() => handleStatusList()}>
          <div className="currentStatus">{currentStatus}</div>
          <div>∨</div>
        </div>
      </header>
      <div
        className={
          clickStatusList ? "statusDropdown isClicked" : "statusDropdown"
        }
      >
        {STATUS_CASE.map((el) => {
          return (
            <div
              className={
                currentStatus === el ? "statusList currentStatus" : "statusList"
              }
              onClick={() => filterStatus(el)}
            >
              {el}
            </div>
          );
        })}
      </div>
      <div className="currencyBox">
        {CURRENCY_ITEM.map((el) => {
          return <div className="currencyItem">{el}</div>;
        })}
      </div>
      <article className="currencyTable">
        <div className="applyArrow">＞</div>
        <div className="applyState">
          <div className="applyInfo">
            <div className="productName">최고이자율상품</div>
            <div className="applyDate">{applyDate}</div>
          </div>
          <div className="applyDetail">
            <div className="applyAmount">1632.12345612</div>
            <div className="interestRate">4.01230012 Earned (4.00%)</div>
            <div className="applyStatus">승인대기</div>
          </div>
        </div>
      </article>
    </div>
  );
}
