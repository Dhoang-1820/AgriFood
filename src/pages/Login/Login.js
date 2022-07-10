import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import Button from '~/components/Button'
import Header from './Header'
import styles from './Login.module.scss'
import routes from '~/config/routes'

const cx = classNames.bind(styles)

function Login() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-container')}>
                <Header to='/'>Đăng nhập</Header>
                <div className={cx('content')}>
                    <input className={cx('email')} placeholder='Email hoặc số điện thoại' />
                    <input className={cx('password')} placeholder='Mật khẩu' />
                    <Link to={routes.forgotPassword} className={cx('forgot-password')}>
                        Quên mật khẩu?
                    </Link>
                </div>
                <div className={cx('btn-group')}>
                    <Button primary className={cx('btn')}>
                        Đăng nhập
                    </Button>
                    <Button to='/' primary className={cx('btn')}>
                        Trang chủ
                    </Button>
                    <Link to={routes.signup} className={cx('signup')}>
                        Tạo tài khoản
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login
