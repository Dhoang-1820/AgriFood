import { LogoutIcon, MapMakerIcon, PaperIcon, UserSolidIcon, WalletIcon } from '~/components/Icons'
import { Link } from 'react-router-dom'
import routes from '~/config/routes'

import classNames from 'classnames/bind'
import styles from './User.module.scss'
const cx = classNames.bind(styles)

function User({ children }) {
    const type = window.location.pathname

    console.log(typeof type)
    console.log(typeof routes.profile)
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <div className={cx('sibar-menu')}>
                    <div className={cx('menu-item', type === routes.profile && 'active')}>
                        <Link to={routes.profile}>
                            <UserSolidIcon className={cx('menu-icon')} />
                            <span className={cx('menu-tile')}>Tài khoản</span>
                        </Link>
                    </div>
                    <div className={cx('menu-item', type === routes.orders && 'active')}>
                        <Link to={routes.orders}>
                            <PaperIcon className={cx('menu-icon')} />
                            <span className={cx('menu-tile')}>Quản lý đơn hàng</span>
                        </Link>
                    </div>
                    <div className={cx('menu-item', type === routes.addressBook && 'active')}>
                        <Link to={routes.addressBook}>
                            <MapMakerIcon className={cx('menu-icon')} />
                            <span className={cx('menu-tile')}>Sổ địa chỉ</span>
                        </Link>
                    </div>
                    <div className={cx('menu-item', type === routes.transactionHistory && 'active')}>
                        <Link to={routes.transactionHistory}>
                            <WalletIcon className={cx('menu-icon')} />
                            <span className={cx('menu-tile')}>Lịch sử giao dịch</span>
                        </Link>
                    </div>
                    <div className={cx('menu-item')}>
                        <Link to={routes.home}>
                            <LogoutIcon className={cx('menu-icon')} />
                            <span className={cx('menu-tile')}>Đăng xuất</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={cx('content')}>{children}</div>
        </div>
    )
}

export default User
