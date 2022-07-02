import Product from '../Product'

import classNames from 'classnames/bind'
import styles from '../Home.module.scss'

const cx = classNames.bind(styles)

function Category({ category }) {
    return (
        <div className={cx('product-container')}>
            <div className={cx('product-header')}>
                <h3 className={cx('product-title')}>{category.title}</h3>
            </div>
            <div className={cx('product-list')}>
                {category.products && category.products.map((item, index) => <Product key={index} product={item} />)}
            </div>
            <div className={cx('product-footer')}>
                <button className={cx('product-btn')}>Xem thêm 33 sản phẩm {category.title}</button>
            </div>
        </div>
    )
}

export default Category
