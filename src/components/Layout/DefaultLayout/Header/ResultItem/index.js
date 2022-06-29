import classnames from 'classnames/bind';
import styles from './ResultItem.module.scss';

const cx = classnames.bind(styles)
function ResultItem() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('product-img')}>
                <img className={cx('img')} src='https://cdn-crownx.winmart.vn/images/prod/162428575388510314442-CAI-Bonh-mo-tuoi-Otto-nhon-socola-55g.jpg' alt='product image'></img>
            </div>
            <div className={cx('description')}>
                <p className={cx('title')}>Nước súc miệng ngừa sâu răng vị Trà xanh Listerine Natural Green Tea chai 750ml </p>
                <p className={cx('price')}>9.500đ</p>
            </div>
        </div>    
    );
}

export default ResultItem;