import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState } from 'react'

import classNames from 'classnames/bind'
import Product from '../components/Product/Product'
import styles from './Categories.module.scss'

const cx = classNames.bind(styles)

function Categories() {
    const btnRef = useRef()
    const contentRef = useRef()

    const [checked, setChecked] = useState(false)

    const handleChecked = () => {
        setChecked(!checked)
    }

    const handleCollapse = () => {
        setChecked(!checked)
        btnRef.current.style = checked ? 'transform: rotate(-90deg)' : 'transform: rotate(0deg)'
        contentRef.current.style = checked ? 'display:none' : 'display:flex'
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <div className={cx('sidebar-category')}>
                    <div className={cx('sidebar-header')} onClick={handleCollapse}>
                        <span className={cx('sidebar-title')}>Thịt - Trứng - Hải sản</span>
                        <button className={cx('btn-down')}>
                            <div className={cx('btn-icon')} ref={btnRef}>
                                <FontAwesomeIcon icon={faAngleDown} />
                            </div>
                        </button>
                    </div>
                    <div className={cx('category-btn-collapse')} ref={contentRef}>
                        <button className={cx('btn-brand', 'btn', 'active')}>
                            <div className={cx('title-brand')}>Thịt</div>
                        </button>
                        <button className={cx('btn-brand', 'btn')}>
                            <div className={cx('title-brand')}>Trứng</div>
                        </button>
                        <button className={cx('btn-brand', 'btn')}>
                            <div className={cx('title-brand')}>Hải sản</div>
                        </button>
                    </div>
                </div>
                <div className={cx('sidebar-brand')}>
                    <header className={cx('brand-header')}>
                        <span className={cx('sidebar-title')}>Thương hiệu</span>
                        <button className={cx('btn-down')}>
                            <FontAwesomeIcon icon={faAngleDown} />
                        </button>
                    </header>
                    <div className={cx('brand-btn-collapse')}>
                        <button className={cx('btn-brand', 'btn')}>
                            <div className={cx('title-brand')}>MEAT DELI</div>
                        </button>
                    </div>
                </div>
            </div>
            <div className={cx('content')}>
                <header className={cx('content-header')}>
                    <button className={cx('btn-content', 'btn')}>
                        <div className={cx('title-brand')}>Khuyến mãi tốt nhất</div>
                    </button>
                    <button className={cx('btn-content', 'btn')}>
                        <div className={cx('title-brand')}>Bán chạy</div>
                    </button>
                </header>
                <div className={cx('products-list')}>
                    {/* {products.map((product, index) => (
                        <Product product={product} key={index} FourCol />
                    ))} */}
                </div>
            </div>
        </div>
    )
}

export default Categories
