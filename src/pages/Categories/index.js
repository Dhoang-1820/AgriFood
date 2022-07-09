import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState } from 'react'

import classNames from 'classnames/bind'
import Product from '../components/Product'
import styles from './Categories.module.scss'

const cx = classNames.bind(styles)

function Categories() {
    const products = [
        {
            name: 'Bưởi hồng da xanh túi lưới',
            code: '10054870',
            image: 'https://cdn-crownx.winmart.vn/images/prod/162428535691210054870-KG-Choo-sua-Burine-Grie%CE%B2brei-Vanille-d%C3%A0nh-cho-tre-tu-6-thong-tuoi-(Vi-6-hu-x-50g).jpg',
            unit: '1.2Kg',
            price: 69480,
        },
        {
            name: 'Dưa lưới sạch Đế Vương King size ruột xanh',
            code: '10054871',
            image: 'https://cdn-crownx.winmart.vn/images/prod/162428467254410242405-QUA-Dua-xiom-got.jpg',
            unit: 'Quả',
            price: 89000,
        },
        {
            name: 'Bắp cải trắng',
            code: '10054872',
            image: 'https://cdn-crownx.winmart.vn/images/prod/162428572368810054020-KG-Bap-non-200g.jpg',
            unit: '0.6Kg',
            price: 14340,
        },
        {
            name: 'Mướp hương',
            code: '10054873',
            image: 'https://cdn-crownx.winmart.vn/images/prod/162428172466110053905-KG-Bu-Beef-steak-MVP-500gr.jpg',
            unit: '0.5Kg',
            price: 18500,
        },
        {
            name: 'Mướp hương',
            code: '10054873',
            image: 'https://cdn-crownx.winmart.vn/images/prod/162428172466110053905-KG-Bu-Beef-steak-MVP-500gr.jpg',
            unit: '0.5Kg',
            price: 18500,
        },
        {
            name: 'Mướp hương',
            code: '10054873',
            image: 'https://cdn-crownx.winmart.vn/images/prod/162428172466110053905-KG-Bu-Beef-steak-MVP-500gr.jpg',
            unit: '0.5Kg',
            price: 18500,
        },
        {
            name: 'Mướp hương',
            code: '10054873',
            image: 'https://cdn-crownx.winmart.vn/images/prod/162428172466110053905-KG-Bu-Beef-steak-MVP-500gr.jpg',
            unit: '0.5Kg',
            price: 18500,
        },
        {
            name: 'Mướp hương',
            code: '10054873',
            image: 'https://cdn-crownx.winmart.vn/images/prod/162428172466110053905-KG-Bu-Beef-steak-MVP-500gr.jpg',
            unit: '0.5Kg',
            price: 18500,
        },
        {
            name: 'Mướp hương',
            code: '10054873',
            image: 'https://cdn-crownx.winmart.vn/images/prod/162428172466110053905-KG-Bu-Beef-steak-MVP-500gr.jpg',
            unit: '0.5Kg',
            price: 18500,
        },
        {
            name: 'Mướp hương',
            code: '10054873',
            image: 'https://cdn-crownx.winmart.vn/images/prod/162428172466110053905-KG-Bu-Beef-steak-MVP-500gr.jpg',
            unit: '0.5Kg',
            price: 18500,
        },
    ]

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
                    {products.map((product, index) => (
                        <Product product={product} key={index} FourCol />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Categories
