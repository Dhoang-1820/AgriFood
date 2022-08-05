import { TextField } from '@mui/material'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'

import { useEffect, useRef, useState } from 'react'
import { postProductCCategory } from '~/api_services/productCategoryServices'
import { getCategories } from '~/api_services/categoryServices'
import * as request from '~/untils/request'
import Button from '~/components/Button'
import Validator from '~/common_services/Validator'

import Toast from '~/components/Toast'

import classNames from 'classnames/bind'
import styles from './NewProductCategory.module.scss'
const cx = classNames.bind(styles)

function NewProductCategory() {
    const [categories, setCategories] = useState([])
    const [title, setTitle] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [successToast, setSuccessToast] = useState(false)
    const [errorToast, setErrorToast] = useState(false)

    const [errorMessage, setErrorMessage] = useState({})

    useEffect(() => {
        const fechAPI = async () => {
            const result = await getCategories()
            setCategories(result.data)
        }
        fechAPI()
    }, [])

    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setSuccessToast(false)
        setErrorToast(false)
    }

    //Validate
    const fields = {
        title,
        categoryId: categoryId.toString(),
    }

    const rules = [
        {
            field: 'title',
            method: 'isEmpty',
            validWhen: false,
            message: 'Vui lòng điền trường này',
        },
        {
            field: 'categoryId',
            method: 'isEmpty',
            validWhen: false,
            message: 'Vui lòng chọn một danh mục',
        },
    ]

    const handleSuccess = () => {
        setTitle('')
        setSuccessToast(true)
    }

    const handleFailure = () => {
        setErrorToast(true)
    }

    const handleValidate = (options = rules, content = fields) => {
        const result = Validator(options, content)
        setErrorMessage({ ...result })
        return Boolean(Object.keys(result).length)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const isError = handleValidate()
        const fechAPI = async () => {
            const result = await postProductCCategory({ categoryid: categoryId, title })
            result ? handleSuccess() : handleFailure()
        }
        if (!isError) {
            fechAPI()
        }
    }

    const handleCancel = (e) => {
        e.preventDefault()
        setTitle('')
        setCategoryId('')
        setErrorMessage('')
        setErrorMessage({})
    }

    const handleBlurTitle = (e) => {
        fields.title = e.target.value
        handleValidate([rules[0]], fields.title)
    }

    const handleBlurCategory = (e) => {
        const id = e.target.value
        fields.categoryId = id.toString()
        handleValidate([rules[1]], fields.categoryId)
    }

    const handleInput = (e) => {
        setTitle(e.target.value)
        fields.title = e.target.value
        handleValidate([rules[0]], fields.title)
    }

    const handleChange = (e) => {
        const id = e.target.value
        setCategoryId(id)
        fields.categoryId = id.toString()
        handleValidate([rules[1]], fields.categoryId)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Thêm mới danh mục sản phẩm</div>
            <Box className={cx('form')} component='form' noValidate autoComplete='on'>
                <div className={cx('new-product-product')}>
                    <div className={cx('new-product-item')}>
                        <label htmlFor='categoryId' className={cx('new-product-label')}>
                            Danh mục
                            <span className={cx('red-text')}>*</span>
                        </label>
                        <FormControl fullWidth size='small'>
                            <InputLabel id='categoryId'>Danh mục </InputLabel>
                            <Select
                                labelId='categoryId'
                                value={categoryId}
                                label='Danh mục'
                                onChange={handleChange}
                                onBlur={handleBlurCategory}
                            >
                                {categories.map((category, index) => (
                                    <MenuItem key={index} value={category.id}>
                                        {category.title}
                                    </MenuItem>
                                ))}
                            </Select>
                            {Boolean(errorMessage.categoryId) && (
                                <span className={cx('err-text')}>Vui lòng chọn một danh mục</span>
                            )}
                        </FormControl>
                    </div>
                    <div className={cx('new-product-item')}>
                        <label htmlFor='title' className={cx('new-product-label')}>
                            Tên danh mục sản phẩm
                            <span className={cx('red-text')}>*</span>
                        </label>
                        <TextField
                            size='small'
                            fullWidth
                            id='title'
                            label='Tên danh mục sản phẩm'
                            value={title}
                            onChange={handleInput}
                            error={Boolean(errorMessage.title)}
                            helperText={errorMessage.title}
                            onBlur={handleBlurTitle}
                        />
                    </div>
                    <div className={cx('new-product-item')}>
                        <label className={cx('new-product-label')}></label>
                        <div className={cx('btn-new-product')}>
                            <Button primary onClick={handleSubmit}>
                                Thêm
                            </Button>
                            <Button className={cx('btn-cancel')} disable onClick={handleCancel}>
                                Huỷ
                            </Button>
                        </div>
                    </div>
                </div>
            </Box>
            <Toast
                success={successToast}
                fail={errorToast}
                handleClose={handleCloseToast}
                textSuccess='Thêm thành công!'
                textFailure='Thêm thất bại!'
            />
        </div>
    )
}

export default NewProductCategory
