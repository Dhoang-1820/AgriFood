import classnames from 'classnames/bind'
import styles from './ResultItem.module.scss'

const cx = classnames.bind(styles)
function ResultItem({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('product-img')}>
                <img className={cx('img')} src={data.avatar} alt={data.avatar}></img>
            </div>
            <div className={cx('description')}>
                <p className={cx('title')}>{data.full_name}</p>
                <p className={cx('price')}>9.500đ</p>
            </div>
        </div>
    )
}

export default ResultItem
