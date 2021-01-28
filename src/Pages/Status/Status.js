import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Status.scss";

export default function Status({ clickStatusDropdown, handleStatusDropdown }) {
  const STATUS_CASE = ["전체", "승인대기", "완료"];
  const CURRENCY_ITEM = ["All", "ETH", "DAI"];
  const [currentStatus, setCurrentStatus] = useState("전체");
  const investList = useSelector((store) => store.investReducer);

  // const filterStatus = (status) => {
  //   setCurrentStatus(status);
  // };

  // const filterByCurrency = (el) => {
  //   if (el === "All") {
  //     return investList;
  //   }
  //   investList.filter(el === investList.productName);
  // };

  return (
    <div className="Status">
      <header className="statusHeader">
        <div className="statusText">Status</div>
        <div className="statusBox" onClick={() => handleStatusDropdown()}>
          <div className="currentStatus">{currentStatus}</div>
          <div>∨</div>
        </div>
      </header>
      <div
        className={
          clickStatusDropdown ? "statusDropdown isClicked" : "statusDropdown"
        }
      >
        {STATUS_CASE.map((el) => {
          return (
            <div
              className={
                currentStatus === el ? "statusList currentStatus" : "statusList"
              }
              // onClick={() => filterStatus(el)}
            >
              {el}
            </div>
          );
        })}
      </div>
      <div className="currencyBox">
        {CURRENCY_ITEM.map((el) => {
          return (
            <div className="currencyItem" 
            // onClick={() => filterByCurrency(el)}
            >
              {el}
            </div>
          );
        })}
      </div>
      {investList.length === 0 ? (
        <div className="noData">No data</div>
      ) : (
        investList.map((el) => (
          <article className="currencyTable">
            <div className="applyArrow">＞</div>
            <div className="applyState">
              <div className="applyInfo">
                <div className="productName">{el.productName}</div>
                <div className="applyDate">{el.applicationDate}</div>
              </div>
              <div className="applyDetail">
                <div className="applyCurrency">
                  <div className="applyAmount">{el.applicationPrice}</div>
                  <div className="applyCurrencyId">
                    {el.applicationCurrency}
                  </div>
                </div>
                <div className="interestRate">
                  {el.applicationRevenue} Earned ({el.interestRate}%)
                </div>
                <div className="applyStatus">{el.applicationResult}</div>
              </div>
            </div>
          </article>
        ))
      )}
    </div>
  );
}
