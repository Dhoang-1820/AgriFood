import { TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import CloseIcon from '@mui/icons-material/Close'

import { useEffect, useRef, useState } from 'react'
import Button from '~/components/Button'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'

import Validator from '~/common_services/Validator'
import Toast from '~/components/Toast'

import { getProductCategories } from '~/api_services/productCategoryServices'
import { postProduct } from '~/api_services/productServices'
import * as request from '~/untils/request'
import { postProductDetail } from '~/api_services/productDetailServices'
import { postProductImage } from '~/api_services/productImagesServices'

import classNames from 'classnames/bind'
import styles from '~/admin_pages/components/CommonStyles/NewItem.module.scss'
const cx = classNames.bind(styles)

function NewProduct() {
    const [openDialog, setOpenDialog] = useState(false)
    const [isEditor, setIsEditor] = useState(false)
    const [isType, setIsType] = useState(false)
    const [productCategories, setProductCategories] = useState([])
    const [productCategoriesId, setProductCategoriesId] = useState('')
    const [photosPreview, setPhotosPreview] = useState([])
    const [images, setImages] = useState([])
    const [imageNames, setImageNames] = useState('')
    const [errorMessage, setErrorMessage] = useState({})

    const [title, setTitle] = useState('')
    const [origin, setOrigin] = useState('')
    const [preserve, setPreserve] = useState('')
    const [manual, setManual] = useState('')
    const [types, setTypes] = useState([])
    const [type, setType] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [unit, setUnit] = useState('')
    const [description, setDescription] = useState('')
    const [totalQuantity, setTotalQuantity] = useState('')
    const [discount, setDiscount] = useState(0)

    const [successToast, setSuccessToast] = useState(false)
    const [errorToast, setErrorToast] = useState(false)

    const [editorValue, setEditorValue] = useState(EditorState.createEmpty())

    useEffect(() => {
        const fechAPI = async () => {
            const result = await getProductCategories()
            setProductCategories(result.data)
        }
        fechAPI()
    }, [])

    useEffect(() => {
        setEditorValue(EditorState.moveFocusToEnd(editorValue))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditor])

    const fileRef = useRef()

    //Validate
    const fields = {
        title,
        unit,
        description,
        productCategoriesId: productCategoriesId.toString(),
        imageNames,
        totalQuantity,
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
            field: 'imageNames',
            method: 'isEmpty',
            validWhen: false,
            message: 'Vui lòng chọn ảnh',
        },
        {
            field: 'totalQuantity',
            method: 'isEmpty',
            validWhen: false,
            message: 'Vui lòng điền trường này',
        },
    ]

    const fieldTypes = {
        type,
        quantity,
        price,
    }

    const ruleTypes = [
        {
            field: 'type',
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

    const handleValidate = (options = rules, content = fields) => {
        const result = Validator(options, content)
        setErrorMessage((prev) => ({ ...prev, ...result }))
        for (const key in result) {
            if (result[key]) return false
        }
        return true
    }

    //Validations form
    const validations = (value, field, rule) => {
        fields[field] = value
        handleValidate([rule], fields[field])
    }
    // Title validation
    const handleBlurTitle = (e) => {
        validations(e.target.value, title, rules[0])
    }

    const handleInputTitle = (e) => {
        setTitle(e.target.value)
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
        validations(e.target.value, totalQuantity, rules[5])
    }
    const handleBlurTotalQuantity = (e) => {
        validations(e.target.value, totalQuantity, rules[5])
    }
    const handleChange = (e) => {
        const id = e.target.value
        setProductCategoriesId(id)
        validations(id.toString(), productCategoriesId, rules[3])
    }

    // Type validation
    const handleBlurType = (e) => {
        validations(e.target.value, type, ruleTypes[0])
    }

    const handleInputType = (e) => {
        setType(e.target.value)
        validations(e.target.value, type, ruleTypes[0])
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
        validations(e.target.value, price, ruleTypes[2])
    }

    const handleInputPrice = (e) => {
        setPrice(e.target.value)
        validations(e.target.value, price, ruleTypes[2])
    }

    //
    const handleClose = () => {
        setOpenDialog(false)
        setType('')
        setQuantity('')
        setPrice('')
        setIsEditor(false)
        setIsType(false)
        setErrorMessage({})
    }

    const handleAddDescription = (e) => {
        e.preventDefault()
        setOpenDialog(true)
        setIsEditor(true)
        setIsType(false)
    }

    const handleConfirmDialog = () => {
        if (isType) {
            const isError = handleValidate([ruleTypes[0], ruleTypes[1], ruleTypes[2]], fieldTypes)
            if (isError) {
                setTypes((prev) => [...prev, { type, quantity, price }])
                setType('')
                setQuantity('')
                setPrice('')
            } else {
                return
            }
        }
        if (isEditor) {
            const data = editorValue.getCurrentContent().hasText()
                ? draftToHtml(convertToRaw(editorValue.getCurrentContent()))
                : ''
            validations(data, description, rules[2])
            setDescription(data)
        }
        setOpenDialog(false)
    }

    const handleCancelDialog = () => {
        setOpenDialog(false)
        setType('')
        setQuantity('')
        setPrice('')
        setErrorMessage({})
    }

    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setSuccessToast(false)
        setErrorToast(false)
    }

    const handleSuccess = () => {
        setTitle('')
        setOrigin('')
        setPreserve('')
        setManual('')
        setTypes([])
        setType('')
        setQuantity('')
        setPrice('')
        setUnit('')
        setTotalQuantity('')
        setDescription('')
        setDiscount(0)
        setPhotosPreview([])
        setEditorValue(EditorState.createEmpty())
        fileRef.current.value = ''
        setSuccessToast(true)
    }

    const handleFailure = () => {
        setErrorToast(true)
    }

    const handleGetFileNames = () => {
        return Promise.all(
            Array.from(images).map((image) => {
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

    const handlePostDetails = (id) => {
        return Promise.all(
            types.map((item) => {
                return postProductDetail({
                    productId: id,
                    quantity: item.quantity,
                    type: item.type,
                    price: item.price,
                })
            }),
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const isError = handleValidate()
        const date = new Date()
        const jsonDate = date.toJSON()
        const fechAPI = async () => {
            const result = await postProduct({
                title,
                discount,
                createat: jsonDate,
                updateat: null,
                unit,
                origin,
                preserve,
                userManual: manual,
                quantity: totalQuantity,
                description,
                productCategory: productCategoriesId,
            })

            await handleGetFileNames().then((fileNames) => handlePostImages(result.data.data, fileNames))
            await handlePostDetails(result.data.data)
            result ? handleSuccess() : handleFailure()
        }
        if (isError) {
            fechAPI()
        }
    }

    const handleCancel = (e) => {
        e.preventDefault()
        setTitle('')
        setOrigin('')
        setPreserve('')
        setManual('')
        setTypes([])
        setType('')
        setQuantity('')
        setPrice('')
        setUnit('')
        setTotalQuantity('')
        setDescription('')
        setDiscount('')
        setPhotosPreview([])
        setProductCategoriesId('')
        setEditorValue(EditorState.createEmpty())
        fileRef.current.value = ''
        setErrorMessage({})
    }

    const handleBlurCategory = (e) => {
        const id = e.target.value
        fields.categoryId = id.toString()
        handleValidate([rules[1]], fields.categoryId)
    }

    const handlePreviewImages = (e) => {
        if (e.target.files) {
            const fileArr = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
            setPhotosPreview(fileArr)
            setImages(e.target.files)
            setImageNames(e.target.value)
            validations(e.target.value, imageNames, rules[4])
        }
    }

    const handleAddType = (e) => {
        e.preventDefault()
        setOpenDialog(true)
        setIsType(true)
        setIsEditor(false)
    }

    const handleRemoveType = (index) => {
        types.splice(index, 1)
        setTypes([...types])
    }

    const handleEditorChange = (editorState) => {
        setEditorValue(editorState)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Thêm mới sản phẩm</div>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
                fullWidth
                maxWidth='md'
            >
                <DialogTitle id='alert-dialog-title'></DialogTitle>
                <DialogContent
                    sx={{
                        width: '100%',
                        overflow: 'hidden',
                    }}
                >
                    {isEditor && (
                        <div className={cx('editor-wrapper')}>
                            <Editor
                                editorState={editorValue}
                                editorClassName={cx('editor', 'scrollbar-custom')}
                                onEditorStateChange={handleEditorChange}
                            />
                        </div>
                    )}
                    {isType && (
                        <div className={cx('add-type')}>
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
                                    value={type}
                                    error={Boolean(errorMessage.type)}
                                    helperText={errorMessage.type}
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
                    )}
                </DialogContent>

                <div className={cx('btn-dialog')}>
                    <Button primary onClick={handleConfirmDialog}>
                        Xác nhận
                    </Button>
                    <Button disable onClick={handleCancelDialog}>
                        Huỷ
                    </Button>
                </div>
            </Dialog>
            <Box className={cx('form')} component='form' noValidate autoComplete='on'>
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
                                value={productCategoriesId}
                                label='Danh mục'
                                onChange={handleChange}
                                onBlur={handleBlurCategory}
                                error={Boolean(errorMessage.productCategoriesId)}
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
                                        <div className={cx('remove-btn')} onClick={() => handleRemoveType(index)}>
                                            <CloseIcon />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* <input
                                className={cx('input-multiple-choice')}
                                id='type'
                                label='Loại'
                                // error
                                // helperText='Thông tin bắt buộc'
                            /> */}
                            <button className={cx('add-btn')} onClick={handleAddType}>
                                <div className={cx('add-btn-title')}>Thêm mới</div>
                            </button>
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
                            <div className={cx('add-btn-title')}>Thêm mới</div>
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
                        <input
                            ref={fileRef}
                            type='file'
                            label='photos'
                            multiple
                            className={cx('input-file')}
                            // value={setImageNames}
                            onChange={handlePreviewImages}
                        />
                        {Boolean(photosPreview.length) &&
                            photosPreview.map((photo, index) => (
                                <img className={cx('preview-img')} src={photo} alt='preview' key={index} />
                            ))}
                        {Boolean(errorMessage.imageNames) && <span className={cx('err-text')}>Vui lòng chọn ảnh</span>}
                    </div>
                    <div className={cx('input-item')}>
                        <label className={cx('item-label')}></label>
                        <div className={cx('btn-add-new')}>
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

export default NewProduct
