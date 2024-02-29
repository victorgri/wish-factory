import { Modal } from 'react-bootstrap';
import './Modal.scss';
import PhoneInput from 'react-phone-number-input/input';
import { useState } from 'react';

type Props = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean
};

export const ModalForm: React.FC<Props> = ({ show, setShow }) => {
  const [value, setValue] = useState('');
  return (
    <Modal
      show={show}
      dialogClassName="modal-xl modal__height"
      className="modal"
    >
      <h3 className="modal__title">Request</h3>

      <form className="modal__form">
        <h5 className="modal__form--title">Your details</h5>
        <label className="modal__form--item">
          <input
            type="text"
            placeholder="Your name and surname"
            className="modal__form--item-inner"
          />
        </label>
        <label className="modal__form--item-phone">
          Contact number
          <PhoneInput
            value={value}
            onChange={() => setValue}
            className="modal__form--item-inner"
            placeholder="Enter your phone number"
            country="UA"
            international
          />
        </label>
        <input
          type="email"
          className="modal__form--item-inner"
          placeholder="Email"
        />
        <div className="modal__form--item-rad">
          Method of receipt
          <label className="modal__form--item-sub">
            <input
              type="radio"
              placeholder="Personally"
              className="modal__form--item-inner"
            />
            Personally
            <img src="./img/Question.svg" alt="question" />
          </label>
          <label className="modal__form--item-sub">
            <input
              type="radio"
              placeholder="Personally"
              className="modal__form--item-inner"
            />
            Indirectly
            <img src="./img/Question.svg" alt="question" />
          </label>
        </div>
        <label className="modal__form--item-date">
          Planned realization day
          <input
            type="date"
            placeholder="Your name and surname"
            className="modal__form--item-calendar"
          />
        </label>
        <label className="modal__form--item-checkbox">
          <input type="checkbox" />
          Yes, I have read the offer contract and I consciously and voluntarily
          give my consent to the processing of my personal data.
        </label>
      </form>

      <button
        type="submit"
        className="modal__submit"
        onClick={() => setShow(false)}
      >
        Send
      </button>
    </Modal>
  );
}