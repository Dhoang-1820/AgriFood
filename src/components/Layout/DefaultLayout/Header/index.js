import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faSearch, faShoppingBasket, faUserCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss'
import images from '~/assets/images'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';



const cx = classNames.bind(styles)

function Header() {
    return (  
        <header className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('logo')}>
                    <a href='/'> 
                        <img src={images.logo} alt='logo' className={cx('logo-img')}/>
                    </a>
                    
                </div>
                <div className={cx('search')}>
                    <input placeholder='Nhập tên sản phẩm, mã sản phẩm, từ khoá cần tìm...'/>
                    <button className={cx('clear')}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                    <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                    <button className={cx('btn-search')} >
                        <FontAwesomeIcon icon={faSearch} className={cx('icon-search')}/>
                    </button>
                </div>
                <div className={cx('actions')}>
                    <a href='/'>
                        <div className={cx('account')}>
                            <FontAwesomeIcon icon={faUserCircle} className={cx('actions-icon')}/>
                            <span className={cx('actions-text')}>Tài khoản</span>
                        </div>
                    </a>
                    <a href='/'>
                        <div className={cx('cart')}>
                            <FontAwesomeIcon icon={faShoppingBasket} className={cx('actions-icon')}/>  
                            <span className={cx('actions-text')}>Giỏ hàng</span>
                        </div>  
                    </a>
                    <a href="/">
                        <div className={cx('locations')}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} className={cx('actions-icon')} />
                            <span className={cx('actions-text')}>Đăk Lăk</span>
                        </div>
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header