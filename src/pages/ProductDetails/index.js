import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CartIcon, MinusIcon, PlusIcon } from '~/components/Icons'
import styles from './ProductDetails.module.scss'
const cx = classNames.bind(styles)

function ProductDetails() {
    const [details, setDetails] = useState([])
    const param = useParams()

    const API = `http://localhost:3000/productDetails?code=${param.id}`

    useEffect(() => {
        fetch(API)
            .then((response) => response.json())
            .then((productDetail) => setDetails(...productDetail))
    }, [])
    return (
        <div className={cx('wrapper')}>
            <div className={cx('product')}>
                <div className={cx('product-image')}>
                    <img src={details.image}></img>
                    <div className={cx('list-image')}></div>
                </div>
                <div className={cx('product-details')}>
                    <h3 className={cx('product-name')}>{details.name}</h3>
                    <p>Hãy là người đầu tiên đánh giá sản phẩm này!</p>
                    <div className={cx('product-code')}>SKU: 1054870</div>
                    <div className={cx('product-price-wrapper')}>
                        <div className={cx('product-price')}>
                            <div className={cx('title')}>Giá bán lẻ</div>
                            <div className={cx('price')}>69.480đ</div>
                        </div>
                        <div className={cx('product-status')}>
                            <span className={cx('title')}>Tình trạng</span>
                            <span className={cx('status')}>Còn hàng</span>
                        </div>
                    </div>
                    <div className={cx('product-shipping')}>
                        <div className={cx('title')}>Vận chuyển</div>
                        <div className={cx('shipping-description')}>
                            Giao nhanh trong vòng 2-4 tiếng khi đơn hàng được xác nhận. Các đơn hàng đặt sau 18:00 sẽ
                            được giao trước 12:00 sáng ngày hôm sau. Liên hệ hỗ trợ: 024 71066866
                        </div>
                    </div>
                    <div className={cx('product-type')}>
                        <div className={cx('title')}>Chọn loại</div>
                        <div className={cx('button-list')}>
                            {details.types &&
                                details.types.map((type, index) => (
                                    <button className={cx('btn-type')} key={index}>
                                        {type}
                                    </button>
                                ))}
                        </div>
                    </div>
                    <div className={cx('quantity')}>
                        <div className={cx('title')}>Số lượng</div>
                        <button className={cx('btn-minus')}>
                            <MinusIcon />
                        </button>
                        <input
                            type='text'
                            className={cx('input-text')}
                            defaultValue={1}
                            maxLength={2}
                            max={99}
                            min={1}
                        />
                        <button className={cx('btn-plus')}>
                            <PlusIcon />
                        </button>
                    </div>
                    <div className={cx('btn-wrapper')}>
                        <button className={cx('btn-buy', 'active')}>
                            <div>MUA NGAY</div>
                        </button>
                        <button className={cx('btn-addCart')}>
                            <CartIcon width='25px' height='24px' className={cx('btn-add')} />
                            <div>THÊM VÀO GIỎ</div>
                        </button>
                    </div>
                </div>
            </div>
            <div className={cx('product-information')}>
                <div className={cx('product-description')}></div>
                <div className={cx('product-about')}>
                    <div className={cx('product-brand')}>
                        <p>Xuất Xứ</p>
                        <p>Vietnam</p>
                    </div>
                    <div className={cx('product-brand')}>
                        <p>Thành phần</p>
                        <p>Đang cập nhật</p>
                    </div>
                    <div className={cx('product-brand')}>
                        <p>Bảo quản</p>
                        <p>Đang cập nhật</p>
                    </div>
                    <div className={cx('product-brand')}>
                        <p>Hướng dẫn sử dụng</p>
                        <p>Đang cập nhật</p>
                    </div>
                    <div className={cx('product-brand')}>
                        <p>Khối lượng</p>
                        <p>1.2Kg</p>
                    </div>
                </div>
            </div>
            <div className={cx('product-rating')}>
                <div className={cx('product-comments')}></div>
                <form className={cx('product-userRating')}>
                    <input />
                    <input />
                    <input />
                    <input />
                    <input />
                    <input />
                </form>
                <button className={cx('btn-rating')} />
            </div>
            <div className={cx('relation-products')}></div>
        </div>
    )
}

export default ProductDetails
