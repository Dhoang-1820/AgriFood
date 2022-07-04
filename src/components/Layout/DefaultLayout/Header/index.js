import images from '~/assets/images'

import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { CartIcon, LogoutIcon, MapMakerIcon, TruckIcon, UserIcon, UserSolidIcon, WalletIcon } from '~/components/Icons'

import CartItem from './CartItem'
import Navigation from './Navigation'
import Search from './Search'
import classnames from 'classnames/bind'
import styles from './Header.module.scss'

const cx = classnames.bind(styles)

function Header() {
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
        <header className={cx('header')}>
            <div className={cx('wrapper')} ref={headerRef}>
                <div className={cx('content')}>
                    <div className={cx('logo')}>
                        <Link to={'/'}>
                            <img src={images.logo} alt='logo' className={cx('logo-img')} />
                        </Link>
                    </div>
                    {/* search */}
                    <Search />
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
                                <div className={cx('list-item', 'scrollbar-custom')}>
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
            </div>
            <Navigation />
        </header>
    )
}

export default Header
