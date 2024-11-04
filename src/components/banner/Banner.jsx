
import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banner = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
   
      <Slider {...settings} style={{ width: '50%' }}>
        <div>
          <img 
            src="https://images-eu.ssl-images-amazon.com/images/G/31/Events/img24/Jupiter24/HERO/Phase3/J24_P3B_GW_PC_EventHero_NTA_ET_2x._CB544128879_.jpg" 
            alt="Image 1" 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
          />
        </div>
        <div>
          <img 
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/MA2024/GW/Jupiter/Phase3B/PC/Unrec/78249._CB543763953_.jpg" 
            alt="Image 2" 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
          />
        </div>
      </Slider>
 
  );
};

export default Banner;
