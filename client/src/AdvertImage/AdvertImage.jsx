import React, { Component, useState, useEffect } from "react";
import { render } from "react-dom";
import './AdvertImage.css';

const AdvertImage = () => {
  const [reply, setReply] = useState();
  const [randomImage, setRandomImage] = useState('');

  const renderImage = () => {
    const myImages = [
      { image: '../assets/(insert image here.jpg)' },
      { image: '../assets/(insert image here.jpg)' },
        { image: '../assets/(insert image here.jpg)' },
      { image: '../assets/(insert image here.jpg)' },
      { image: '../assets/(insert image here.jpg)' },
        { image: '../assets/(insert image here.jpg)' },
      { image: '../assets/(insert image here.jpg)' },
      { image: '../assets/(insert image here.jpg)' },
      { image: '../assets/(insert image here.jpg)' },
      { image: '../assets/(insert image here.jpg)' },
    ];
    const randomImageIndex = Math.floor(Math.random() * Math.floor(9));
    return myImages[randomImageIndex].image;
  };

  useEffect(() => {
    setRandomImage(renderImage);
  })

  return (
    <div>
      <div>
      </div>
      <div>{reply}</div>
      <img className='image' src={renderImage()} width="480px" height="320.25px" style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}/>
    </div>
  );
};

render(<AdvertImage />, document.getElementById("root"));

export default AdvertImage;