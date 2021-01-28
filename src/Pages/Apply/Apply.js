import React, { useState } from "react";
import bestInterestIcon from "../../Images/best_interest_icon.svg";
import bigLockup from "../../Images/big_lockup.svg";
import bigRequestDue from "../../Images/big_reqeust_due.svg";
import bigRequestLimit from "../../Images/big_request_limit.svg";
import bigVariableInterest from "../../Images/big_variable_interest.svg";
import downArrow from "../../Images/down_arrow_new_gradient.svg";
import increase from "../../Images/increase.svg";
import money from "../../Images/money.svg";
import year from "../../Images/year.svg";
import nownArrow from "../../Images/noun_Arrow_2.svg";
import { useDispatch, useSelector } from "react-redux";
import { addInvest } from "../../Store/Actions";
import Chart from "../Chart/Chart";
import "./Apply.scss";

export default function Apply({
  handleDropdown,
  clickDropdown,
  clickedCurrency,
  setClickedCurrency,
}) {
  const dispatch = useDispatch();
  const [chartClicked, setChartClicked] = useState(true);
  const [detailDescription, setDetailDescription] = useState(false);
  const [investPrice, setInvestPrice] = useState("");
  const entireData = useSelector((store) => store.entireDataReducer);
  const clickedCurrencyData = entireData.find(
    (el) => el.id === clickedCurrency
  );
  const dailyInterestAmount = parseFloat(
    ((investPrice * (clickedCurrencyData?.interestRate / 100)) / 365).toFixed(8)
  );
  const entireInterestAmount = parseFloat(
    (dailyInterestAmount * clickedCurrencyData?.period * 30).toFixed(8)
  );
  const date = new Date();
  const getFormatDate = (date) => {
    let year = date.getFullYear();
    let month = 1 + date.getMonth();
    let day = date.getDate();
    month = month >= 10 ? month : "0" + month;
    day = day >= 10 ? day : "0" + day;
    return `${year}-${month}-${day}`;
  };
  const applyDate = getFormatDate(date);

  const investData = {
    productName: "최고이자율상품",
    applicationDate: applyDate,
    interestRate: clickedCurrencyData?.interestRate,
    applicationRevenue: entireInterestAmount,
    applicationCurrency: clickedCurrency,
    applicationPrice: investPrice,
    applicationResult: "승인대기",
  };

  const isValid = () => {
    if (investPrice > Number(clickedCurrencyData?.investmentLimit)) {
      return `최대 ${clickedCurrencyData.investmentLimit}까지 신청할 수 있습니다`;
    }
  };

  const handleInvestPrice = (value) => {
    setInvestPrice(value);
  };

  const handleChart = () => {
    setChartClicked(!chartClicked);
  };

  const handleDescription = () => {
    setDetailDescription(!detailDescription);
  };

  const handleCurrency = (currencyId) => {
    setClickedCurrency(currencyId);
  };
  const averageInterest = () => {
    if (isNaN(dailyInterestAmount)) {
      return "NaN";
    }
    if (investPrice === "" || investPrice === "0") {
      return 0;
    }
    return clickedCurrencyData.interestRate;
  };
  const addInvestData = () => {
    if (
      isNaN(dailyInterestAmount) ||
      investPrice === "0" ||
      investPrice === ""
    ) {
      setInvestPrice("");
      return alert("유효한 숫자를 입력해주세요!");
    }
    if (investPrice > Number(clickedCurrencyData.investmentLimit)) {
      setInvestPrice("");
      return alert(
        `최대 ${clickedCurrencyData.investmentLimit}까지 신청할 수 있습니다`
      );
    }
    alert("신청이 완료되었습니다.");
    dispatch(addInvest(investData));
    setInvestPrice("");
  };

  return (
    <section className="Content">
      <header className="contentHeader">
        <img
          src={bestInterestIcon}
          alt="best interest icon"
          className="bestInterestImg"
        />
        <div className="titleAndExplanation">
          <div className="bestInterestTitle">최고이자율상품</div>
          <div className="bestInterestExplanation">
            언제나 시장 최고이자를 받을 수 있는 상품.
          </div>
        </div>
      </header>
      <div className="chartBtn" onClick={() => handleChart()}>
        ▼ 이자율 비교 차트 (직전 1개월 기준)
      </div>
      <article className={chartClicked ? "chart isClicked" : "chart"}>
        <Chart clickedCurrency={clickedCurrency}/>
      </article>
      <article className="descriptionBox">
        <div className="descriptionList">
          <div className="descriptionTitleAndData">
            <h4 className="descriptionType">기간</h4>
            <span className="currencyData">
              {clickedCurrencyData?.period}개월 락업
            </span>
          </div>
          <img src={bigLockup} alt="lockup icon" className="descriptionIcon" />
        </div>
        <div className="descriptionList">
          <div className="descriptionTitleAndData">
            <h4 className="descriptionType">이자</h4>
            <span className="currencyData">
              <span className="interestRate">
                {clickedCurrencyData?.interestRate}
              </span>
              % 변동금리
            </span>
          </div>
          <img
            src={bigVariableInterest}
            alt="lockup icon"
            className="descriptionIcon"
          />
        </div>
        <div className="descriptionList">
          <div className="descriptionTitleAndData">
            <h4 className="descriptionType">투자한도</h4>
            <div className="investmentLimit">
              <span className="currencyId">{clickedCurrencyData?.id}</span>
              <span className="currencyData">
                {clickedCurrencyData?.investmentLimit}
              </span>
            </div>
          </div>
          <img
            src={bigRequestLimit}
            alt="lockup icon"
            className="descriptionIcon"
          />
        </div>
        <div className="descriptionList">
          <div className="descriptionTitleAndData">
            <h4 className="descriptionType">남은 신청기간</h4>
            <span className="currencyData">
              D-
              {
                entireData.find((el) => el.id === clickedCurrency)
                  ?.applicationPeriod
              }
            </span>
          </div>
          <img
            src={bigRequestDue}
            alt="lockup icon"
            className="descriptionIcon"
          />
        </div>
        <div className="descriptionLine" />
        <div
          className="detailDescriptionBtn"
          onClick={() => handleDescription()}
        >
          ▼ 상품 상세설명
        </div>
        <div
          className={
            detailDescription
              ? "detailDescription isClicked"
              : "detailDescription"
          }
        >
          '최고이자율상품'은 <a href="https://loanscan.io/">loanscan.io</a>에
          고시되는 이자율 중 가장 높은 이자를 자동으로 선택하여 적용해 주는
          상품입니다. 적용이자는 매일 업데이트 됩니다.
        </div>
      </article>
      <img src={downArrow} alt="dowm Arrow" className="downArrowIcon" />
      <article className="investInputBox">
        <div className="currencyListBtn" onClick={() => handleDropdown()}>
          {clickedCurrency}
        </div>
        <div className="investInput">
          <input
            type="text"
            maxLength="10"
            placeholder="Amount"
            className="inputWindow"
            value={investPrice}
            onChange={(e) => handleInvestPrice(e.target.value)}
          />
          <div className="maxText">MAX</div>
        </div>
      </article>
      <div className="infoWindow">{isValid()}</div>
      <span
        className={
          clickDropdown ? "currencyDropdown isClicked" : "currencyDropdown"
        }
      >
        {entireData
          .filter((el) => clickedCurrency !== el.id)
          .map((el, idx) => (
            <div
              className="currencyItem"
              onClick={() => handleCurrency(el.id)}
              key={idx}
            >
              {el.id}
            </div>
          ))}
      </span>
      <article className="investOption">
        <div className="investOptionText">
          투자금 이동 옵션(프로모션 종료 후)
        </div>
        <div className="optionBtns">
          <div className="coldStakingBtn">콜드스테이킹으로 이동합니다.</div>
          <div className="freeDepositBtn">자유예금상품으로 이동합니다.</div>
        </div>
        <div className="interestBox">
          <div className="interestInfo">
            <div className="interestImgText">
              <img src={year} alt="calender img" className="interestImg" />
              <div className="interestText">
                일별
                <br />
                이자금액
              </div>
            </div>
            <div className="interestPercentage">
              {investPrice === "" || investPrice === "0"
                ? "0"
                : dailyInterestAmount}
            </div>
          </div>
          <div className="interestInfo">
            <div className="interestImgText">
              <img src={money} alt="calender img" className="interestImg" />
              <div className="interestText">
                수령할
                <br />총 이자금액
              </div>
            </div>
            <div className="interestPercentage">
              {investPrice === "" || investPrice === "0"
                ? "0"
                : entireInterestAmount}
            </div>
          </div>
          <div className="interestInfo">
            <div className="interestImgText">
              <img src={increase} alt="calender img" className="interestImg" />
              <div className="interestText">
                평균
                <br />
                이자율 변화
              </div>
            </div>
            <div className="interestPercentage">
              0%
              <img src={nownArrow} alt="nown arrow img" className="nownArrow" />
              {averageInterest()}%
            </div>
          </div>
        </div>
      </article>
      <div className="investBtn" onClick={addInvestData}>
        투자 신청
      </div>
    </section>
  );
}
