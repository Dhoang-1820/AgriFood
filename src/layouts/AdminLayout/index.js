import Sidebar from './Sidebar'
import Header from './Header'

import classNames from 'classnames/bind'
import styles from './AdminLayout.module.scss'
const cx = classNames.bind(styles)

function AdminLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <div className={cx('content')}>
                <Header />
                {children}
            </div>
        </div>
    )
}

export default AdminLayout
