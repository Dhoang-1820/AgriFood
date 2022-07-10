import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useEffect, useState } from 'react'
import Button from '~/components/Button'

import * as cartServices from '~/apiServices/cartServices'
import styles from './Cart.module.scss'
import classNames from 'classnames/bind'
import CartItem from '../components/CartItem'
import { WarningIconOuLine } from '~/components/Icons'
import routes from '~/config/routes'

const cx = classNames.bind(styles)

function Cart() {
    const [carts, setCarts] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const fechAPI = async () => {
            const result = await cartServices.getCarts()
            setCarts(result)
        }
        fechAPI()
    }, [])

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('cart-infor')}>
                <div className={cx('cart-btn')}>
                    <Button primary to='/'>
                        Tiếp tục mua hàng
                    </Button>
                    <Button disable onClick={handleClickOpen}>
                        Xoá giỏ hàng?
                    </Button>
                </div>
                <div className={cx('cart-list')}>
                    {carts.map((product) => (
                        <CartItem key={product.code} item={product} />
                    ))}
                </div>
            </div>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                >
                    <DialogTitle id='alert-dialog-title'></DialogTitle>
                    <DialogContent>
                        <div>
                            <div className={cx('dialog-icon')}>
                                <WarningIconOuLine />
                            </div>
                            <div className={cx('dialog-title')}>Xoá giỏ hàng</div>
                            <div className={cx('dialog-content')}>
                                Cảnh báo: Toàn bộ sản phẩm trong giỏ hàng hiện tại sẽ bị xoá đi
                            </div>
                            <div className={cx('dialog-btn-group')}>
                                <Button disable onClick={handleClose}>
                                    Huỷ
                                </Button>
                                <Button primary onClick={handleClose} autoFocus>
                                    Xác nhận
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
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
                <div className={cx('payment-vat')}>(Giá đã bao gồm VAT)</div>
                <Button primary to={routes.checkout} className={cx('payment-btn')}>
                    Thanh toán
                </Button>
            </div>
        </div>
    )
}

export default Cart
