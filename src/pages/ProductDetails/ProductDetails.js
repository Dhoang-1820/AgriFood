/* eslint-disable jsx-a11y/alt-text */
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CartIcon, MinusIcon, PlusIcon } from '~/components/Icons'
import Carousel from 'react-multi-carousel'
import CustomDots from './CustomDots/CustomDots'

import * as productServices from '~/api_services/productServices'

import classNames from 'classnames/bind'
import Button from '~/components/Button'
import styles from './ProductDetails.module.scss'
const cx = classNames.bind(styles)

function ProductDetails() {
    const [details, setDetails] = useState([])
    const [inputValue, setInputValue] = useState(1)
    const [tab, setTab] = useState('')

    const param = useParams()

    useEffect(() => {
        const fechAPI = async () => {
            const result = await productServices.getProductDetails(param.id)
            const product = result[0]
            setTab(product.types[0])
            setDetails(...result)
        }
        fechAPI()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleMinus = () => {
        inputValue >= 2 && setInputValue((prev) => prev - 1)
    }

    const handlePlus = () => {
        setInputValue((prev) => prev + 1)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('product')}>
                <div className={cx('product-image')}>
                    <Carousel
                        className={cx('custom-dot')}
                        customDot={<CustomDots />}
                        // draggable
                        // focusOnSelect={false}
                        infinite
                        responsive={{
                            desktop: {
                                breakpoint: {
                                    max: 3000,
                                    min: 1024,
                                },
                                items: 1,
                            },
                            mobile: {
                                breakpoint: {
                                    max: 464,
                                    min: 0,
                                },
                                items: 1,
                            },
                            tablet: {
                                breakpoint: {
                                    max: 1024,
                                    min: 464,
                                },
                                items: 1,
                            },
                        }}
                        rewind={false}
                        rewindWithAnimation={false}
                        rtl={false}
                        showDots
                        slidesToSlide={1}
                        swipeable
                    >
                        <img
                            src={details.image}
                            alt={details.title}
                            style={{
                                display: 'block',
                                height: '100%',
                                margin: 'auto',
                                width: '100%',
                            }}
                        />
                    </Carousel>
                </div>

                <div className={cx('product-details')}>
                    <h3 className={cx('product-name')}>{details.title}</h3>
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
                                    <button
                                        className={cx('btn-type', type === tab && 'active')}
                                        key={index}
                                        onClick={() => setTab(type)}
                                    >
                                        {type}
                                    </button>
                                ))}
                        </div>
                    </div>
                    <div className={cx('quantity')}>
                        <div className={cx('title')}>Số lượng</div>
                        <button className={cx('btn-minus')} onClick={handleMinus}>
                            <MinusIcon />
                        </button>
                        <input
                            value={inputValue}
                            onChange={(e) => setInputValue(parseInt(e.target.value))}
                            type='text'
                            className={cx('input-text')}
                            maxLength={2}
                            max={99}
                            min={1}
                            readOnly
                        />
                        <button className={cx('btn-plus')} onClick={handlePlus}>
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
            <div className={cx('product-more_details')}>
                <div className={cx('product-description')}>
                    <div className={cx('title')}>Mô tả</div>
                </div>
                <div className={cx('product-information')}>
                    <div className={cx('title')}>Thông tin</div>
                    <div className={cx('product-about')}>
                        <div className={cx('product-brand')}>
                            <p>Xuất Xứ</p>
                            <p className={cx('col-2')}>Vietnam</p>
                        </div>
                        <div className={cx('product-brand')}>
                            <p>Thành phần</p>
                            <p className={cx('col-2')}>Đang cập nhật</p>
                        </div>
                        <div className={cx('product-brand')}>
                            <p>Bảo quản</p>
                            <p className={cx('col-2')}>Đang cập nhật</p>
                        </div>
                        <div className={cx('product-brand')}>
                            <p>Hướng dẫn sử dụng</p>
                            <p className={cx('col-2')}>Đang cập nhật</p>
                        </div>
                        <div className={cx('product-brand')}>
                            <p>Khối lượng</p>
                            <p className={cx('col-2')}>1.2Kg</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('product-rating')}>
                <div className={cx('title')}>Đánh giá sản phẩm</div>
                <div className={cx('product-comments')}>
                    <div className={cx('comments-list')}>
                        <div className={cx('comments-item')}>
                            <div className={cx('comments-user')}>
                                <div className={cx('username')}>143 ga C</div>
                                <span className={cx('isBought')}>(Chưa mua hàng)</span>
                            </div>
                            <div>
                                <Stack spacing={1}>
                                    <Rating name='half-rating' readOnly defaultValue={1} precision={0.5} />
                                </Stack>
                            </div>
                            <div className={cx('content')}>Giao vào buổi trưa tấm 11h 30 hoặc sau 16h30 chiều.</div>
                            <div className={cx('created-by')}>
                                Đánh giá bởi <strong>Hồng</strong> ngày <strong>11-04-2022</strong>
                            </div>
                        </div>
                        <div className={cx('comments-item')}>
                            <div className={cx('comments-user')}>
                                <div className={cx('username')}>143 ga C</div>
                                <span className={cx('isBought')}>(Chưa mua hàng)</span>
                            </div>
                            <div>
                                <Stack spacing={1}>
                                    <Rating name='half-rating' readOnly defaultValue={2} precision={0.5} />
                                </Stack>
                            </div>
                            <div className={cx('content')}>Giao vào buổi trưa tấm 11h 30 hoặc sau 16h30 chiều.</div>
                            <div className={cx('created-by')}>
                                Đánh giá bởi <strong>Hồng</strong> ngày <strong>11-04-2022</strong>
                            </div>
                        </div>
                        <div className={cx('comments-item')}>
                            <div className={cx('comments-user')}>
                                <div className={cx('username')}>143 ga C</div>
                                <span className={cx('isBought')}>(Chưa mua hàng)</span>
                            </div>

                            <div className={cx('content')}>Giao vào buổi trưa tấm 11h 30 hoặc sau 16h30 chiều.</div>
                            <div className={cx('created-by')}>
                                Đánh giá bởi <strong>Hồng</strong> ngày <strong>11-04-2022</strong>
                            </div>
                        </div>
                    </div>
                </div>
                <Box
                    component='form'
                    sx={{
                        '& .MuiInputLabel-root': { fontSize: '1.4rem' },
                        '& .MuiOutlinedInput-root': { fontSize: '1.4rem' },
                        '& .MuiAutocomplete-root': { width: '100%' },
                        '& .MuiAutocomplete-option': { fontSize: '1.4rem' },
                        '& .MuiFormHelperText-root': { fontSize: '1.2rem' },
                        '& .MuiRating-root': { fontSize: '2.2rem' },
                    }}
                    noValidate
                    autoComplete='on'
                >
                    <div className={cx('product-userRating')}>
                        <div className={cx('rating-item')}>
                            <label htmlFor='rating' className={cx('rating-label', 'start')}>
                                Đánh giá
                                <span className={cx('red-text')}>*</span>
                            </label>
                            <div>
                                <Stack spacing={1}>
                                    <Rating
                                        name='half-rating'
                                        defaultValue={5}
                                        precision={0.5}
                                        size='large'
                                        id='rating'
                                    />
                                </Stack>
                            </div>
                        </div>
                        <div className={cx('rating-item')}>
                            <label htmlFor='fullName' className={cx('rating-label')}>
                                Khách hàng
                                <span className={cx('red-text')}>*</span>
                            </label>
                            <TextField
                                size='small'
                                fullWidth
                                id='fullName'
                                label='Khách hàng'
                                // error
                                // helperText='Thông tin bắt buộc'
                            />
                        </div>
                        <div className={cx('rating-item')}>
                            <label htmlFor='email' className={cx('rating-label')}>
                                Email
                                <span className={cx('red-text')}>*</span>
                            </label>
                            <TextField size='small' fullWidth id='email' label='Email' />
                        </div>
                        <div className={cx('rating-item')}>
                            <label htmlFor='phone' className={cx('rating-label')}>
                                Điện thoại
                                <span className={cx('red-text')}>*</span>
                            </label>
                            <TextField
                                size='small'
                                fullWidth
                                id='phone'
                                label='Điện thoại'
                                // error
                                //  helperText='Thông tin bắt buộc'
                            />
                        </div>
                        <div className={cx('rating-item')}>
                            <label htmlFor='title' className={cx('rating-label')}>
                                Tiêu đề
                                <span className={cx('red-text')}>*</span>
                            </label>
                            <TextField
                                size='small'
                                fullWidth
                                id='title'
                                label='Tiêu đề'
                                // error
                                //  helperText='Thông tin bắt buộc'
                            />
                        </div>
                        <div className={cx('rating-item')}>
                            <label htmlFor='note' className={cx('rating-label')}>
                                Nội dung
                            </label>
                            <TextField
                                rows={3}
                                multiline
                                size='small'
                                fullWidth
                                id='note'
                                label='Nội dung '
                                // error
                                // helperText='Thông tin bắt buộc'
                            />
                        </div>
                        <div className={cx('btn-rating')}>
                            <Button primary onClick={(e) => e.preventDefault()}>
                                Đánh giá
                            </Button>
                        </div>
                    </div>
                </Box>
            </div>
            <div className={cx('relation-products')}>
                <div className={cx('title')}>Sản phẩm liên quan</div>
            </div>
        </div>
    )
}

export default ProductDetails
