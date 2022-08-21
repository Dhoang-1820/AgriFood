/* eslint-disable eqeqeq */
import { TextField } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DeleteIcon from '@mui/icons-material/Delete'

import InputAdornment from '@mui/material/InputAdornment'
import Validator from '~/common_services/Validator'
import Popup from '~/components/Popup/Popup'
import Toast from '~/components/Toast'

import styles from '~/admin_pages/components/CommonStyles/ListItem.module.scss'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { deleteProductDetail, putProductDetail } from '~/api_services/productDetailServices'
const cx = classNames.bind(styles)

function ProductDetailItem({ type, productId, Save }) {
    const [errorMessage, setErrorMessage] = useState({})
    const [openDialog, setOpenDialog] = useState(false)
    const [successToast, setSuccessToast] = useState(false)
    const [errorToast, setErrorToast] = useState(false)

    const [typeName, setTypeName] = useState(type.type)
    const [quantity, setQuantity] = useState(type.quantity)
    const [price, setPrice] = useState(type.price)

    useEffect(() => {
        setTypeName(type.type)
        setQuantity(type.quantity)
        setPrice(type.price)
    }, [type.type, type.quantity, type.price])

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

    const isChanged = function () {
        return typeName.trim() !== type.type || quantity != type.quantity || price != type.price
    }

    const getData = () => {
        return { id: type.id, type: typeName, productId, quantity, price }
    }

    const handleSave = () => {
        const isError = handleValidate()
        const data = getData()
        const fechAPI = async () => {
            await putProductDetail(data).then((value) => {
                if (value.status === 'ok') {
                    setSuccessToast(true)
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

    const handleClose = () => {
        setOpenDialog(false)
    }

    const handleClickDeleteBtn = () => {
        setOpenDialog(true)
    }

    const handleConfirm = (id) => {
        const fechAPI = async () => {
            await deleteProductDetail(id).then((value) => {
                if (value.status === 200) {
                    Save()
                    setOpenDialog(false)
                } else {
                    return
                }
            })
        }
        fechAPI()
    }

    return (
        <>
            <div className={cx('list-types')}>
                <div className={cx('input-item')}>
                    <label htmlFor={`type-${type.id}`} className={cx('item-label')}>
                        Loại
                        <span className={cx('red-text')}>*</span>
                    </label>
                    <TextField
                        rows={3}
                        size='small'
                        fullWidth
                        id={`type-${type.id}`}
                        label=' Loại'
                        value={typeName}
                        error={Boolean(errorMessage.typeName)}
                        helperText={errorMessage.typeName}
                        onChange={handleInputType}
                        onBlur={handleBlurType}
                    />
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor={`quantity-${type.id}`} className={cx('item-label')}>
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
                        id={`quantity-${type.id}`}
                        label='Số lượng'
                        value={quantity}
                        error={Boolean(errorMessage.quantity)}
                        helperText={errorMessage.quantity}
                        onChange={handleInputQuantity}
                        onBlur={handleBlurQuantity}
                    />
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor={`price-${type.id}`} className={cx('item-label')}>
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
                        id={`price-${type.id}`}
                        label='Giá'
                        value={price}
                        error={Boolean(errorMessage.price)}
                        helperText={errorMessage.price}
                        onChange={handleInputPrice}
                        onBlur={handleBlurPrice}
                    />
                </div>
                <div className={cx('btn-items-wrapper')}>
                    {isChanged() && <SaveIcon fontSize='large' className={cx('btn-item')} onClick={handleSave} />}
                    <DeleteIcon fontSize='large' className={cx('btn-item')} onClick={handleClickDeleteBtn} />
                </div>
                <Toast
                    success={successToast}
                    fail={errorToast}
                    handleClose={handleCloseToast}
                    textSuccess='Lưu thành công!'
                    textFailure='Lưu thất bại!'
                />
                <Dialog
                    open={openDialog}
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                >
                    <DialogTitle id='alert-dialog-title'></DialogTitle>
                    <DialogContent>
                        <Popup
                            title='Xoá danh mục'
                            content='Danh mục này sẽ bị xoá vĩnh viễn!'
                            handleConfirm={() => handleConfirm(type.id)}
                            handleCancel={handleClose}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}

export default ProductDetailItem
