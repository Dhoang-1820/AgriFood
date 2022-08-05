import Product from '../../components/Product'

import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import styles from '../Home.module.scss'

const cx = classNames.bind(styles)

function Category({ category }) {
    return (
        <div className={cx('product-container')}>
            <div className={cx('product-header')}>
                {/* <h3 className={cx('product-title')}>{category.title}</h3> */}
            </div>
            <div className={cx('product-list')}>
                {/* {category.products && category.products.map((item, index) => <Product key={index} product={item} />)} */}
            </div>
            <div className={cx('product-footer')}>
                <div className={cx('product-show-more')}>
                    <div>{/* Xem thêm 33 sản phẩm <strong>{category.title}</strong> */}</div>
                    <FontAwesomeIcon icon={faAngleDown} className={cx('product-show-more__icon')} />
                </div>
            </div>
        </div>
    )
}

export default Category
