import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import ProductsList from '../../components/productList/ProductsList';
import Slider1 from '../../components/slider/Slider1';
import Footer from '../../components/footer/Footer';

const HomeScreen = () => { 

  return (
    <React.Fragment>
      <Navbar />
       &nbsp;&nbsp;&nbsp;      
      <Slider1  width={'75%'} />    
      &nbsp;&nbsp;
      <ProductsList />
      <Footer />
    </React.Fragment>
  );
};


export default HomeScreen
