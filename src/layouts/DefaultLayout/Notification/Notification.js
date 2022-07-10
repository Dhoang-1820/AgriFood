import classnames from 'classnames/bind'
import { BellIcon, ArrowUpIcon } from '~/components/Icons'
import styles from './Notification.module.scss'
import { useState } from 'react'

import Popover from '@mui/material/Popover'

const cx = classnames.bind(styles)

function Notification() {
    const [anchorEl, setAnchorEl] = useState(null)
    const [visible, setVisible] = useState(false)
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop || window.scrollY
        if (scrolled > 800) {
            setVisible(true)
        } else if (scrolled <= 800) {
            setVisible(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    window.addEventListener('scroll', toggleVisible)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('notifi-btn')} aria-describedby={id} variant='contained' onClick={handleClick}>
                <div className={cx('notifi-icon')}>
                    <BellIcon />
                </div>
            </div>
            <div className={cx('back-top-btn', visible && 'active')} onClick={scrollToTop}>
                <div className={cx('back-top-icon')}>
                    <ArrowUpIcon />
                </div>
            </div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <div className={cx('popover-container')}>
                    <div className={cx('popover-header')}>
                        <div className={cx('title')}>Thông báo mới</div>
                    </div>
                    <div className={cx('popover-content')}>
                        <img
                            src='https://winmart.vn/_next/static/images/no-product-c2f7be08e62593a82bc819708625486b.png'
                            alt='no-orders-img'
                        ></img>
                        <span className={cx('not-fount-text')}>Không có thông báo</span>
                    </div>
                </div>
            </Popover>
        </div>
    )
}

export default Notification
