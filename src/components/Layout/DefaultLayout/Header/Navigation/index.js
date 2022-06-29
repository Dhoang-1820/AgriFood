import { faAngleDown, faAngleRight, faBars, faEnvelope, faHeadset, faStore } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react/headless'

import 'tippy.js/animations/scale.css'

import classnames from 'classnames/bind'
import styles from './Navigation.module.scss'

const cx = classnames.bind(styles)

function Navigation() {
    return (
        <nav className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('category')}>
                    <div className={cx('category-menu')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faBars} />
                        <span>Danh mục sản phẩm</span>
                    </div>

                    <div className={cx('dropdown')}>
                        <ul className={cx('menu-list')}>
                            <li className={cx('menu-item')}>
                                <a href='/' className={cx('menu-name')}>
                                    Sản phẩm khuyến mãi
                                </a>
                            </li>
                            <li className={cx('menu-item')}>
                                <a href='/' className={cx('menu-name')}>
                                    Rau - Củ - Trái cây
                                </a>
                                <FontAwesomeIcon className={cx('dropdown-icon')} icon={faAngleRight} />
                                <div className={cx('sub-menu')}>
                                    <ul className={cx('sub-menu__list')}>
                                        <li className={cx('sub-menu__item')}>Rau củ quả</li>
                                        <li className={cx('sub-menu__item')}>Trái cây</li>
                                    </ul>
                                    <div className={cx('sub-menu__image')}>
                                        <img src='https://cdn-crownx.winmart.vn/images/prod/kdol%2030.09.21-04%20(1)_a6e4bbc1-fd87-4c1a-b18f-09d41de0ed4d.png'></img>
                                    </div>
                                </div>
                            </li>
                            <li className={cx('menu-item')}>
                                <a href='/' className={cx('menu-name')}>
                                    Thịt - Trứng - Hải sản
                                </a>
                                <FontAwesomeIcon className={cx('dropdown-icon')} icon={faAngleRight} />
                            </li>
                            <li className={cx('menu-item')}>
                                <a href='/' className={cx('menu-name')}>
                                    Thực phẩm sấy khô
                                </a>
                                <FontAwesomeIcon className={cx('dropdown-icon')} icon={faAngleRight} />
                            </li>
                            <li className={cx('menu-item')}>
                                <a href='/' className={cx('menu-name')}>
                                    Thịt - Trứng - Hải sản
                                </a>
                                <FontAwesomeIcon className={cx('dropdown-icon')} icon={faAngleRight} />
                            </li>
                            <li className={cx('menu-item')}>
                                <a href='/' className={cx('menu-name')}>
                                    Thực phẩm sấy khô
                                </a>
                                <FontAwesomeIcon className={cx('dropdown-icon')} icon={faAngleRight} />
                            </li>
                            <li className={cx('menu-item')}>
                                <a href='/' className={cx('menu-name')}>
                                    Thịt - Trứng - Hải sản
                                </a>
                                <FontAwesomeIcon className={cx('dropdown-icon')} icon={faAngleRight} />
                            </li>
                            <li className={cx('menu-item')}>
                                <a href='/' className={cx('menu-name')}>
                                    Thực phẩm sấy khô
                                </a>
                                <FontAwesomeIcon className={cx('dropdown-icon')} icon={faAngleRight} />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={cx('actions')}>
                    <Tippy
                        offset={[0, 1]}
                        placement='bottom'
                        interactive
                        // visible
                        render={(attrs) => (
                            <div className={cx('watched-list')} tabIndex='-1' {...attrs}>
                                <div className={cx('product')}>
                                    <img
                                        className={cx('product-image')}
                                        src='https://cdn-crownx.winmart.vn/images/prod/162428231608910018478-CHA-Nuoc-giat-LIX-dam-dac-3,8-kg.jpg'
                                    ></img>
                                    <p className={cx('product-name')}>
                                        Nước súc miệng ngừa sâu răng vị Trà xanh Listerine Natural Green Tea 500ml
                                    </p>
                                </div>
                                <div className={cx('product')}>
                                    <img
                                        className={cx('product-image')}
                                        src='https://cdn-crownx.winmart.vn/images/prod/162428231608910018478-CHA-Nuoc-giat-LIX-dam-dac-3,8-kg.jpg'
                                    ></img>
                                    <p className={cx('product-name')}>
                                        Nước súc miệng ngừa sâu răng vị Trà xanh Listerine Natural Green Tea 500ml
                                    </p>
                                </div>
                                <div className={cx('product')}>
                                    <img
                                        className={cx('product-image')}
                                        src='https://cdn-crownx.winmart.vn/images/prod/162428231608910018478-CHA-Nuoc-giat-LIX-dam-dac-3,8-kg.jpg'
                                    ></img>
                                    <p className={cx('product-name')}>
                                        Nước súc miệng ngừa sâu răng vị Trà xanh Listerine Natural Green Tea 500ml
                                    </p>
                                </div>
                                <div className={cx('product')}>
                                    <img
                                        className={cx('product-image')}
                                        src='https://cdn-crownx.winmart.vn/images/prod/162428231608910018478-CHA-Nuoc-giat-LIX-dam-dac-3,8-kg.jpg'
                                    ></img>
                                    <p className={cx('product-name')}>
                                        Nước súc miệng ngừa sâu răng vị Trà xanh Listerine Natural Green Tea 500ml
                                    </p>
                                </div>
                                <div className={cx('product')}>
                                    <img
                                        className={cx('product-image')}
                                        src='https://cdn-crownx.winmart.vn/images/prod/162428231608910018478-CHA-Nuoc-giat-LIX-dam-dac-3,8-kg.jpg'
                                    ></img>
                                    <p className={cx('product-name')}>
                                        Nước súc miệng ngừa sâu răng vị Trà xanh Listerine Natural Green Tea 500ml
                                    </p>
                                </div>
                                <div className={cx('product')}>
                                    <img
                                        className={cx('product-image')}
                                        src='https://cdn-crownx.winmart.vn/images/prod/162428231608910018478-CHA-Nuoc-giat-LIX-dam-dac-3,8-kg.jpg'
                                    ></img>
                                    <p className={cx('product-name')}>
                                        Nước súc miệng ngừa sâu răng vị Trà xanh Listerine Natural Green Tea 500ml
                                    </p>
                                </div>
                            </div>
                        )}
                    >
                        <div className={cx('action-details')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faAngleDown} />
                            <span>Sản phẩm đã xem</span>
                        </div>
                    </Tippy>

                    <div className={cx('action-details', 'sells')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faStore} />
                        <span>Nhượng quyền cửa hàng</span>
                    </div>

                    <div className={cx('action-details')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faEnvelope} />
                        <span>Tin tức cửa hàng</span>
                    </div>

                    <div className={cx('action-details')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faHeadset} />
                        <span>Tư vấn mua hàng</span>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
