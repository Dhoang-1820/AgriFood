import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import classnames from 'classnames/bind'
import styles from './Slider.module.scss'

const cx = classnames.bind(styles)

function Slider() {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    }
    return (
        <div className={cx('wrapper')}>
            <div
                style={{
                    paddingBottom: '30px',
                    position: 'relative',
                }}
            >
                <Carousel
                    containerClass='container'
                    transitionDuration={500}
                    responsive={responsive}
                    autoPlaySpeed={3000}
                    ssr={true} // means to render carousel on server-side.
                    infinite
                    autoPlay
                    showDots
                >
                    <img
                        className={cx('image')}
                        src='https://cdn-crownx.winmart.vn/images/prod/ch%C4%83m%20s%C3%B3c%20c%C3%A1%20nh%C3%A2n_1180x400%20copy%202_05361143-5dea-47b1-bca8-d5b27de08bc5.jpg'
                    />
                    <img
                        className={cx('image')}
                        src='https://cdn-crownx.winmart.vn/images/prod/%C4%91%E1%BB%93%20u%E1%BB%91ng_1180x400%20copy_e630d90c-67fe-44d3-aef0-7266b0427969.jpg'
                    />
                    <img
                        className={cx('image')}
                        src='https://cdn-crownx.winmart.vn/images/prod/rau%20c%E1%BB%A7%20th%E1%BB%8Bt_1180x400-02_f4fb5d58-9253-4fb0-bde1-6357cc88d3e8.jpg'
                    />
                </Carousel>
            </div>
        </div>
    )
}

export default Slider
