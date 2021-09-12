import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import ProductsList from '../../components/productList/ProductsList';
import Slider1 from '../../components/slider/Slider1';
import Footer from '../../components/footer/Footer';
import sliderData from '../../data/slider';
// import styles from './HomeScreen.module.css';
import { localStorageInit } from '../../redux/actions/cartActions';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const HomeScreen = ({localStorageInit}) => {

  useEffect(() => {
    localStorageInit()
} , [localStorageInit]);

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


const mapDispatchToProps = (dispatch) => {
  return { 
    localStorageInit: () => dispatch(localStorageInit())
  }
}

export default connect(null, mapDispatchToProps)(HomeScreen);
