/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Wish } from "../../types/Wish";
import { Fill } from "../../types/WishTypes";
import { ModalForm } from "../Modal/Modal";

import "./Wishes.scss";
import { Loader } from "../Loader";

type Props = {
  wishes: Wish[];
  visible: Wish[];
  setVisible: React.Dispatch<React.SetStateAction<Wish[]>>;
};

export const Wishes: React.FC<Props> = ({ wishes, visible, setVisible }) => {
  const [show, setShow] = useState(false);
  const [showRegion, setShowRegion] = useState(false);
  const [fulfilled, setFulfilled] = useState<Wish[]>([]);
  const [unFulfilled, setUnFulfilled] = useState<Wish[]>([]);
  const [min, setMin] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch("https://wish-factory.onrender.com/api/dream/dreams/")
      .then((res) => res.json())
      .then((wishesServer: Wish[]) => {
        setVisible(wishesServer);
      });
    setLoading(false)
  }, []);

  useEffect(() => {
    setFulfilled([...wishes].filter((w) => w.status === Fill.FULFILED));
  }, [visible, wishes]);

  useEffect(() => {
    setUnFulfilled([...wishes].filter((w) => w.status === Fill.UNFULFILED));
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

  const filteredByTypeWishes = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    return [...wishes].filter((w) => w.dream_type === e.target.value.toLowerCase());
  };

  const filteredByCurrencyWishes = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    return [...wishes].filter(
      (w) => w.currency === e.target.value
    );
  };

  const handleBudget = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMin(+e.target.value);
    setVisible([...wishes].filter((w) => w.price >= +e.target.value));
  };

  const handleShow = () => setShow(true);

  return (
    <div className="wishes">
      <div className="wrapper">
        <h2 className="wishes__title">Wishes</h2>
      </div>

      <div className="wrapper">
        <div className="wishes__sort">
          <div className="wrapper">
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
                <span className="wishes__sort--item-count">
                  {wishes.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className="wishes__filter">
          <div className="wishes__filter--inner">
            <select
              className="wishes__filter--item"
              name="dreamType"
              id="dreamType"
              onChange={(e) => {
                setVisible(filteredByTypeWishes(e));
                console.log(visible);
              }}
            >
              <option selected disabled>
                Dream type
              </option>
              <option value="TO-GO">TO-GO</option>
              <option value="TO-MEET">TO-MEET</option>
              <option value="TO-BE">TO-BE</option>
              <option value="TO-HAVE">TO-HAVE</option>
            </select>

            <div className="wishes__filter--reg">
              <div
                className="wishes__filter--reg-top"
                onClick={() => setShowRegion(!showRegion)}
              >
                <span className="wishes__filter--reg-title">Region</span>
                <img
                  src="./img/arrowdown.svg"
                  alt="arrowdown"
                  className="wishes__filter--reg-img"
                />
              </div>
              {showRegion && (
                <input
                  className="wishes__filter--reg-input"
                  type="text"
                  placeholder="Start typing to find city"
                  onChange={(e) => filteredByRegion(e)}
                />
              )}
            </div>

            <select
              className="wishes__filter--item"
              name="currency"
              id="currency"
              onChange={(e) => {
                setVisible(filteredByCurrencyWishes(e));
                console.log(visible);
              }}
            >
              <option selected disabled>
                Currency
              </option>
              <option value="UAH">UAH</option>
              <option value="USD">USD</option>
            </select>

            <div className="wishes__filter--budget">
              <h3 className="wishes__filter--budget-title">Budget</h3>
              <input
                type="range"
                min={1}
                max={100000}
                onChange={handleBudget}
                className="wishes__filter--budget-range"
              />
              <div className="wishes__filter--budget-boxes">
                <div className="wishes__filter--budget-minmax">{`${min}`}</div>
                <div className="wishes__filter--budget-minmax">{"100000"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrapper">
        {loading ? (
          <Loader />
        ) : (
          <div className="wishes__cards">
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
                    <div className="wishes__card--reserve">
                      Reserved for embody
                    </div>
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
        )}
      </div>

      <ModalForm setShow={setShow} show={show} />
    </div>
  );
};
