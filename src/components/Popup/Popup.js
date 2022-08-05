import Button from '~/components/Button'
import { WarningIconOuLine } from '~/components/Icons'

import classNames from 'classnames/bind'
import styles from './Popup.module.scss'
const cx = classNames.bind(styles)

function Popup({ title, content, handleConfirm, handleCancel }) {
    return (
        <div>
            <div className={cx('dialog-icon')}>
                <WarningIconOuLine />
            </div>
            <div className={cx('dialog-title')}>{title}</div>
            <div className={cx('dialog-content')}>Cảnh báo: {content}</div>
            <div className={cx('dialog-btn-group')}>
                <Button primary onClick={handleConfirm}>
                    Xác nhận
                </Button>
                <Button disable onClick={handleCancel}>
                    Huỷ
                </Button>
            </div>
        </div>
    )
}

export default Popup
