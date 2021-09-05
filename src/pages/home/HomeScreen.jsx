import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import ProductsList from '../../components/productList/ProductsList';
import Slider1 from '../../components/slider/Slider1';
import Footer from '../../components/footer/Footer';
import sliderData from '../../data/slider';
// import Slider2 from '../../components/slider/Slider2';
// import styles from './HomeScreen.module.css';

const HomeScreen = () => {

  return (
    <React.Fragment>
      <Navbar />
      <Slider1 data={sliderData} />
      &nbsp;&nbsp;&nbsp;    
      <Slider1 data={sliderData} from={1} to={5} width={'75%'} />
      {/* <Slider2 /> */}
      &nbsp;&nbsp;
      <ProductsList />
      <Footer />
    </React.Fragment>
  );
};

export default HomeScreen;
