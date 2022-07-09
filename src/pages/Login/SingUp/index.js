import styles from './SignUp.module.scss'
import classNames from 'classnames/bind'
import Button from '~/components/Button'
import { Link } from 'react-router-dom'
import Header from '../Header'

const cx = classNames.bind(styles)

function SignUp() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-container')}>
                <Header to='/login'>Đăng ký</Header>
                <div className={cx('title')}>Nhập thông tin tài khoản</div>
                <input placeholder='Email hoặc số điện thoại' />
                <input placeholder='Mật khẩu' />
                <input placeholder='Nhập lại mật khẩu' />
                <input placeholder='Họ tên' />
                <div className={cx('active-account')}>Kích hoạt tài khoản</div>
                <Button primary className={cx('btn')}>
                    Tiếp tục
                </Button>
                <Link to='/login'>Đăng nhập</Link>
            </div>
        </div>
    )
}

export default SignUp
