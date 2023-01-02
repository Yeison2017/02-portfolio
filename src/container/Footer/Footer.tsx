import React, { useState } from "react";

import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";
import "./Footer.scss";

type Event =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

interface IContact {
  _type: string;
  name: string;
  email: string;
  message: string;
}

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e: Event) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact: IContact = {
      _type: "contact",
      name: name,
      email: email,
      message: message,
    };

    client.create(contact).then(() => {
      setLoading(false);
      setIsFormSubmitted(true);
    });
  };

  return (
    <>
      <h2 className="head-text">Take a coffe & chat whith me</h2>

      <div className="app__footer-cards">
        <FooterCard
          image={images.email}
          altImage="email"
          aHref="mailto:yeisonhernandez3004@hotmail.com"
          data="yeisonhernandez3004@hotmail.com"
        />
        <FooterCard
          image={images.mobile}
          altImage="mobile"
          aHref="tel: +1 (123) 456-789"
          data="tel: +1 (123) 456-789"
        />
      </div>
      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              type="text"
              className="p-text"
              placeholder="Your Name"
              name="name"
              value={name}
              onChange={handleChangeInput}
            />
          </div>
          <div className="app__flex">
            <input
              type="email"
              className="p-text"
              placeholder="Your Email"
              name="email"
              value={email}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name={message}
              onChange={handleChangeInput}
            ></textarea>
          </div>
          <button type="button" className="p-text" onClick={handleSubmit}>
            {loading ? "Sending" : "Send Message"}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">Thank you for getting in touch!</h3>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);

interface IFooterCard {
  image: string;
  altImage: string;
  aHref: string;
  data: string;
}

const FooterCard = ({ image, altImage, aHref, data }: IFooterCard) => {
  return (
    <div className="app__footer-card">
      <img src={image} alt={altImage} />
      <a href={aHref} className="p-text">
        {data}
      </a>
    </div>
  );
};
