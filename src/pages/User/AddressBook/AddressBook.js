import User from '../User'
import Button from '~/components/Button'
import routes from '~/config/routes'

import classNames from 'classnames/bind'
import styles from './AddressBook.module.scss'
const cx = classNames.bind(styles)

function AddressBook() {
    return (
        <User>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <span className={cx('title')}>Danh sách địa chỉ</span>
                    <Button primary to={routes.createAddress}>
                        Thêm địa chỉ mới
                    </Button>
                </div>
                <div className={cx('content')}>
                    <div className={cx('body')}>
                        <img
                            src='https://winmart.vn/_next/static/images/no-product-c2f7be08e62593a82bc819708625486b.png'
                            alt='no-orders-img'
                        ></img>
                        <span className={cx('not-fount-text')}>Không tìm thấy kết quả</span>
                    </div>
                </div>
            </div>
        </User>
    )
}

export default AddressBook
