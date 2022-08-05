import CancelIcon from '@mui/icons-material/Cancel'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import { TextField } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import * as request from '~/untils/request'
import { deleteCategory, putCategory } from '~/api_services/categoryServices'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Validator from '~/common_services/Validator'
import Popup from '~/components/Popup/Popup'
import Toast from '~/components/Toast'

import classNames from 'classnames/bind'
import styles from './ListCategories.module.scss'
const cx = classNames.bind(styles)

function CategoryItem({ category, isChecked, handleChecked, imageSrc, Save }) {
    const [isEdit, setIsEdit] = useState(false)
    const [successToast, setSuccessToast] = useState(false)
    const [errorToast, setErrorToast] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [image, setImage] = useState()
    const [thumb, setThumb] = useState()
    const [errorMessage, setErrorMessage] = useState({})
    const [title, setTitle] = useState(category.title)
    const imageRef = useRef()

    useLayoutEffect(() => {
        setTitle(category.title)
    }, [category.title])

    useEffect(() => {
        const fechAPI = async () => {
            try {
                const result = await request.getImages(imageSrc)
                setImage(result)
            } catch (error) {
                console.log(error)
            }
        }
        fechAPI()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category.thumbnail])

    const fields = {
        title,
    }
    const rules = [
        {
            field: 'title',
            method: 'isEmpty',
            validWhen: false,
            message: 'Vui lòng điền trường này!',
        },
    ]

    const handleValidate = () => {
        const result = Validator(rules, fields)
        setErrorMessage({ ...result })
        return Boolean(result.title)
    }

    const handleInputTitle = (e) => {
        setTitle(e.target.value)
        fields.title = e.target.value.trim()
        handleValidate()
    }

    const handlePreview = (e) => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)
        setThumb(file)
        e.target.value = ''
        imageRef.current.src = file.preview
    }

    const getData = (fileName) => {
        let data = {
            id: category.id,
            title: title.trim(),
        }
        if (fileName) {
            data = { ...data, thumbnail: fileName }
        }
        return data
    }

    const handleEdit = () => {
        setIsEdit(true)
    }

    const handleCancel = () => {
        setIsEdit(false)
        setTitle(category.title)
        setThumb()
        imageRef.current.src = image
    }

    const handleSave = () => {
        const isError = handleValidate()
        let data = getData()
        const fechAPI = async () => {
            if (thumb) {
                const formData = new FormData()
                formData.append('file', thumb)
                const filesName = await request.uploadfiles(formData)
                data = getData(filesName)
            }
            await putCategory(data).then((value) => {
                if (value.status === 200) {
                    setIsEdit(false)
                    setThumb()
                    Save()
                    setSuccessToast(true)
                } else {
                    return
                }
            })
        }
        if (!isError) {
            fechAPI()
        } else {
            setErrorToast(true)
        }
    }

    const handleClickDeleteBtn = () => {
        setOpenDialog(true)
    }

    const handleConfirm = (id) => {
        const fechAPI = async () => {
            await deleteCategory(id).then((value) => {
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

    const handleClose = () => {
        setOpenDialog(false)
    }

    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setSuccessToast(false)
        setErrorToast(false)
    }

    return (
        <div className={cx('category-item')} key={category.id}>
            <input
                checked={isChecked}
                type='checkbox'
                className={cx('collumn-item', 'input')}
                onChange={handleChecked}
            />
            <div className={cx('collumn-item', 'id')}>{category.id}</div>
            <div className={cx('collumn-item')}>
                {!isEdit && <p className={cx('text-edit')}>{title}</p>}
                {isEdit && (
                    <TextField
                        sx={{ '& .MuiFormHelperText-root': { fontSize: '1.1rem' } }}
                        size='small'
                        autoFocus
                        className={cx('text-edit', 'input')}
                        value={title}
                        onChange={handleInputTitle}
                        error={Boolean(errorMessage.title)}
                        helperText={errorMessage.title}
                    />
                )}
            </div>
            <div className={cx('collumn-item', 'image-item')}>
                <input type='file' hidden id={category.id} onChange={(e) => handlePreview(e)} />
                <img ref={imageRef} src={image} alt='thumbnails' />
                {isEdit && (
                    <label htmlFor={category.id} className={cx('image-label')}>
                        <ChangeCircleIcon className={cx('change-file-icon')} />
                    </label>
                )}
            </div>
            <div className={cx('collumn-item', 'actions')}>
                {isEdit && <CancelIcon className={cx('collumn-icon')} onClick={handleCancel} />}
                {!isEdit && <EditIcon className={cx('collumn-icon')} onClick={() => handleEdit(category.id)} />}
                <DeleteIcon className={cx('collumn-icon')} onClick={handleClickDeleteBtn} />

                {(!(title.trim() === category.title) || thumb) && (
                    <SaveIcon className={cx('collumn-icon')} onClick={() => handleSave(category.id)} />
                )}
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
                        handleConfirm={() => handleConfirm(category.id)}
                        handleCancel={handleClose}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CategoryItem
