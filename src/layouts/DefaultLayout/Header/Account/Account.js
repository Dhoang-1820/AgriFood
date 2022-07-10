import { LogoutIcon, MapMakerIcon, TruckIcon, UserIcon, UserSolidIcon, WalletIcon } from '~/components/Icons'
import { Link } from 'react-router-dom'
import routes from '~/config/routes'

import classnames from 'classnames/bind'
import styles from './Account.module.scss'

const cx = classnames.bind(styles)

function Account() {
    return (
        <div className={cx('account')}>
            <UserIcon className={cx('actions-icon')} />
            <span className={cx('actions-text')}>HoangHuy</span>
            <ul className={cx('account-menu')}>
                <li>
                    <Link className={cx('menu-item')} to={routes.profile}>
                        <UserSolidIcon className={cx('menu-icon')} />
                        <span>Tài khoản</span>
                    </Link>
                </li>
                <li>
                    <Link className={cx('menu-item')} to={routes.orders}>
                        <TruckIcon className={cx('menu-icon')} />
                        <span>Quản lý đơn hàng</span>
                    </Link>
                </li>
                <li>
                    <Link className={cx('menu-item')} to={routes.addressBook}>
                        <MapMakerIcon className={cx('menu-icon')} width={'2rem'} height={'2rem'} />
                        <span>Sổ địa chỉ</span>
                    </Link>
                </li>
                <li>
                    <Link className={cx('menu-item')} to={routes.transactionHistory}>
                        <WalletIcon className={cx('menu-icon')} />
                        <span>Lịch sử giao dịch</span>
                    </Link>
                </li>
                <li className={cx('menu-item')}>
                    <LogoutIcon className={cx('menu-icon')} />
                    <span>Đăng xuất</span>
                </li>
            </ul>
        </div>
    )
}

export default Account
