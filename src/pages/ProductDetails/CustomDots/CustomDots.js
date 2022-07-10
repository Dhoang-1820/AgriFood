import classNames from 'classnames/bind'
import styles from './CustomDots.module.scss'
const cx = classNames.bind(styles)

function CustomDots({ onMove, index, onClick, active }) {
    return (
        <li className={active ? 'active' : 'inactive'} onClick={() => onClick()}>
            <img
                className={cx('image-dots')}
                src='https://cdn-crownx.winmart.vn/images/prod/162428535691210054870-KG-Choo-sua-Burine-Grie%CE%B2brei-Vanille-d%C3%A0nh-cho-tre-tu-6-thong-tuoi-(Vi-6-hu-x-50g).jpg'
                alt='dot'
            />
        </li>
    )
}

export default CustomDots
