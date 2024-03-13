/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Wish } from "../../types/Wish";
import {  Fill } from "../../types/WishTypes";
import { ModalForm } from "../Modal/Modal";

import './Wishes.scss';
import { Loader } from "../Loader";


type Props = {
  wishes: Wish[];
  visible: Wish[];
  setVisible: React.Dispatch<React.SetStateAction<Wish[]>>;
};

export const Wishes: React.FC<Props> = ({ wishes, visible, setVisible}) => {
  const [show, setShow] = useState(false);
  const [showType, setShowType] = useState(false);
  const [showRegion, setShowRegion] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);
  const [fulfilled, setFulfilled] = useState<Wish[]>([]);
  const [unFulfilled, setUnFulfilled] = useState<Wish[]>([]);
  const [currency, setCurrency] = useState('');
  const [min, setMin] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setVisible([...wishes]);
      setLoading(false);
    }, 1000);
  }, [])

  useEffect(() => {
    setFulfilled([...wishes]
      .filter(w => w.status === Fill.FULFILED))
  }, [visible, wishes]);

  useEffect(() => {
    setUnFulfilled([...wishes]
      .filter(w => w.status === Fill.UNFULFILED))
  }, [visible, wishes]);

  const filterFullFill = () => setVisible(fulfilled);
  const filterUnFUllFill = () => setVisible(unFulfilled);


  const filteredByRegion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisible([
      ...wishes.filter((w) =>
        w.region.toLowerCase().startsWith(e.target.value.toLowerCase())
      ),
    ]);
  };


  const handleToGo = () => {
    setVisible([...wishes].filter((w) => w.dream_type === "to-go"));
    setShowType(!showType);
    console.log(visible);
    
  };

  const handleToMeet = () => {
    setVisible([...wishes].filter((w) => w.dream_type === 'to-meet'));
    setShowType(!showType)
  };

  const handleToBe = () => {
    setVisible([...wishes].filter((w) => w.dream_type === 'to-be'));
    setShowType(!showType)
  };

  const handleToHave = () => {
    setVisible([...wishes].filter((w) => w.dream_type === 'to-have'));
    setShowType(!showType)
  };

  const handleBudget = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMin(+e.target.value);
    setVisible([...wishes].filter((w) => w.price >= +e.target.value));
  };

  const handleShow = () => setShow(true);


  return (
    <div className="wishes">
      <div className="container">
        <h2 className="wishes__title">Wishes</h2>
      </div>

      <div className="wishes__sort">
        <div className="container">
          <div className="wishes__sort--inner">
            <div className="wishes__sort--item" onClick={filterUnFUllFill}>
              <h4 className="wishes__sort--item-title">Unfulfilled </h4>
              <span className="wishes__sort--item-count">
                {unFulfilled.length}
              </span>
            </div>
            <div className="wishes__sort--item" onClick={filterFullFill}>
              <h4 className="wishes__sort--item-title">Fulfilled </h4>
              <span className="wishes__sort--item-count">
                {fulfilled.length}
              </span>
            </div>
            <div
              className="wishes__sort--item"
              onClick={() => setVisible([...wishes])}
            >
              <h4 className="wishes__sort--item-title">All</h4>
              <span className="wishes__sort--item-count">{wishes.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="wishes__filter">
        <div className="container">
          <div className="wishes__filter--inner">
            <div className="wishes__filter--item">
              <div
                className="wishes__filter--item-top"
                onClick={() => setShowType(!showType)}
              >
                <span className="wishes__filter--item-title">Dream type</span>
                <img src="./img/arrowdown.svg" alt="arrowdown" />
              </div>

              {showType ? (
                <div className="wishes__filter--item-bottom">
                  <p className="wishes__filter--item-opt" onClick={handleToGo}>
                    TO_GO
                  </p>
                  <p
                    className="wishes__filter--item-opt"
                    onClick={handleToMeet}
                  >
                    TO_MEET
                  </p>
                  <p className="wishes__filter--item-opt" onClick={handleToBe}>
                    TO_BE
                  </p>
                  <p
                    className="wishes__filter--item-opt"
                    onClick={handleToHave}
                  >
                    TO_HAVE
                  </p>
                </div>
              ) : null}
            </div>
            <div className="wishes__filter--item">
              <div
                className="wishes__filter--item-top"
                onClick={() => setShowRegion(!showRegion)}
              >
                <span className="wishes__filter--item-title">Region</span>
                <img src="./img/arrowdown.svg" alt="arrowdown" />
              </div>
              {showRegion && (
                <input
                  className="wishes__filter--item-reg"
                  type="text"
                  placeholder="Start typing to find city"
                  onChange={(e) => filteredByRegion(e)}
                />
              )}
            </div>
            <div className="wishes__filter--item">
              <div
                className="wishes__filter--item-top"
                onClick={() => setShowCurrency(!showCurrency)}
              >
                <span className="wishes__filter--item-title">Currency</span>
                <img src="./img/arrowdown.svg" alt="arrowdown" />
              </div>
              {showCurrency && (
                <div className="wishes__filter--item-currency">
                  <div
                    className="wishes__filter--item-opt"
                    onClick={() => {
                      setCurrency("UAH");
                      setVisible(
                        [...wishes].filter((w) => w.currency === currency)
                      );
                      setShowCurrency(!showCurrency);
                    }}
                  >
                    UAH
                  </div>
                  <div
                    className="wishes__filter--item-opt"
                    onClick={() => {
                      setCurrency("USD");
                      setVisible(
                        [...wishes].filter((w) => w.currency === currency)
                      );
                      setShowCurrency(!showCurrency);
                    }}
                  >
                    USD
                  </div>
                </div>
              )}
            </div>
            <div className="wishes__filter--item wishes__filter--item-budget">
              <div className="wishes__filter--item-top">
                <span className="wishes__filter--item-title">Budget</span>
              </div>
              <input
                type="range"
                min={1}
                max={100000}
                onChange={handleBudget}
              />
              <div className="wishes__filter--item-budbot">
                <div className="wishes__filter--item-minmax">{`${min}-`}</div>-
                <div className="wishes__filter--item-minmax">{"100000-"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wishes__cards cards">
        {loading && <Loader />}
        {!loading &&
          visible.length > 0 &&
          visible.map((wish) => (
            <div className="wishes__card" key={wish.id}>
              <img className="wishes__card--img" src={wish.attachment} />
              <h4 className="wishes__card--title">{wish.title}</h4>
              <ul className="wishes__card--desc">
                <li className="wishes__card--desc-item">{wish.city}</li>
                <li className="wishes__card--desc-item">{wish.user_age}</li>
              </ul>

              {wish.is_activated && (
                <div className="wishes__card--reserve">Reserved for embody</div>
              )}

              <button className="wishes__card--btn" onClick={handleShow}>
                Embody
              </button>
            </div>
          ))}

        {!loading && visible.length === 0 && (
          <p className="wishes__error">There are no wishes yet</p>
        )}
      </div>
      <ModalForm setShow={setShow} show={show} />
    </div>
  );
}