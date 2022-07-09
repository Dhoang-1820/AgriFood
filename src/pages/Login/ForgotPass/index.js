import styles from './ForgotPass.module.scss'
import classNames from 'classnames/bind'
import Button from '~/components/Button'
import { Link } from 'react-router-dom'
import Header from '../Header'

const cx = classNames.bind(styles)

function ForgotPass() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-container')}>
                <Header to='/login'>Quên mật khẩu</Header>
                <div className={cx('title')}>Nhập email hoặc số điện thoại</div>
                <input placeholder='Email hoặc số điện thoại' />
                <Button primary className={cx('btn')}>
                    Tiếp tục
                </Button>
                <Link to='/login'>Đăng nhập</Link>
            </div>
        </div>
    )
}

export default ForgotPass
