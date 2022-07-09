import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import images from '~/assets/images'
import { BackIcon } from '~/components/Icons'
import styles from '../Login.module.scss'

const cx = classNames.bind(styles)

function Header({ children, to }) {
    return (
        <div className={cx('header')}>
            <div className={cx('logo')}>
                <div className={cx('btn-back')}>
                    <Link to={to}>
                        <BackIcon className={cx('btn-back')} />
                    </Link>
                </div>
                <img src={images.logoGreenText} alt='logo' />
            </div>
            <div className={cx('title')}>{children}</div>
        </div>
    )
}

export default Header
