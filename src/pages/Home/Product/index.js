import classNames from 'classnames/bind'
import styles from '../Home.module.scss'

import { Link } from 'react-router-dom'
import Tippy from '@tippyjs/react'
import 'tippy.js/animations/scale-subtle.css'

import ChangeToSlug from '~/components/Services/ChangeToSlug'

const cx = classNames.bind(styles)

function Product({ product }) {
    return (
        <div className={cx('product-col-2-4')}>
            <div className={cx('product-item')}>
                <Link to={`products/${ChangeToSlug(product.name)}--${product.code}`}>
                    <div className={cx('product-image')}>
                        <img src={product.image} alt={product.name}></img>
                    </div>
                </Link>
                <div className={cx('product-unit-wrapper')}>
                    <Tippy
                        animation='scale-subtle'
                        duration={[100, 100]}
                        content={<div className={cx('tooltip')}>{product.name}</div>}
                    >
                        <Link to={`products/${product.name}--${product.code}`}>
                            <h2 className={cx('product-name')}>{product.name}</h2>
                        </Link>
                    </Tippy>
                    <h3 className={cx('product-unit')}>ĐVT: {product.unit}</h3>
                    <div className={cx('product-price')}>
                        {product.price}&nbsp;<span>₫</span>
                    </div>
                </div>
                <button className={cx('product-btn')}>Thêm vào giỏ</button>
            </div>
        </div>
    )
}

export default Product
