import { TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '~/components/Button'
import { postCategory } from '~/api_services/categoryServices'
import * as request from '~/untils/request'
import Toast from '~/components/Toast'
import Validator from '~/common_services/Validator'

import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './NewCategory.module.scss'
const cx = classNames.bind(styles)

function NewCategory() {
    const [title, setTitle] = useState('')
    const [thumb, setThumb] = useState(null)
    const [thumbPreview, setThumbPreview] = useState()
    const [successToast, setSuccessToast] = useState(false)
    const [errorToast, setErrorToast] = useState(false)
    const fileRef = useRef()

    const [errorMessage, setErrorMessage] = useState({})

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(thumb)
        }
    }, [thumb, thumbPreview])

    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setSuccessToast(false)
        setErrorToast(false)
    }

    const handlePreviewThumbnail = (e) => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)
        setThumbPreview(file.preview)
        setThumb(file)
    }

    //Validate
    const fields = {
        title,
    }
    const rules = [
        {
            field: 'title',
            method: 'isEmpty',
            validWhen: false,
            message: 'Vui lòng điền trường này',
        },
    ]

    const handleSuccess = () => {
        setTitle('')
        fileRef.current.value = ''
        setThumbPreview('')
        setSuccessToast(true)
    }

    const handleFailure = () => {
        setErrorToast(true)
    }

    const handleValidate = () => {
        const result = Validator(rules, fields)
        setErrorMessage({ ...result })
        return Boolean(result.title)
    }

    const handeSubmitCategory = (e) => {
        e.preventDefault()
        const isError = handleValidate()
        const formData = new FormData()
        formData.append('file', thumb)
        const fechAPI = async () => {
            const filesName = await request.uploadfiles(formData)
            const result = await postCategory({ title, thumbnail: filesName })
            result ? handleSuccess() : handleFailure()
        }
        if (!isError) {
            fechAPI()
        }
    }

    const handleCancel = (e) => {
        e.preventDefault()
        setTitle('')
        fileRef.current.value = ''
        setThumbPreview('')
        setErrorMessage({})
    }

    const handleBlur = () => {
        handleValidate()
    }

    const handleInput = (e) => {
        setTitle(e.target.value)
        fields.title = e.target.value
        handleValidate()
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Thêm mới danh mục</div>
            <Toast success={successToast} fail={errorToast} handleClose={handleCloseToast} />
            <Box className={cx('form')} component='form' noValidate autoComplete='on'>
                <div className={cx('new-product-product')}>
                    <div className={cx('new-product-item')}>
                        <label htmlFor='name' className={cx('new-product-label')}>
                            Tên danh mục
                            <span className={cx('red-text')}>*</span>
                        </label>
                        <TextField
                            size='small'
                            fullWidth
                            id='name'
                            label='Tên danh mục'
                            value={title}
                            error={Boolean(errorMessage.title)}
                            onBlur={handleBlur}
                            onChange={handleInput}
                            helperText={errorMessage.title}
                        />
                    </div>
                    <div className={cx('new-product-item')}>
                        <label htmlFor='thumb' className={cx('new-product-label', 'thumb')}>
                            Thumbnails
                            <span className={cx('red-text')}>*</span>
                        </label>
                        <input
                            ref={fileRef}
                            type='file'
                            label='Thumbnails'
                            className={cx('input-file')}
                            onChange={handlePreviewThumbnail}
                        />
                        {thumbPreview && <img className={cx('preview-img')} src={thumbPreview} alt='preview' />}
                    </div>
                    <div className={cx('new-product-item')}>
                        <label htmlFor='origin' className={cx('new-product-label')}></label>
                        <div className={cx('btn-new-product')}>
                            <Button primary onClick={handeSubmitCategory}>
                                Thêm
                            </Button>
                            <Button className={cx('btn-cancel')} disable onClick={handleCancel}>
                                Huỷ
                            </Button>
                        </div>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default NewCategory
