import classNames from 'classnames/bind'
import styles from './Product.module.scss'

import { Link } from 'react-router-dom'
import Tippy from '@tippyjs/react'
import 'tippy.js/animations/scale-subtle.css'

import ChangeToSlug from '~/common_services/ChangeToSlug'
import Button from '~/components/Button'
import FormatCurrency from '~/common_services/FormatCurrency'

const cx = classNames.bind(styles)

function Product({ product, FourCol = false }) {
    return (
        <div className={FourCol ? cx('product-col-4') : cx('product-col-5')}>
            <div className={cx('product-item')}>
                <Link to={`/products/${ChangeToSlug(product.title)}--${product.code}`}>
                    <div className={cx('product-image')}>
                        <img src={product.image} alt={product.title}></img>
                    </div>
                </Link>
                <div className={cx('product-unit-wrapper')}>
                    <Tippy
                        animation='scale-subtle'
                        duration={[100, 100]}
                        content={<div className={cx('tooltip')}>{product.title}</div>}
                    >
                        <Link to={`/products/${product.title}--${product.code}`}>
                            <h2 className={cx('product-name')}>{product.title}</h2>
                        </Link>
                    </Tippy>
                    <h3 className={cx('product-unit')}>ĐVT: {product.unit}</h3>
                    <div className={cx('product-price')}>{FormatCurrency(product.price)}</div>
                    {/* <span className={cx('product-price-origin')}>{FormatCurrency(product.price)}</span> */}
                </div>
                <Button outLine>Thêm vào giỏ</Button>
            </div>
        </div>
    )
}

export default Product
