import React from 'react';
import Slider from 'react-slick';
import sliderImages1 from '../../images/sliderdesign.png';
import sliderImages2 from '../../images/78249qwqw.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

const Banner = () => {
  const settings = {
    dots: false,             
    infinite: true,          
    speed: 800,              
    slidesToShow: 1,         
    slidesToScroll: 1,       
    autoplay: true,          
    autoplaySpeed: 3000,    
  };

  return (   
      <Slider {...settings} style={{ width: '1250px' }}>
        <div>
          <Image 
            src={sliderImages1}
            alt="Slider 1"
            style={{ width: '100%', height: 'auto', display: 'block'}} 
          />
        </div>
        <div>
          <Image 
            src={sliderImages2}
            alt="Slider 2"
            style={{ width: '100%', height: 'auto', display: 'block'}} 
          />
        </div>
      </Slider>
  );
};

export default Banner;
