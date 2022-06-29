import classnames from 'classnames/bind';
import styles from './CartItem.module.scss';

const cx = classnames.bind(styles);

function CartItem() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('product-img')}>
                <img className={cx('img')} src='https://cdn-crownx.winmart.vn/images/prod/162427581122910622859-LOC-Mo-Jin-cay-Ottogi-gui-80g.jpg'></img>
            </div>
            <div className={cx('description')}>
                <p className={cx('title')}>Mì bò hầm Ottogi Lốc 8 gói x 120g </p>
                <p className={cx('units')}>ĐVT: Lô, lốc</p>
                <div className={cx('details')}>
                    <p className={cx('quantity')}>x1</p>
                    <p className={cx('price')}>70.900đ</p>
                </div>
            </div>
        </div> 
    );
}

export default CartItem;