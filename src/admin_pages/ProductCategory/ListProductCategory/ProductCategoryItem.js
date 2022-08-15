import CancelIcon from '@mui/icons-material/Cancel'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import { TextField } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

import { useEffect, useState } from 'react'
import { getCategories, getCategoryById } from '~/api_services/categoryServices'
import { putProductCCategory, deleteProductCategory } from '~/api_services/productCategoryServices'
import Validator from '~/common_services/Validator'
import Popup from '~/components/Popup/Popup'
import Toast from '~/components/Toast'

import classNames from 'classnames/bind'
import styles from '~/admin_pages/components/CommonStyles/ListItem.module.scss'
const cx = classNames.bind(styles)

function ProductCategoryItem({ productCategory, isChecked, handleChecked, Save }) {
    const [isEdit, setIsEdit] = useState(false)
    const [successToast, setSuccessToast] = useState(false)
    const [errorToast, setErrorToast] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [category, setCategory] = useState([])
    const [categories, setCategories] = useState([])

    const [errorMessage, setErrorMessage] = useState({})
    const [title, setTitle] = useState(productCategory.title)
    const [categoryId, setCategoryId] = useState(productCategory.categoryid)

    useEffect(() => {
        setTitle(productCategory.title)
    }, [productCategory.title])

    useEffect(() => {
        const fechAPI = async () => {
            const result = await getCategoryById(productCategory.categoryid)
            setCategory(result.data)
        }
        fechAPI()
    }, [productCategory.categoryid])

    useEffect(() => {
        const fechAPI = async () => {
            const result = await getCategories()
            setCategories(result.data)
        }
        fechAPI()
    }, [])

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

    const getData = () => {
        let data = {
            id: productCategory.id,
            title: title.trim(),
        }
        if (categoryId !== productCategory.categoryid) {
            data = { ...data, categoryid: categoryId }
        }
        return data
    }

    const handleEdit = () => {
        setIsEdit(true)
        handleValidate()
    }

    const handleCancel = () => {
        setIsEdit(false)
        setTitle(productCategory.title)
        setCategoryId(productCategory.categoryid)
    }

    const handleSave = () => {
        const isError = handleValidate()
        let data = getData()
        const fechAPI = async () => {
            await putProductCCategory(data).then((value) => {
                if (value.status === 200) {
                    setIsEdit(false)
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
            await deleteProductCategory(id).then((value) => {
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

    const handleChange = (e) => {
        const id = e.target.value
        setCategoryId(id)
        fields.categoryId = id.toString()
        handleValidate([rules[1]], fields.categoryId)
    }

    const handleBlurTitle = (e) => {
        fields.title = e.target.value
        handleValidate([rules[0]], fields.title)
    }

    const isChanged = function () {
        return title.trim() !== productCategory.title || title === '' || categoryId !== productCategory.categoryid
    }

    return (
        <div className={cx('category-item')} key={productCategory.id}>
            <input
                checked={isChecked}
                type='checkbox'
                className={cx('collumn-item', 'input')}
                onChange={handleChecked}
            />
            <div className={cx('collumn-item', 'id')}>{productCategory.id}</div>
            <div className={cx('collumn-item')}>
                {!isEdit && <p className={cx('text-edit')}>{category.title}</p>}
                {isEdit && (
                    <FormControl
                        size='small'
                        sx={{
                            '& .MuiFormControl-root, ': {
                                minWidth: '40%',
                            },
                        }}
                    >
                        <InputLabel id='categoryId'>Danh mục </InputLabel>
                        <Select labelId='categoryId' value={categoryId} label='Danh mục' onChange={handleChange}>
                            {categories.map((item, index) => (
                                <MenuItem key={index} value={item.id}>
                                    {item.title}
                                </MenuItem>
                            ))}
                        </Select>
                        {Boolean(errorMessage.categoryId) && (
                            <span className={cx('err-text')}>Vui lòng chọn một danh mục</span>
                        )}
                    </FormControl>
                )}
            </div>
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
                        onBlur={handleBlurTitle}
                    />
                )}
            </div>
            <div className={cx('collumn-item', 'actions')}>
                {isEdit && <CancelIcon className={cx('collumn-icon')} onClick={handleCancel} />}
                {!isEdit && <EditIcon className={cx('collumn-icon')} onClick={() => handleEdit(productCategory.id)} />}
                <DeleteIcon className={cx('collumn-icon')} onClick={handleClickDeleteBtn} />

                {isChanged() && (
                    <SaveIcon className={cx('collumn-icon')} onClick={() => handleSave(productCategory.id)} />
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
                        handleConfirm={() => handleConfirm(productCategory.id)}
                        handleCancel={handleClose}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ProductCategoryItem
