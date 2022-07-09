import { LogoutIcon, MapMakerIcon, PaperIcon, UserSolidIcon, WalletIcon } from '~/components/Icons'
import classNames from 'classnames/bind'
import styles from './User.module.scss'
const cx = classNames.bind(styles)

function User({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <div className={cx('sibar-menu')}>
                    <div className={cx('menu-item')}>
                        <UserSolidIcon className={cx('menu-icon')} />
                        <span className={cx('menu-tile')}>Tài khoản</span>
                    </div>
                    <div className={cx('menu-item')}>
                        <PaperIcon className={cx('menu-icon')} />
                        <span className={cx('menu-tile')}>Quản lý đơn hàng</span>
                    </div>
                    <div className={cx('menu-item')}>
                        <MapMakerIcon className={cx('menu-icon')} />
                        <span className={cx('menu-tile')}>Sổ địa chỉ</span>
                    </div>
                    <div className={cx('menu-item')}>
                        <WalletIcon className={cx('menu-icon')} />
                        <span className={cx('menu-tile')}>Lịch sử giao dịch</span>
                    </div>
                    <div className={cx('menu-item')}>
                        <LogoutIcon className={cx('menu-icon')} />
                        <span className={cx('menu-tile')}>Đăng xuất</span>
                    </div>
                </div>
            </div>
            <div className={cx('content')}>{children}</div>
        </div>
    )
}

export default User
