/* eslint-disable eqeqeq */
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import Button from '~/components/Button'

import { useEffect, useState } from 'react'
import * as request from '~/untils/request'
import {
    deleteProductCategory,
    getProductCategories,
    getProductCategoryById,
} from '~/api_services/productCategoryServices'
import { deleteProduct, putProduct } from '~/api_services/productServices'
import { getProductDetailsByProductId } from '~/api_services/productDetailServices'
import Validator from '~/common_services/Validator'
import Popup from '~/components/Popup/Popup'
import Toast from '~/components/Toast'

import { ContentState, Editor } from 'react-draft-wysiwyg'
import { convertFromHTML, EditorState } from 'draft-js'
import ProductDetailItem from './ProductDetailItem'
import { getProductImagesByProductId, postProductImage } from '~/api_services/productImagesServices'
import NewProductDetail from './NewProductDetail'
import ProductImage from './ProductImage'

import styles from '~/admin_pages/components/CommonStyles/ListItem.module.scss'
import classNames from 'classnames/bind'
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
const cx = classNames.bind(styles)

function ProductItem({ product, isChecked, handleChecked, saveProduct }) {
    const [productCategory, setProductCategory] = useState('')
    const [productCategories, setProductCategories] = useState([])
    const [productImages, setProductImages] = useState([])
    const [photosPreview, setPhotosPreview] = useState([])

    const [errorMessage, setErrorMessage] = useState({})
    const [title, setTitle] = useState(product.title)
    const [origin, setOrigin] = useState(product.origin)
    const [preserve, setPreserve] = useState(product.preserve)
    const [manual, setManual] = useState(product.userManual)
    const [types, setTypes] = useState([])
    const [type, setType] = useState([])
    const [totalQuantity, setTotalQuantity] = useState(product.quantity)
    const [quantity, setQuantity] = useState()
    const [price, setPrice] = useState(product.price)
    const [unit, setUnit] = useState(product.unit)
    const [description, setDescription] = useState(product.description)
    const [discount, setDiscount] = useState(0)
    const [createAt, setCreateAt] = useState()
    const [categoryId, setCategoryId] = useState(product.productCategory)
    const [imageNames, setImageNames] = useState('')

    const [isEdit, setIsEdit] = useState(false)
    const [isOpenTypes, setIsOpenTypes] = useState(false)
    const [isOpenEditor, setIsOpenEditor] = useState(false)
    const [isAddType, setIsAddType] = useState(false)
    const [isOpenImages, setIsOpenImages] = useState(false)
    const [successToast, setSuccessToast] = useState(false)
    const [errorToast, setErrorToast] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [openDialogEdit, setOpenDialogEdit] = useState(false)
    const [isHasTypes, setIsHasTypes] = useState(false)
    const [hasSave, setHasSave] = useState(false)
    const [hasSaveImage, setHasSaveImage] = useState(false)

    const [editorValue, setEditorValue] = useState(EditorState.createEmpty())

    useEffect(() => {
        const m = new Date(product.createat)
        const dateFormatted =
            m.getDate() +
            '/' +
            (m.getMonth() + 1) +
            '/' +
            m.getFullYear() +
            ' ' +
            m.getHours() +
            ':' +
            m.getUTCMinutes() +
            ':' +
            m.getUTCSeconds()
        setTitle(product.title)
        setOrigin(product.origin)
        setPreserve(product.preserve)
        setManual(product.userManual)
        setTotalQuantity(product.quantity)
        setDiscount(product.discount)
        setCreateAt(product.createat)
        setCategoryId(product.productCategory)
        setCreateAt(dateFormatted)
    }, [
        product.title,
        product.origin,
        product.preserve,
        product.userManual,
        product.discount,
        product.createAt,
        product.categoryId,
        product.quantity,
        product.productCategory,
        product.createat,
    ])

    useEffect(() => {
        const fechAPI = async () => {
            const result = await getProductCategoryById(product.productCategory)
            setProductCategory(result.data)
        }
        fechAPI()
    }, [product.productCategory])

    useEffect(() => {
        setEditorValue(EditorState.moveFocusToEnd(editorValue))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpenEditor])

    useEffect(() => {
        const fechAPI = async () => {
            const result = await getProductCategories()
            setProductCategories(result.data)
        }
        fechAPI()
    }, [])

    useEffect(() => {
        const fechAPI = async () => {
            const result = await getProductDetailsByProductId(product.id)
            if (result.data.length) {
                setIsHasTypes(true)
            }
            setTypes(result.data)
        }
        fechAPI()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasSave])

    useEffect(() => {
        const fechAPI = async () => {
            const result = await getProductImagesByProductId(product.id)
            if (result.data.length) {
                const photos = result.data.map((item) => {
                    return request.getImages(item.image)
                })
                setPhotosPreview(photos)
                setProductImages(result.data)
            }
        }
        fechAPI()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasSaveImage])

    const fields = {
        title,
        unit,
        description,
        productCategoriesId: categoryId.toString(),
        // imageNames,
        totalQuantity: totalQuantity.toString(),
    }

    const rules = [
        {
            field: 'title',
            method: 'isEmpty',
            validWhen: false,
            message: 'Vui lòng điền trường này',
        },
        {
            field: 'unit',
            method: 'isEmpty',
            validWhen: false,
            message: 'Vui lòng điền trường này',
        },
        {
            field: 'description',
            method: 'isEmpty',
            validWhen: false,
            message: 'Vui lòng điền trường này',
        },
        {
            field: 'productCategoriesId',
            method: 'isEmpty',
            validWhen: false,
            message: 'Vui lòng chọn một danh mục',
        },
        {
            field: 'totalQuantity',
            method: 'isEmpty',
            validWhen: false,
            message: 'Vui lòng điền trường này',
        },
    ]

    const handleValidate = (options = rules, content = fields) => {
        console.log(options, content)
        const result = Validator(options, content)
        setErrorMessage((prev) => ({ ...prev, ...result }))
        for (const key in result) {
            if (result[key]) return false
        }
        return true
    }

    // validattion
    const validations = (value, field, rule) => {
        fields[field] = value
        handleValidate([rule], fields[field])
    }
    // categories
    const handleChange = (e) => {
        const id = e.target.value
        setCategoryId(id)
        fields.categoryId = id.toString()
        handleValidate([rules[1]], fields.categoryId)
    }

    const handleBlurCategory = (e) => {
        const id = e.target.value
        fields.categoryId = id.toString()
        handleValidate([rules[1]], fields.categoryId)
    }
    // title
    const handleInputTitle = (e) => {
        setTitle(e.target.value)
        validations(e.target.value, title, rules[0])
    }
    const handleBlurTitle = (e) => {
        validations(e.target.value, title, rules[0])
    }

    // Unit validation
    const handleBlurUnit = (e) => {
        validations(e.target.value, unit, rules[1])
    }
    const handleInputUnit = (e) => {
        setUnit(e.target.value)
        validations(e.target.value, unit, rules[1])
    }
    // Total quantity
    const handleInputTotalQuantity = (e) => {
        setTotalQuantity(e.target.value)
        validations(e.target.value, totalQuantity, rules[4])
    }
    const handleBlurTotalQuantity = (e) => {
        validations(e.target.value, totalQuantity, rules[4])
    }

    const handleEdit = () => {
        setOpenDialogEdit(true)
        setIsEdit(true)
    }

    const Save = () => {
        setHasSave(!hasSave)
        setHasSaveImage(!hasSaveImage)
    }

    const handleOpenImages = (e) => {
        e.preventDefault()
        setIsEdit(false)
        setIsOpenImages(true)
    }

    const handleOpenTypes = (e) => {
        e.preventDefault()
        setIsEdit(false)
        if (!!!types.length) {
            setIsOpenTypes(false)
            setIsAddType(true)
        } else {
            setIsOpenTypes(true)
        }
    }

    const handleAddType = (e) => {
        e.preventDefault()
        setIsEdit(false)
        setIsOpenTypes(false)
        setIsAddType(true)
    }

    const handleBackWard = (e) => {
        e.preventDefault()
        if (isAddType && !isHasTypes) {
            setIsAddType(false)
            setIsEdit(true)
        } else if (isAddType) {
            setIsAddType(false)
            setIsEdit(false)
            setIsOpenTypes(true)
        } else if (isOpenImages) {
            setIsOpenImages(false)
            setIsEdit(true)
        } else {
            setImageNames(false)
            setIsOpenTypes(false)
            setIsOpenEditor(false)
            setIsAddType(false)
            setIsEdit(true)
        }
    }

    const handleAddDescription = (e) => {
        e.preventDefault()
        setIsOpenTypes(false)
        setIsEdit(false)
        setIsOpenEditor(true)
    }

    const handleCancel = () => {
        setIsEdit(false)
        setIsOpenEditor(false)
        setIsOpenTypes(false)
        setIsOpenEditor(false)
        setIsAddType(false)
        setIsOpenImages(false)
        setOpenDialogEdit(false)
    }

    const getData = () => {
        const date = new Date().toJSON()
        const data = {
            id: product.id,
            title: title.trim(),
            discount,
            productCategory: categoryId,
            createat: product.createat,
            updateat: date,
            unit,
            origin,
            preserve,
            userManual: manual,
            quantity: totalQuantity,
            description,
        }
        return data
    }

    const handleGetFileNames = (selectedImages) => {
        return Promise.all(
            Array.from(selectedImages).map((image) => {
                const formData = new FormData()
                formData.append('file', image)
                return request.uploadfiles(formData)
            }),
        )
    }

    const handlePostImages = (id, fileNames) => {
        fileNames.forEach(async (name) => {
            await postProductImage({ productId: id, image: name })
        })
    }

    const handleAddImages = (e) => {
        const file = e.target.files
        const fechAPI = async () => {
            await handleGetFileNames(file).then((fileNames) => handlePostImages(product.id, fileNames))
            setHasSaveImage(!hasSaveImage)
        }
        fechAPI()
    }

    const handleSave = () => {
        const isError = handleValidate()
        console.log(isError)
        let data = getData()
        const fechAPI = async () => {
            await putProduct(data).then((value) => {
                console.log(value)
                if (value.status === 200) {
                    setOpenDialogEdit(false)
                    setIsEdit(false)
                    setSuccessToast(true)
                    saveProduct()
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

    const handleClickDeleteBtn = () => {
        setOpenDialog(true)
    }

    const handleConfirm = (id) => {
        const fechAPI = async () => {
            await deleteProduct(id).then((value) => {
                if (value.status === 200) {
                    setOpenDialog(false)
                    saveProduct()
                } else {
                    return
                }
            })
        }
        fechAPI()
    }

    const handleClose = () => {
        setOpenDialogEdit(false)
        setIsOpenTypes(false)
        setIsEdit(false)
        setIsOpenEditor(false)
        setIsAddType(false)
        setIsOpenImages(false)
    }

    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setSuccessToast(false)
        setErrorToast(false)
    }

    const isProductChanged = function () {
        return (
            title.trim() !== product.title ||
            categoryId !== product.productCategory ||
            origin.trim() !== product.origin ||
            preserve.trim() !== product.preserve ||
            manual.trim() !== product.userManual ||
            unit.trim() !== product.unit ||
            totalQuantity != product.quantity ||
            discount != product.discount
        )
    }

    const handleEditorChange = (editorState) => {
        setEditorValue(editorState)
    }

    return (
        <div className={cx('category-item')} key={product.id}>
            <Dialog
                open={openDialogEdit}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
                fullWidth
                maxWidth='md'
            >
                {(isOpenTypes || isOpenEditor || isAddType || isOpenImages) && (
                    <DialogTitle className={cx('dialog-title')}>
                        <ArrowBackIcon fontSize='large' onClick={handleBackWard} className={cx('btn-header-dialog')} />
                        {(isOpenTypes || isOpenEditor || isOpenImages) && (
                            <>
                                {isOpenTypes && (
                                    <AddCircleOutlineIcon
                                        fontSize='large'
                                        className={cx('btn-header-dialog')}
                                        onClick={handleAddType}
                                    />
                                )}
                                {isOpenImages && (
                                    <>
                                        <input
                                            type='file'
                                            label='photos'
                                            multiple
                                            hidden
                                            id={product.id}
                                            accept='image/png, image/gif, image/jpeg'
                                            onChange={handleAddImages}
                                        />
                                        <label htmlFor={product.id} className={cx('btn-image')}>
                                            <AddCircleOutline fontSize='large' />
                                        </label>
                                    </>
                                )}
                            </>
                        )}
                    </DialogTitle>
                )}
                {isOpenEditor && (
                    <div className={cx('editor-wrapper')}>
                        <Editor
                            editorState={editorValue}
                            // defaultEditorState={sampleEditorContent}
                            editorClassName={cx('editor', 'scrollbar-custom')}
                            onEditorStateChange={handleEditorChange}
                        />
                    </div>
                )}
                {isAddType && (
                    <DialogContent className={'scrollbar-custom'}>
                        <NewProductDetail productId={product.id} Save={Save} />
                    </DialogContent>
                )}
                {isEdit && (
                    <DialogContent
                        sx={{
                            width: '100%',
                            overflow: 'auto',
                        }}
                        className={'scrollbar-custom'}
                    >
                        <Box
                            className={cx('form')}
                            component='form'
                            noValidate
                            autoComplete='on'
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div className={cx('input-list')}>
                                <div className={cx('input-item')}>
                                    <label htmlFor='category' className={cx('item-label')}>
                                        Danh mục sản phẩm
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
                                            {productCategories.map((category, index) => (
                                                <MenuItem key={index} value={category.id}>
                                                    {category.title}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {Boolean(errorMessage.productCategoriesId) && (
                                            <span className={cx('err-text')}>Vui lòng chọn một danh mục</span>
                                        )}
                                    </FormControl>
                                </div>
                                <div className={cx('input-item')}>
                                    <label htmlFor='name' className={cx('item-label')}>
                                        Tên sản phẩm
                                        <span className={cx('red-text')}>*</span>
                                    </label>
                                    <TextField
                                        size='small'
                                        fullWidth
                                        id='name'
                                        label='Tên sản phẩm'
                                        value={title}
                                        error={Boolean(errorMessage.title)}
                                        helperText={errorMessage.title}
                                        onChange={handleInputTitle}
                                        onBlur={handleBlurTitle}
                                    />
                                </div>
                                <div className={cx('input-item')}>
                                    <label htmlFor='origin' className={cx('item-label')}>
                                        Xuất Xứ
                                    </label>
                                    <TextField
                                        size='small'
                                        fullWidth
                                        id='origin'
                                        label='Xuất Xứ'
                                        value={origin}
                                        onChange={(e) => setOrigin(e.target.value)}
                                    />
                                </div>
                                <div className={cx('input-item')}>
                                    <label htmlFor='preserve' className={cx('item-label')}>
                                        Bảo Quản
                                    </label>
                                    <TextField
                                        size='small'
                                        fullWidth
                                        id='preserve'
                                        label='Bảo Quản'
                                        value={preserve}
                                        onChange={(e) => setPreserve(e.target.value)}
                                    />
                                </div>
                                <div className={cx('input-item')}>
                                    <label htmlFor='user-manual' className={cx('item-label')}>
                                        Hướng dẫn sử dụng
                                    </label>
                                    <TextField
                                        rows={3}
                                        multiline
                                        size='small'
                                        fullWidth
                                        id='user-manual'
                                        label='Hướng dẫn sử dụng'
                                        value={manual}
                                        onChange={(e) => setManual(e.target.value)}
                                    />
                                </div>
                                <div className={cx('input-item')}>
                                    <label htmlFor='unit' className={cx('item-label')}>
                                        Đơn vị
                                        <span className={cx('red-text')}>*</span>
                                    </label>
                                    <TextField
                                        rows={3}
                                        size='small'
                                        fullWidth
                                        id='unit'
                                        label='Đơn vị'
                                        value={unit}
                                        error={Boolean(errorMessage.unit)}
                                        helperText={errorMessage.unit}
                                        onChange={handleInputUnit}
                                        onBlur={handleBlurUnit}
                                    />
                                </div>
                                <div className={cx('input-item')}>
                                    <label htmlFor='totalQuantity' className={cx('item-label')}>
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
                                        id='totalQuantity'
                                        label='Số lượng'
                                        value={totalQuantity}
                                        error={Boolean(errorMessage.totalQuantity)}
                                        helperText={errorMessage.totalQuantity}
                                        onChange={handleInputTotalQuantity}
                                        onBlur={handleBlurTotalQuantity}
                                    />
                                </div>
                                <div className={cx('input-item')}>
                                    <label htmlFor='type' className={cx('item-label')}>
                                        Loại
                                    </label>
                                    <div className={cx('input-multiple-wrapper')}>
                                        <div className={cx('selected-list')}>
                                            {types.map((type, index) => (
                                                <div className={cx('selected-item')} key={index}>
                                                    <div className={cx('selected-title')}>{type.type}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className={cx('add-types-wrapper')}>
                                            {isHasTypes && (
                                                <button className={cx('add-btn')} onClick={handleOpenTypes}>
                                                    <div className={cx('add-btn-title')}>Chi tiết</div>
                                                </button>
                                            )}
                                            {!isHasTypes && (
                                                <button className={cx('add-btn')} onClick={handleOpenTypes}>
                                                    <div className={cx('add-btn-title')}>Thêm mới</div>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('input-item')}>
                                    <label htmlFor='discount' className={cx('item-label')}>
                                        Giảm giá
                                    </label>
                                    <TextField
                                        InputProps={{
                                            type: 'number',
                                            startAdornment: <InputAdornment position='start'>%</InputAdornment>,
                                        }}
                                        rows={3}
                                        size='small'
                                        fullWidth
                                        id='discount'
                                        label='Giảm giá'
                                        value={discount}
                                        onChange={(e) => setDiscount(e.target.value)}
                                    />
                                </div>
                                <div className={cx('input-item')}>
                                    <label className={cx('item-label', 'thumb')}>
                                        Mô tả sản phẩm
                                        <span className={cx('red-text')}>*</span>
                                    </label>

                                    <button className={cx('add-btn')} onClick={handleAddDescription}>
                                        <div className={cx('add-btn-title')}>Xem</div>
                                    </button>
                                    {Boolean(errorMessage.description) && (
                                        <span className={cx('err-text')}>Vui lòng thêm mô tả sản phẩm</span>
                                    )}
                                </div>
                                <div className={cx('input-item', 'images')}>
                                    <label htmlFor='photos' className={cx('item-label', 'thumb')}>
                                        Ảnh sản phẩm
                                        <span className={cx('red-text')}>*</span>
                                    </label>
                                    {photosPreview.map((photo, index) => (
                                        <img className={cx('preview-img')} src={photo} alt='preview' key={index} />
                                    ))}
                                    <div className={cx('add-types-wrapper')}>
                                        {!!photosPreview.length && (
                                            <button className={cx('add-btn')} onClick={handleOpenImages}>
                                                <div className={cx('add-btn-title')}>Chi tiết</div>
                                            </button>
                                        )}
                                        {!!!photosPreview.length && (
                                            <button className={cx('add-btn')} onClick={handleAddImages}>
                                                <div className={cx('add-btn-title')}>Thêm mới</div>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </DialogContent>
                )}
                {isOpenImages && (
                    <div className={cx('images-list')}>
                        {productImages.map((photo, index) => (
                            <ProductImage photo={photo} Save={Save} key={index} />
                        ))}
                    </div>
                )}
                {isOpenTypes && (
                    <DialogContent className={'scrollbar-custom'}>
                        {types.map((type, index) => (
                            <ProductDetailItem type={type} productId={product.id} Save={Save} key={index} />
                        ))}
                    </DialogContent>
                )}
                <div className={cx('btn-dialog')}>
                    {isProductChanged() && (
                        <Button primary onClick={handleSave}>
                            Lưu
                        </Button>
                    )}
                    <Button disable onClick={handleCancel}>
                        Huỷ
                    </Button>
                </div>
            </Dialog>
            <input
                checked={isChecked}
                type='checkbox'
                className={cx('collumn-item', 'input')}
                onChange={handleChecked}
            />
            <div className={cx('collumn-item', 'id')}>{product.id}</div>
            <div className={cx('collumn-item')}>
                <p className={cx('text-edit')}>{productCategory.title}</p>
            </div>
            <div className={cx('collumn-item')}>
                <p className={cx('text-edit')}>{title}</p>
            </div>
            <div className={cx('collumn-item', 'list')}>
                <p className={cx('text-edit')}>{types.map((item) => item.type + ' ')}</p>
            </div>
            <div className={cx('collumn-item', 'number')}>
                <p className={cx('text-edit')}>{discount}%</p>
            </div>
            <div className={cx('collumn-item', 'number')}>
                <p className={cx('text-edit')}>{totalQuantity}</p>
            </div>
            <div className={cx('collumn-item', 'number')}>
                <p className={cx('text-edit')}>{totalQuantity ? 'Còn hàng' : 'Hết hàng'}</p>
            </div>

            <div className={cx('collumn-item')}>
                <p className={cx('text-edit')}>{createAt}</p>
            </div>

            <div className={cx('collumn-item', 'actions')}>
                <EditIcon className={cx('collumn-icon')} onClick={() => handleEdit(product.id)} />
                <DeleteIcon className={cx('collumn-icon')} onClick={handleClickDeleteBtn} />
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
                        handleConfirm={() => handleConfirm(product.id)}
                        handleCancel={handleClose}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ProductItem
