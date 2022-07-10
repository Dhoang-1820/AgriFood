import classNames from 'classnames/bind'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'
import { Autocomplete } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import User from '../User'
import styles from './TransactionHistory.module.scss'
const cx = classNames.bind(styles)

function TransactionHistory() {
    const [date, setDate] = useState(new Date())

    return (
        <User>
            <div className={cx('wrapper')}>
                <div className={cx('note')}>
                    <div>Bạn chưa có ví tích điểm. Vui lòng mua hàng để được tích điểm.</div>
                </div>
                <div className={cx('header')}>
                    <span className={cx('title')}>Danh sách địa chỉ</span>
                    <div className={cx('picker')}>
                        <div className={cx('wallet-picker')}>
                            <span className={cx('picker-title')}>Chọn ngăn ví</span>
                            <Autocomplete
                                id='country'
                                size='small'
                                className={cx('wallet-input')}
                                // options={countries}

                                autoHighlight
                                sx={{
                                    '& .MuiInputLabel-root, .MuiOutlinedInput-root  ': {
                                        fontSize: '1.3rem',
                                    },
                                    '& .MuiAutocomplete-root': { width: '100%' },
                                }}
                                getOptionLabel={(option) => option.label}
                                renderOption={(props, option) => (
                                    <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                        {option.label} ({option.code}) +{option.phone}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label='Tất cả'
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className={cx('month-picker')}>
                            <span className={cx('picker-title')}>Chọn tháng</span>
                            <DatePicker
                                popperPlacement='bottom-start'
                                className={cx('month-input')}
                                dateFormat='MM/yyyy'
                                showMonthYearPicker
                                selected={date}
                                onChange={(selected) => setDate(selected)}
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('content-header')}>
                        <div className={cx('header-collumn')}>Đơn hàng</div>
                        <div className={cx('header-collumn')}>Đối tác</div>
                        <div className={cx('header-collumn')}>Ví</div>
                        <div className={cx('header-collumn')}>Ngăn ví</div>
                        <div className={cx('header-collumn')}>Thời gian</div>
                        <div className={cx('header-collumn')}>Số điểm</div>
                        <div className={cx('header-collumn')}>Nội dung</div>
                    </div>
                    <div className={cx('content-body')}>
                        <img
                            src='https://winmart.vn/_next/static/images/no-product-c2f7be08e62593a82bc819708625486b.png'
                            alt='no-orders-img'
                        ></img>
                        <span className={cx('not-fount-text')}>Không tìm thấy kết quả</span>
                    </div>
                </div>
            </div>
        </User>
    )
}

export default TransactionHistory
