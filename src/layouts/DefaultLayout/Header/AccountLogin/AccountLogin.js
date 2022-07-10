import classnames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { UserIcon } from '~/components/Icons'
import routes from '~/config/routes'

import styles from '../Account/Account.module.scss'
const cx = classnames.bind(styles)

function AccountLogin() {
    return (
        <div className={cx('account')}>
            <Link to={routes.login}>
                <UserIcon className={cx('actions-icon')} />
                <span className={cx('actions-text')}>Tài khoản</span>
            </Link>
        </div>
    )
}

export default AccountLogin
