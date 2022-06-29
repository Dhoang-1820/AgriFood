import Header from './Header'
import Footer from './Footer'
import Slider from './Header/Slideder'

import classNames from 'classnames/bind'
import styles from './DefaultLayout.module.scss'

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Slider />
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    )
}

export default DefaultLayout
