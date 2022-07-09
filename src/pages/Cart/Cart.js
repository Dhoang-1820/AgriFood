import styles from './Cart.module.scss'
import classNames from 'classnames/bind'
import { IconRecycle, MinusIcon, PlusIcon } from '~/components/Icons'
import Button from '~/components/Button'
import { useEffect, useState } from 'react'
import * as cartServices from '~/apiServices/cartServices'
import CartItem from '../components/CartItem'

const cx = classNames.bind(styles)

function Cart() {
    const [carts, setCarts] = useState([])

    useEffect(() => {
        const fechAPI = async () => {
            const result = await cartServices.getCarts()
            setCarts(result)
        }
        fechAPI()
    }, [])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('cart-infor')}>
                <div className={cx('cart-btn')}>
                    <Button primary>Tiếp tục mua hàng</Button>
                    <Button disable>Xoá giỏ hàng?</Button>
                </div>
                <div className={cx('cart-list')}>
                    {carts.map((product) => (
                        <CartItem key={product.code} item={product} />
                    ))}
                </div>
            </div>
            <div className={cx('payment-infor')}>
                <div className={cx('payment-row')}>
                    <span>Tạm tính</span>
                    <span>126.500đ</span>
                </div>
                <div className={cx('payment-row')}>
                    <input placeholder='Nhập mã giảm giá tại đây'></input>
                </div>
                <div className={cx('payment-row')}>
                    <span>Phí vận chuyển</span>
                    <span>30.000đ</span>
                </div>
                <div className={cx('payment-row')}>
                    <span>Thành tiền</span>
                    <span className={cx('total-cash')}>30.000đ</span>
                </div>
                <span className={cx('payment-vat')}>(Giá đã bao gồm VAT)</span>
                <Button primary className={cx('payment-btn')}>
                    Thanh toán
                </Button>
            </div>
        </div>
    )
}

export default Cart
