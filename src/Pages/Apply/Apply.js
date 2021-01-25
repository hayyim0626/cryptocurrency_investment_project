import React, { useState, useEffect } from "react";
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
import "./Apply.scss";

export default function Apply({
  handleDropdown,
  clickDropdown,
  CURRENCY_ITEM,
  currentCurrency,
  setCurrentCurrency,
}) {
  const [chartClicked, setChartClicked] = useState(true);
  const [detailDescription, setDetailDescription] = useState(false);

  const handleChart = () => {
    setChartClicked(!chartClicked);
  };

  const handleDescription = () => {
    setDetailDescription(!detailDescription);
  };

  const handleCurrency = (value) => {
    setCurrentCurrency(value);
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
        차트부분
      </article>
      <article className="descriptionBox">
        <div className="descriptionList">
          <div className="descriptionTitleAndText">
            <h4 className="descriptionTitle">기간</h4>
            <span className="descriptionText">1개월 락업</span>
          </div>
          <img src={bigLockup} alt="lockup icon" className="descriptionIcon" />
        </div>
        <div className="descriptionList">
          <div className="descriptionTitleAndText">
            <h4 className="descriptionTitle">이자</h4>
            <span className="descriptionText">32.19% 변동금리</span>
          </div>
          <img
            src={bigVariableInterest}
            alt="lockup icon"
            className="descriptionIcon"
          />
        </div>
        <div className="descriptionList">
          <div className="descriptionTitleAndText">
            <h4 className="descriptionTitle">투자한도</h4>
            <span className="descriptionText">$ 3,000</span>
          </div>
          <img
            src={bigRequestLimit}
            alt="lockup icon"
            className="descriptionIcon"
          />
        </div>
        <div className="descriptionList">
          <div className="descriptionTitleAndText">
            <h4 className="descriptionTitle">남은 신청기간</h4>
            <span className="descriptionText">D-30</span>
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
          {currentCurrency}
        </div>
        <div className="investInput">
          <input type="number" placeholder="Amount" className="investPrice" />
          <div className="maxText">MAX</div>
        </div>
      </article>
      <span
        className={
          clickDropdown ? "currencyDropdown isClicked" : "currencyDropdown"
        }
      >
        {/* {CURRENCY_ITEM.map((el, idx) => (
          <div
            className={
              el === currentCurrency
                ? "currencyItem currentCurrency"
                : "currencyItem"
            }
            onClick={() => handleCurrency(el)}
            key={idx}
          >
            {el}
          </div>
        ))} */}
        {CURRENCY_ITEM.filter((el) => currentCurrency !== el).map((el, idx) => (
          <div
            className="currencyItem"
            onClick={() => handleCurrency(el)}
            key={idx}
          >
            {el}
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
            <div className="interestPercentage">$0</div>
          </div>
          <div className="interestInfo">
            <div className="interestImgText">
              <img src={money} alt="calender img" className="interestImg" />
              <div className="interestText">
                수령할
                <br />총 이자금액
              </div>
            </div>
            <div className="interestPercentage">$0</div>
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
              0
              <img src={nownArrow} alt="nown arrow img" className="nownArrow" />
              0
            </div>
          </div>
        </div>
      </article>
      <div className="investBtn">투자 신청</div>
    </section>
  );
}
