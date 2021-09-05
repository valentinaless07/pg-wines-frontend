import uniqid from 'uniqid';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './Slider1.css';
import sliderData from '../../data/slider';
const sliderImages = require.context('../../assests/images/slider', true);

const Slider1 = ({data, from =0, to = 0, width='100%'}) => {
    return (
        <div>
            <Carousel infiniteLoop autoplay showThumbs={false} width={width} >
                {
                    sliderData.filter(({_},idx) =>  idx >= from && idx <= to).map(({ photo, caption, onClickGoTo }, idx) => (
                        <div key={uniqid()} className="image">
                            <img src={sliderImages(`./${photo}.png`).default} alt="" />
                        </div>
                    ))
                }                
            </Carousel>
        </div>
    )
}

export default Slider1;
