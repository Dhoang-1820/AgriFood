import { faAngleDown, faAngleRight, faHeadset, faStore } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BarIcon, EnvelopIcon } from '~/components/Icons'
import { useState } from 'react'
import Tippy from '@tippyjs/react/headless'
import 'tippy.js/animations/scale.css'

import Modal from '~/commonServices/Modal'
import classnames from 'classnames/bind'
import styles from './Navigation.module.scss'
import { Link } from 'react-router-dom'

const cx = classnames.bind(styles)

function Navigation() {
    const [isShowing, setIsShowing] = useState(false)

    const handleHover = () => {
        setIsShowing(true)
    }

    const handleMouseOut = () => {
        setIsShowing(false)
    }
    return (
        <nav className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('category')} onMouseEnter={handleHover}>
                    <div className={cx('btn-category')}>
                        <BarIcon className={cx('icon')} />
                        <span>Danh mục sản phẩm</span>
                    </div>
                    <div className={cx('dropdown', isShowing && 'active')} tabIndex={-1} onMouseLeave={handleMouseOut}>
                        <div className={cx('btn-category')}>
                            <BarIcon className={cx('icon')} />
                            <span>Danh mục sản phẩm</span>
                        </div>
                        <ul className={cx('menu-list', 'scrollbar-custom')}>
                            <Link to='/categories' className={cx('menu-item')} onClick={handleMouseOut}>
                                <div className={cx('menu-name')}>Sản phẩm khuyến mãi</div>
                            </Link>
                            <li>
                                <Tippy
                                    offset={[0, 0]}
                                    placement='right-start'
                                    interactive
                                    // visible
                                    render={(attrs) => (
                                        <div className={cx('sub-menu', 'scrollbar-custom')} tabIndex='-1' {...attrs}>
                                            <ul className={cx('sub-menu__list')}>
                                                <li className={cx('sub-menu__item')}>Rau củ quả</li>
                                                <li className={cx('sub-menu__item')}>Trái cây</li>
                                            </ul>
                                            <div className={cx('sub-menu__image')}>
                                                <img
                                                    src='https://cdn-crownx.winmart.vn/images/prod/kdol%2030.09.21-04%20(1)_a6e4bbc1-fd87-4c1a-b18f-09d41de0ed4d.png'
                                                    alt='img'
                                                ></img>
                                            </div>
                                        </div>
                                    )}
                                >
                                    <Link to='/categories' className={cx('menu-item')} onClick={handleMouseOut}>
                                        <div className={cx('menu-name')}>Rau - Củ - Trái cây</div>
                                        <FontAwesomeIcon className={cx('dropdown-icon')} icon={faAngleRight} />
                                    </Link>
                                </Tippy>
                            </li>
                            <li>
                                <Tippy
                                    offset={[0, 0]}
                                    placement='right-start'
                                    interactive
                                    // visible
                                    render={(attrs) => (
                                        <div className={cx('sub-menu', 'scrollbar-custom')} tabIndex='-1' {...attrs}>
                                            <ul className={cx('sub-menu__list')}>
                                                <li className={cx('sub-menu__item')}>Rau củ quả</li>
                                                <li className={cx('sub-menu__item')}>Trái cây</li>
                                            </ul>
                                            <div className={cx('sub-menu__image')}>
                                                <img
                                                    src='https://cdn-crownx.winmart.vn/images/prod/kdol%2030.09.21-04%20(1)_a6e4bbc1-fd87-4c1a-b18f-09d41de0ed4d.png'
                                                    alt='img'
                                                ></img>
                                            </div>
                                        </div>
                                    )}
                                >
                                    <Link to='/categories' className={cx('menu-item')} onClick={handleMouseOut}>
                                        <div className={cx('menu-name')}>Thịt - Trứng - Hải sản</div>
                                        <FontAwesomeIcon className={cx('dropdown-icon')} icon={faAngleRight} />
                                    </Link>
                                </Tippy>
                            </li>
                        </ul>
                    </div>

                    {isShowing && (
                        <Modal>
                            <div id={cx('portal')}></div>
                        </Modal>
                    )}
                </div>
                <div className={cx('actions')}>
                    {/* Using a wrapper <div> tag around the reference element
                     solves this by creating a new parentNode context.  */}
                    <div>
                        <Tippy
                            offset={[0, 13]}
                            placement='bottom'
                            interactive
                            render={(attrs) => (
                                <div className={cx('watched-list')} tabIndex='-1' {...attrs}>
                                    <div className={cx('product')}>
                                        <img
                                            className={cx('product-image')}
                                            alt='ima'
                                            src='https://cdn-crownx.winmart.vn/images/prod/162428231608910018478-CHA-Nuoc-giat-LIX-dam-dac-3,8-kg.jpg'
                                        ></img>
                                        <p className={cx('product-name')}>
                                            Nước súc miệng ngừa sâu răng vị Trà xanh Listerine Natural Green Tea 500ml
                                        </p>
                                    </div>
                                    <div className={cx('product')}>
                                        <img
                                            className={cx('product-image')}
                                            alt='ima'
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
                    </div>

                    <div className={cx('action-details', 'sells')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faStore} />
                        <span>Nhượng quyền cửa hàng</span>
                    </div>

                    <div className={cx('action-details')}>
                        <EnvelopIcon className={cx('icon')} />
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
