import classNames from 'classnames/bind'
import styles from './Product.module.scss'

import { Link } from 'react-router-dom'
import Tippy from '@tippyjs/react'
import 'tippy.js/animations/scale-subtle.css'

import ChangeToSlug from '~/commonServices/ChangeToSlug'
import Button from '~/components/Button'
import FormatCurrency from '~/commonServices/FormatCurrency'

const cx = classNames.bind(styles)

function Product({ product, FourCol = false }) {
    return (
        <div className={FourCol ? cx('product-col-4') : cx('product-col-5')}>
            <div className={cx('product-item')}>
                <Link to={`/products/${ChangeToSlug(product.name)}--${product.code}`}>
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
                        <Link to={`/products/${product.name}--${product.code}`}>
                            <h2 className={cx('product-name')}>{product.name}</h2>
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
