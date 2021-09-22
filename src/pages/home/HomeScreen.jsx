import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import ProductsList from '../../components/productList/ProductsList';
import Slider from '../../components/slider/Slider';
import Footer from '../../components/footer/Footer';

const HomeScreen = () => { 

  return (
    <React.Fragment>
      <Navbar />
       &nbsp;&nbsp;&nbsp;      
      <Slider width={'75%'} />    
      &nbsp;&nbsp;
      <ProductsList />
      <Footer />
    </React.Fragment>
  );
};


export default HomeScreen
