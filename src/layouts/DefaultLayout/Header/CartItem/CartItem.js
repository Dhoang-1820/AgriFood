import classnames from 'classnames/bind'
import styles from './CartItem.module.scss'
import FormatCurrency from '~/common_services/FormatCurrency'
import { Link } from 'react-router-dom'

const cx = classnames.bind(styles)

function CartItem({ item, link }) {
    return (
        <Link to={link} className={cx('wrapper')}>
            <div className={cx('product-img')}>
                <img className={cx('img')} src={item.image} alt={item.title}></img>
            </div>
            <div className={cx('description')}>
                <p className={cx('title')}>{item.title}</p>
                <p className={cx('units')}>ĐVT: {item.unit}</p>
                <div className={cx('details')}>
                    <p className={cx('quantity')}>x{item.quantity}</p>
                    <p className={cx('price')}>{FormatCurrency(item.price)}</p>
                </div>
            </div>
        </Link>
    )
}

export default CartItem
