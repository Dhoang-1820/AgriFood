import { LogoutIcon, MapMakerIcon, TruckIcon, UserIcon, UserSolidIcon, WalletIcon } from '~/components/Icons'
import { Link } from 'react-router-dom'

import classnames from 'classnames/bind'
import styles from './Account.module.scss'

const cx = classnames.bind(styles)

function Account() {
    return (
        <div className={cx('account')}>
            <UserIcon className={cx('actions-icon')} />
            <span className={cx('actions-text')}>HoangHuy</span>
            <ul className={cx('account-menu')}>
                <li className={cx('menu-item')}>
                    <Link to='/user'>
                        <UserSolidIcon className={cx('menu-icon')} />
                        <span>Tài khoản</span>
                    </Link>
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
    )
}

export default Account
