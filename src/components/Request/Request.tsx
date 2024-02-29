import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "./Request.scss";
import { useState } from "react";
import { Wish } from "../../types/Wish";

type Props = {
  wishes: Wish[]
};

const fileToDataUri = (file: Blob) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {

      resolve(event.target?.result);
    };
    reader.readAsDataURL(file);
  });



export const Request: React.FC<Props> = ({wishes}) => {
  const [value, setValue] = useState('');

  const [id] = useState(wishes.length + 1);
  const [title] = useState('ввв');
  const [description, setDescription] = useState('');
  const [dreamType] = useState('to-go');
  const [userName, setUserName] = useState('');
  const [userAge] = useState(0);
  const [email, setEmail] = useState('');
  const [userType] = useState('requestor');
  const [date, setDate] = useState('');
  const [price] = useState(0);
  const [currency] = useState('UAH');
  const [dataUri, setDataUri] = useState<string | unknown>(undefined);
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [status] = useState("unfulfilled");
  const [isActivated] = useState(false);


  const onChange = (file: Blob) => {
    if (!file) {
      setDataUri("");
      return;
    }

    fileToDataUri(file).then((dataUri) => {
      console.log(dataUri);
      
      setDataUri(dataUri)
    });
  };



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newWish = {
      id: id,
      title: title,
      description: description,
      dream_type: dreamType,
      user_name: userName,
      user_age: userAge,
      user_email: email,
      user_type: userType,
      date: date,
      price: price,
      currency: currency,
      attachment: dataUri,
      city: city,
      region: region,
      status: status,
      is_activated: isActivated,
    };

    fetch("https://wish-factory.onrender.com/api/dream/dreams/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newWish),
    });
  };


  return (
    <div className="request">
      <h2 className="request__title">How it works</h2>
      <div className="request__cards">
        <div className="request__card">
          <img src="./img/To-be.svg" alt="to be" />

          <div className="request__card--bottom">
            <span className="request__card--bottom-step">Step 1</span>
            <p className="request__card--bottom-desc">Submit an application</p>
          </div>
        </div>
        <div className="request__card">
          <img src="./img/To-have.svg" alt="to have" />

          <div className="request__card--bottom">
            <span className="request__card--bottom-step">Step 2</span>
            <p className="request__card--bottom-desc">
              We get in touch with you
            </p>
          </div>
        </div>
        <div className="request__card">
          <img src="./img/To-meet.svg" alt="to meet" />

          <div className="request__card--bottom">
            <span className="request__card--bottom-step">Step 2</span>
            <p className="request__card--bottom-desc">The wish begins</p>
          </div>
        </div>
      </div>

      <form className="request__form" onSubmit={handleSubmit}>
        <h2 className="request__form--title">Request</h2>

        <h4 className="request__form--subtitle">The applicant</h4>
        <div className="request__form--item">
          <span className="request__form--item-title">Who is applying</span>
          <select className="request__form--item-select">
            <option value="mother">Mother</option>
            <option value="father">Father</option>
            <option value="Guardians">Guardians</option>
          </select>
        </div>
        <div className="request__form--item">
          <span className="request__form--item-title">
            Your name and surname
          </span>
          <input type="text" className="request__form--item-input" />
        </div>
        <div className="request__form--item">
          <span className="request__form--item-title">Contact number</span>
          <PhoneInput
            value={value}
            onChange={() => setValue}
            className="request__form--item-phone"
            placeholder="Enter your phone number"
            country="UA"
            international
          />
        </div>
        <div className="request__form--item">
          <span className="request__form--item-title">Email</span>
          <input
            type="email"
            className="request__form--item-input"
            placeholder="example@site.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <h2 className="request__form--title">Whose wish to make come true</h2>
        <div className="request__form--item">
          <span className="request__form--item-title">The wish of </span>
          <select className="request__form--item-select">
            <option value="child">Child</option>
            <option value="father">Eldery</option>
            <option value="Guardians">Guardians</option>
          </select>
        </div>
        <div className="request__form--item">
          <span className="request__form--item-title">
            Name and surname of wish holder
          </span>
          <input
            type="text"
            className="request__form--item-input"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserName(e.target.value)
            }
          />
        </div>
        <div className="request__form--item">
          <span className="request__form--item-title">Sex</span>
          <label className="request__form--item-radio" htmlFor="button">
            <input type="radio" />
            Male
          </label>
          <label htmlFor="button" className="request__form--item-radio">
            <input type="radio" />
            Female
          </label>
        </div>

        <div className="request__form--item">
          <span className="request__form--item-title">Date of birth</span>
          <input
            type="date"
            className="request__form--item-date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="request__form--item">
          <span className="request__form--item-title">
            City or village name
          </span>
          <input
            type="text"
            className="request__form--item-input"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="request__form--item">
          <span className="request__form--item-title">Region</span>
          <input
            type="text"
            className="request__form--item-input"
            onChange={(e) => setRegion(e.target.value)}
          />
        </div>

        <div className="request__form--item">
          <span className="request__form--item-title">
            Describe what the wish is about
          </span>
          <input
            type="textarea"
            className="request__form--item-itext"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <label className="request__form--item-photo" htmlFor="photo">
          Add a photo
          <img src="./img/clip.svg" alt="clip" />
          <input
            type="file"
            id="photo"
            accept=".jpg, .jpeg"
            className="request__form--item-clip"
            onChange={(event) => {
              if (!event.target.files) {
                return;
              }
              onChange(event.target.files[0])
            }}
          />
        </label>

        <label htmlFor="checkbox" className="request__form--item-check">
          <input id="checkbox" type="checkbox" />
          Yes, I have read the offer contract and I consciously and voluntarily
          give my consent to the processing of my personal data.
        </label>

        <button className="request__form--submit" type="submit">
          Send a request
        </button>
      </form>
    </div>
  );
};
