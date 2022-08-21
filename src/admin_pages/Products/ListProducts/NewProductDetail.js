import InputAdornment from '@mui/material/InputAdornment'
import { TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import Validator from '~/common_services/Validator'
import Toast from '~/components/Toast'
import SaveIcon from '@mui/icons-material/Save'

import styles from '~/admin_pages/components/CommonStyles/ListItem.module.scss'
import classNames from 'classnames/bind'
import { postProductDetail } from '~/api_services/productDetailServices'
const cx = classNames.bind(styles)

function NewProductDetail({ productId, Save }) {
    const [errorMessage, setErrorMessage] = useState({})
    const [errorToast, setErrorToast] = useState(false)
    const [successToast, setSuccessToast] = useState(false)

    const [typeName, setTypeName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')

    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setSuccessToast(false)
        setErrorToast(false)
    }

    const fieldTypes = {
        typeName,
        quantity: quantity.toString(),
        price: price.toString(),
    }

    const ruleTypes = [
        {
            field: 'typeName',
            method: 'isEmpty',
            validWhen: false,
            message: 'Vui lòng điền trường này',
        },
        {
            field: 'quantity',
            method: 'isEmpty',
            validWhen: false,
            message: 'Vui lòng điền trường này',
        },
        {
            field: 'price',
            method: 'isEmpty',
            validWhen: false,
            message: 'Vui lòng điền trường này',
        },
    ]

    const handleValidate = (options = ruleTypes, content = fieldTypes) => {
        const result = Validator(options, content)
        setErrorMessage((prev) => ({ ...prev, ...result }))
        for (const key in result) {
            if (result[key]) return false
        }
        return true
    }
    // validattion
    const validations = (value, field, rule) => {
        fieldTypes[field] = value
        handleValidate([rule], fieldTypes[field])
    }
    // Type validation
    const handleBlurType = (e) => {
        validations(e.target.value, typeName, ruleTypes[0])
    }

    const handleInputType = (e) => {
        setTypeName(e.target.value)
        validations(e.target.value, typeName, ruleTypes[0])
    }
    // Quantity validation
    const handleBlurQuantity = (e) => {
        validations(e.target.value, quantity, ruleTypes[1])
    }

    const handleInputQuantity = (e) => {
        setQuantity(e.target.value)
        validations(e.target.value, quantity, ruleTypes[1])
    }
    // Price validation
    const handleBlurPrice = (e) => {
        validations(e.target.value, price.toString(), ruleTypes[2])
    }

    const handleInputPrice = (e) => {
        setPrice(e.target.value)
        validations(e.target.value, price.toString(), ruleTypes[2])
    }

    const getData = () => {
        return { productId, quantity, type: typeName, price }
    }

    const handleSuccess = () => {
        setTypeName('')
        setPrice('')
        setQuantity('')
    }

    const handleSave = () => {
        const isError = handleValidate()
        const data = getData()
        const fechAPI = async () => {
            await postProductDetail(data).then((value) => {
                if (value.status === 'ok') {
                    setSuccessToast(true)
                    handleSuccess()
                    Save()
                } else {
                    return
                }
            })
        }
        if (isError) {
            fechAPI()
        } else {
            setErrorToast(true)
        }
    }
    return (
        <>
            <div className={cx('list-types', 'add-type')}>
                <div className={cx('input-item')}>
                    <label htmlFor='type' className={cx('item-label')}>
                        Loại
                        <span className={cx('red-text')}>*</span>
                    </label>
                    <TextField
                        rows={3}
                        size='small'
                        fullWidth
                        id='type'
                        label=' Loại'
                        value={typeName}
                        error={Boolean(errorMessage.typeName)}
                        helperText={errorMessage.typeName}
                        onChange={handleInputType}
                        onBlur={handleBlurType}
                    />
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor='quantity' className={cx('item-label')}>
                        Số lượng
                        <span className={cx('red-text')}>*</span>
                    </label>
                    <TextField
                        InputProps={{
                            type: 'number',
                        }}
                        rows={3}
                        size='small'
                        fullWidth
                        id='quantity'
                        label='Số lượng'
                        value={quantity}
                        error={Boolean(errorMessage.quantity)}
                        helperText={errorMessage.quantity}
                        onChange={handleInputQuantity}
                        onBlur={handleBlurQuantity}
                    />
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor='price' className={cx('item-label')}>
                        Giá
                        <span className={cx('red-text')}>*</span>
                    </label>
                    <TextField
                        InputProps={{
                            type: 'number',
                            startAdornment: <InputAdornment position='start'>VNĐ</InputAdornment>,
                        }}
                        rows={3}
                        size='small'
                        fullWidth
                        id='price'
                        label='Giá'
                        value={price}
                        error={Boolean(errorMessage.price)}
                        helperText={errorMessage.price}
                        onChange={handleInputPrice}
                        onBlur={handleBlurPrice}
                    />
                </div>
            </div>
            <div className={cx('btn-items-wrapper')}>
                <SaveIcon fontSize='large' className={cx('btn-item')} onClick={handleSave} />
            </div>
            <Toast
                success={successToast}
                fail={errorToast}
                handleClose={handleCloseToast}
                textSuccess='Lưu thành công!'
                textFailure='Lưu thất bại!'
            />
        </>
    )
}

export default NewProductDetail
