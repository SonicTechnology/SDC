import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight, faArrowLeft, faArrowUp, faArrowDown, faExpand,
} from '@fortawesome/free-solid-svg-icons';

function Gallery({
  stylePhotos, mainImage, changeMain, changeView,
}) {
  const [photos, setPhotos] = useState(stylePhotos);
  const [activeIndex, setActiveIndex] = useState('');
  useEffect(() => {
    setPhotos(stylePhotos);
  }, [stylePhotos]);
  const clickThumbnail = (e) => {
    e.preventDefault();
    const newURLMain = stylePhotos.filter((style) => (
      style.thumbnail_url === e.target.src
    ));
    changeMain(newURLMain[0].url);
    setActiveIndex(e.target.id);
  };

  const changeNext = (e) => {
    e.preventDefault();
    const nextImageIndex = Number(e.target.value) + 1;
    if (nextImageIndex === stylePhotos.length) {
      setActiveIndex(0);
      changeMain(stylePhotos[0].url);
    } else {
      setActiveIndex(nextImageIndex);
      changeMain(stylePhotos[nextImageIndex].url);
    }
  };

  const changePrev = (e) => {
    e.preventDefault();
    const nextImageIndex = Number(e.target.value) - 1;
    if (nextImageIndex < 0) {
      setActiveIndex(stylePhotos.length - 1);
      changeMain(stylePhotos[stylePhotos.length - 1].url);
    } else {
      setActiveIndex(nextImageIndex);
      changeMain(stylePhotos[nextImageIndex].url);
    }
  };
  return (
    <div className="grid grid-cols-[7rem_7rem_10rem_10rem_10rem_5rem] grid-rows-[3.5rem_11.5rem_11.5rem_11.5rem_5rem] bg-pastelGray">
      <div id="sideThumbnails" className="row-start-1 row-end-6 col-start-1 col-end-2 flex flex-col justify-center items-center overflow-hidden">
        <button type="button" value={activeIndex} className="h-[5.5em] w-[5em] mb-[0.5em] justify-center z-30 bg-pastelGray" onClick={changePrev}>
          <FontAwesomeIcon
            icon={faArrowUp}
            className="self-center"
          />
        </button>
        <div className="row-start-2 flex flex-col grow-0 max-h-[85%] justify-start z-20 transition-transform" style={{ transform: `translateY(-${activeIndex * 6.5}%)` }}>
          {photos.map((style, index) => (
            <button className="justfy-self-center rounded-md items-center border-line z-0 overflow-show border-2 border-black w-[5em] h-[5em] mt-[0.40em]" key={index} id={index} type="button" onClick={clickThumbnail}>
              <img
                id={index}
                key={index}
                className={(style.url === mainImage)
                  ? 'opacity-100 object-cover rounded-md w-[5em] h-[5em]'
                  : 'opacity-40 object-cover rounded-md w-[5em] h-[5em]'}
                src={style.thumbnail_url}
                alt=""
              />
            </button>
          ))}
        </div>
        <button type="button" value={activeIndex} className="row-start-5 row-end-6 h-[5em] w-[5em] justify-self-center items-center z-30 bg-pastelGray" onClick={changeNext}>
          <FontAwesomeIcon
            icon={faArrowDown}
            className="self-center"
          />
        </button>
      </div>
      <button type="button" value={activeIndex} className="row-star-5 row-end-6 col-start-3 col-end-4" onClick={changePrev}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="self-center"
        />
      </button>
      <button className="place-self-center z-0 row-start-2 row-end-5 col-start-2 col-end-6 h-[30em]" type="button" onClick={changeView}>
        <img className="place-self-center z-0 row-start-2 row-end-5 col-start-2 col-end-6 h-[30em] object-contain" src={mainImage} alt="" />
      </button>
      <button type="button" value={activeIndex} className="row-start-5 row-end-6 col-start-4 col-end-5 justfy-self-center" onClick={changeNext}>
        <FontAwesomeIcon
          icon={faArrowRight}
          className="self-center z-0"
        />
      </button>
      <button type="button" className="place-self-center row-start-1 row-end-2 col-start-6 col-end-7" onClick={changeView}>
        <FontAwesomeIcon
          icon={faExpand}
          className="h-[25px] w-[25px] mt-[10px]"
        />
      </button>
    </div>
  );
}

export default Gallery;
