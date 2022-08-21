import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import Toast from '~/components/Toast'
import Popup from '~/components/Popup/Popup'

import { useEffect, useRef, useState } from 'react'
import * as request from '~/untils/request'

import styles from '~/admin_pages/components/CommonStyles/ListItem.module.scss'
import classNames from 'classnames/bind'
import { deleteProductImage, putProductImage } from '~/api_services/productImagesServices'
const cx = classNames.bind(styles)

function ProductImage({ photo, Save }) {
    const [errorToast, setErrorToast] = useState(false)
    const [successToast, setSuccessToast] = useState(false)
    const [selectedImage, setSelectedImage] = useState()
    const [openDialog, setOpenDialog] = useState(false)
    const [imagePreview, setImagePreview] = useState()

    const imageRef = useRef()

    useEffect(() => {
        const fechAPI = () => {
            try {
                const result = request.getImages(photo.image)
                setImagePreview(result)
            } catch (error) {
                console.log(error)
            }
        }
        fechAPI()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [photo.image])

    const handlePreviewImage = (e) => {
        const file = e.target.files[0]
        const preview = URL.createObjectURL(file)
        setSelectedImage(file)
        e.target.value = ''
        setImagePreview(preview)
    }

    const getData = (fileName) => {
        let data = {
            id: photo.id,
            productId: photo.productId,
            image: fileName,
        }

        return data
    }

    const handleSave = () => {
        let data = getData()
        const fechAPI = async () => {
            const formData = new FormData()
            formData.append('file', selectedImage)
            const filesName = await request.uploadfiles(formData)
            data = getData(filesName)
            await putProductImage(data).then((value) => {
                if (value.status === 200) {
                    setSelectedImage()
                    Save()
                    setSuccessToast(true)
                } else {
                    return
                }
            })
        }
        fechAPI()
    }

    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setSuccessToast(false)
        setErrorToast(false)
    }

    const handleClose = () => {
        setOpenDialog(false)
    }

    const handleClickDeleteBtn = () => {
        setOpenDialog(true)
    }

    const handleConfirm = (id) => {
        const fechAPI = async () => {
            await deleteProductImage(id).then((value) => {
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
        <div className={cx('add-image-wrapper')}>
            <img className={cx('preview-img')} src={imagePreview} alt='preview' ref={imageRef} />
            <input
                type='file'
                label='photos'
                multiple
                hidden
                id={photo.id}
                accept='image/png, image/gif, image/jpeg'
                onChange={handlePreviewImage}
            />

            <div className={cx('btn-change-imge-wrapper')}>
                <label htmlFor={photo.id} className={cx('btn-image')}>
                    <ChangeCircleIcon fontSize='large' />
                </label>
                <div className={cx('btn-image')}>
                    <DeleteIcon fontSize='large' onClick={handleClickDeleteBtn} />
                </div>
                <div className={cx('btn-image')}>
                    {selectedImage && <SaveIcon fontSize='large' onClick={handleSave} />}
                </div>
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
                        handleConfirm={() => handleConfirm(photo.id)}
                        handleCancel={handleClose}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ProductImage
