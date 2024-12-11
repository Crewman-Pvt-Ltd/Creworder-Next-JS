import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import useGetAllBanner from '@/api-manage/react-query/useGetAllBanner';

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

  const { data } = useGetAllBanner(); 

  return (
    <Slider {...settings} style={{ width: '1250px' }}>
      {data?.map((item) => (
        <div key={item.id}>
          <Image
            src={item.banner_img}
            alt={`Slider ${item.id}`}
            style={{
              width: '100%',
              height: '230px', 
              display: 'block',
           
              objectFit: 'cover', 
            }}
            width={1250} 
            height={230} 
          />
        </div>
      ))}
    </Slider>
  );
};

export default Banner;
