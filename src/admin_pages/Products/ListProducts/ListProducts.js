import { useEffect, useLayoutEffect, useState } from 'react'
import Button from '~/components/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import { useDebounce } from '~/hooks'
import { deleteProductCategory, getProductCategories } from '~/api_services/productCategoryServices'
import { getProducts } from '~/api_services/productServices'
import SearchBar from '~/admin_pages/components/SearchBar'
import Popup from '~/components/Popup/Popup'
import admin from '~/config/admin'

import classNames from 'classnames/bind'
import styles from '~/admin_pages/components/CommonStyles/ListItem.module.scss'
import ProductItem from './ProductItem'
const cx = classNames.bind(styles)

function ListProducts() {
    const [products, setProducts] = useState([])
    const [isCheck, setIsCheck] = useState([])
    const [isCheckAll, setIsCheckAll] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [isSave, setIsSave] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        const fechAPI = async () => {
            const result = await getProducts()
            setProducts(result.data)
            setSearchResults(result.data)
        }
        fechAPI()
    }, [isSave])

    const Save = () => {
        setIsSave(!isSave)
        setSearchValue('')
    }

    const handleCheckedAll = () => {
        setIsCheckAll(!isCheckAll)
        setIsCheck(() => products.map((item) => item.id))
        if (isCheckAll) {
            setIsCheck([])
        }
    }

    const handleChecked = (id, e) => {
        const isChecked = e.target.checked
        if (isChecked) {
            setIsCheck((prev) => [...prev, id])
        } else {
            setIsCheck((prev) => prev.filter((item) => item !== id))
        }
    }
    // Delete categories
    const fechAPI = async (id) => {
        await deleteProductCategory(id).then((value) => {
            if (value.status === 200) {
                Save()
            } else {
                return
            }
        })
    }

    const handleConfirm = () => {
        isCheck.map((id) => fechAPI(id))
        setIsCheck([])
        setIsCheckAll(false)
        setOpenDialog(false)
    }

    const handleMuiltiDelete = () => {
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false)
    }

    // Search
    const debouce = useDebounce(searchValue, 300)
    useLayoutEffect(() => {
        if (!debouce.trim()) {
            setSearchResults(products)
            return
        }
        const data = products.filter(function (category) {
            return category.title.toLowerCase().includes(debouce)
        })
        setSearchResults(data)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouce])

    const handleSearch = (value) => {
        if (!value.startsWith(' ')) {
            setSearchValue(value)
        }
    }

    const handleClear = () => {
        setSearchValue('')
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Danh sách sản phẩm</div>
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
                        handleConfirm={handleConfirm}
                        handleCancel={handleClose}
                    />
                </DialogContent>
            </Dialog>
            <div className={cx('btn-group')}>
                <div className={cx('btn')}>
                    <Button primary to={admin.newProduct}>
                        Thêm sản phẩm
                    </Button>
                    {Boolean(isCheck.length) && (
                        <Button primary onClick={handleMuiltiDelete}>
                            Xoá?
                        </Button>
                    )}
                </div>
                <div className={cx('search')}>
                    <SearchBar handleSearch={handleSearch} searchValue={searchValue} handleClear={handleClear} />
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <input
                        type='checkbox'
                        className={cx('collumn-item', 'input')}
                        checked={isCheckAll}
                        onChange={handleCheckedAll}
                    />
                    <div className={cx('collumn-item', 'id')}>ID</div>
                    <div className={cx('collumn-item')}>Danh mục</div>
                    <div className={cx('collumn-item')}>Tên sản phẩm</div>
                    <div className={cx('collumn-item', 'list')}>Loại</div>
                    <div className={cx('collumn-item', 'number')}>Giảm giá</div>
                    <div className={cx('collumn-item', 'number')}>Số lượng</div>
                    <div className={cx('collumn-item', 'number')}>Tình trạng</div>
                    <div className={cx('collumn-item')}>Ngày tạo</div>
                    <div className={cx('collumn-item', 'actions')}>Hành động</div>
                </div>
                <div className={cx('body', 'scrollbar-custom')}>
                    <div className={cx('list-categories')}>
                        {searchResults.map((product, index) => (
                            <ProductItem
                                key={index}
                                product={product}
                                index={index}
                                isChecked={isCheck.includes(product.id)}
                                saveProduct={Save}
                                imageSrc={product.thumbnail}
                                handleChecked={(e) => handleChecked(product.id, e)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListProducts
