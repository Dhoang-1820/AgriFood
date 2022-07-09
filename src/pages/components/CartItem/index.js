import styles from '../../Cart/Cart.module.scss'
import classNames from 'classnames/bind'
import { IconRecycle, MinusIcon, PlusIcon } from '~/components/Icons'
import { useState } from 'react'

const cx = classNames.bind(styles)

function CartItem({ item }) {
    const [quantity, setQuantity] = useState(item.quantity)

    const handleMinus = () => {
        quantity >= 1 && setQuantity((prev) => prev - 1)
    }

    const handlePlus = () => {
        setQuantity((prev) => prev + 1)
    }

    return (
        <div className={cx('cart-item')}>
            <div className={cx('product-infor')}>
                <img className={cx('product-image')} src={item.image} alt='product img'></img>
                <div className={cx('product-description')}>
                    <div className={cx('title')}>{item.name}</div>
                    <div className={cx('units')}>ĐVT: {item.unit}</div>
                    <div className={cx('remove-item')}>
                        <IconRecycle />
                        <span>Xoá khỏi giỏ hàng</span>
                    </div>
                </div>
            </div>
            <div className={cx('product-price')}>
                <div className={cx('price')}>
                    <span className={cx('price-sale')}>{item.price}đ</span>
                    <span className={cx('price-original')}>16.700</span>
                    <span className={cx('sale-percents')}>(-25%)</span>
                </div>
                <div className={cx('quantity')}>
                    <button className={cx('btn-minus')} onClick={handleMinus}>
                        <MinusIcon />
                    </button>
                    <input
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        type='text'
                        className={cx('input-text')}
                        maxLength={2}
                        max={99}
                        min={1}
                    />
                    <button className={cx('btn-plus')} onClick={handlePlus}>
                        <PlusIcon />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartItem
