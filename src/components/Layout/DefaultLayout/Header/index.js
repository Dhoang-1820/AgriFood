import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMapMarkerAlt,
    faSearch,
    faShoppingBasket,
    faUserCircle,
    faSpinner,
    faUser,
    faTruck,
    faWallet,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react/headless'
import { useEffect, useRef, useState } from 'react'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'

import classnames from 'classnames/bind'
import styles from './Header.module.scss'
import images from '~/assets/images'
import ResultItem from './ResultItem'
import CartItem from './CartItem'
import Navigation from './Navigation'
import {
    CartIcon,
    UserIcon,
    MapMakerIcon,
    UserSolidIcon,
    TruckIcon,
    LogoutIcon,
    WalletIcon,
    SearchIcon,
} from '~/components/Icons'

const cx = classnames.bind(styles)

function Header() {
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        setTimeout(() => {
            setSearchResults([1, 2, 3])
        }, 0)
    }, [])

    const headerRef = useRef()

    useEffect(() => {
        document.onscroll = () => {
            const scrollTop = document.documentElement.scrollTop || window.scrollY
            headerRef.current.style.transition = 'all 1s'
            if (scrollTop >= 600) {
                headerRef.current.style.height = 50 + 'px'
            } else {
                headerRef.current.style.height = 80 + 'px'
            }
        }
    }, [])

    return (
        <div className={cx('header')}>
            <header className={cx('wrapper')} ref={headerRef}>
                <div className={cx('content')}>
                    <div className={cx('logo')}>
                        <a href='/'>
                            <img src={images.logo} alt='logo' className={cx('logo-img')} />
                        </a>
                    </div>
                    <Tippy
                        placement='bottom'
                        interactive
                        visible={searchResults.length > 0}
                        render={(attrs) => (
                            <div className={cx('wrapper-results')} tabIndex='-1' {...attrs}>
                                <h4>Sản phẩm gợi ý</h4>
                                <div className={cx('result-list')}>
                                    <ResultItem />
                                    <ResultItem />
                                    <ResultItem />
                                    <ResultItem />
                                    <ResultItem />
                                    <ResultItem />
                                </div>
                            </div>
                        )}
                    >
                        <div className={cx('search')}>
                            <input placeholder='Nhập tên sản phẩm, mã sản phẩm, từ khoá cần tìm...' />
                            <button className={cx('clear')}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                            <button className={cx('btn-search')}>
                                <SearchIcon className={cx('icon-search')} />
                                {/* <FontAwesomeIcon icon={faSearch} className={cx('icon-search')} /> */}
                            </button>
                        </div>
                    </Tippy>
                    <div className={cx('actions')}>
                        <div className={cx('account')}>
                            <UserIcon className={cx('actions-icon')} />
                            <span className={cx('actions-text')}>HoangHuy</span>
                            <ul className={cx('account-menu')}>
                                <li className={cx('menu-item')}>
                                    <UserSolidIcon className={cx('menu-icon')} />
                                    <span>Tài khoản</span>
                                </li>
                                <li className={cx('menu-item')}>
                                    <TruckIcon className={cx('menu-icon')} />
                                    <span>Quản lý đơn hàng</span>
                                </li>
                                <li className={cx('menu-item')}>
                                    <MapMakerIcon className={cx('menu-icon')} width={'2rem'} height={'2rem'} />
                                    <span>Sổ địa chỉ</span>
                                </li>
                                <li className={cx('menu-item')}>
                                    <WalletIcon className={cx('menu-icon')} />
                                    <span>Lịch sử giao dịch</span>
                                </li>
                                <li className={cx('menu-item')}>
                                    <LogoutIcon className={cx('menu-icon')} />
                                    <span>Đăng xuất</span>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('cart')}>
                            <CartIcon className={cx('actions-icon')} />
                            <span className={cx('actions-text')}>Giỏ hàng</span>
                            <div className={cx('cart-list')}>
                                <div className={cx('list-item')}>
                                    <CartItem />
                                    <CartItem />
                                    <CartItem />
                                    <CartItem />
                                    <CartItem />
                                    <CartItem />
                                    <CartItem />
                                    <CartItem />
                                    <CartItem />
                                    <CartItem />
                                </div>
                                <div className={cx('cart-total')}>
                                    <span className={cx('total-quantity')}>
                                        Có tổng số <b>5</b> sản phẩm
                                    </span>
                                    <span>Tổng tiền:</span>
                                    <span className={cx('total-money')}>321.800đ</span>
                                </div>
                                <div className={cx('cart-footer')}>
                                    <button className={cx('cart-btn')}>Xem chi tiết</button>
                                    <button className={cx('cart-btn', 'active')}>Thanh toán ngay</button>
                                </div>
                            </div>
                        </div>
                        <div className={cx('locations')}>
                            <MapMakerIcon className={cx('actions-icon')} />
                            <span className={cx('actions-text')}>Đăk Lăk</span>
                        </div>
                    </div>
                </div>
            </header>
            <Navigation />
        </div>
    )
}

export default Header
