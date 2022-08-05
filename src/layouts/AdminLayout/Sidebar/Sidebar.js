import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined'
import ListAltIcon from '@mui/icons-material/ListAlt'
import AppsIcon from '@mui/icons-material/Apps'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'

import images from '~/assets/images'
import admin from '~/config/admin'

import { useState } from 'react'

import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
const cx = classNames.bind(styles)

function Sidebar() {
    const [openCategory, setOpenCategory] = useState(false)
    const [openProduct, setOpenProduct] = useState(false)
    const [openProductCategory, setOpenProductCategory] = useState(false)

    const handleClickCategory = () => {
        setOpenCategory(!openCategory)
    }

    const handleClickProduct = () => {
        setOpenProduct(!openProduct)
    }

    const handleClickProductCategory = () => {
        setOpenProductCategory(!openProductCategory)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img src={images.logo} alt='logo' className={cx('header-logo')} />
                <div className={cx('header-title')}>Agrifoods admin</div>
            </div>

            <div className={cx('content')}>
                <Box
                    sx={{
                        '& .MuiListItemButton-root, ': {
                            color: 'white',
                            fontSize: '1.4rem',
                        },
                        '& .MuiListSubheader-root': {
                            fontSize: '1.6rem',
                            backgroundColor: ' #111827',
                            color: '#9ca3af',
                        },
                        '& .MuiTypography-root': {
                            fontSize: '1.6rem',
                            fontWeight: '500',
                        },

                        '& .MuiSvgIcon-root': {
                            color: 'white',
                            fontSize: '2.2rem',
                        },
                        '& .MuiCollapse-root': {
                            paddingLeft: '3rem',
                        },
                        '& .MuiListItemIcon-root': {
                            minWidth: '30px',
                        },
                    }}
                >
                    <List
                        component='nav'
                        aria-labelledby='managerment'
                        subheader={
                            <ListSubheader component='div' id='managerment'>
                                Chung
                            </ListSubheader>
                        }
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary='Tổng quan' />
                        </ListItemButton>
                    </List>
                    <List
                        component='nav'
                        aria-labelledby='managerment'
                        subheader={
                            <ListSubheader component='div' id='managerment'>
                                Quản lý
                            </ListSubheader>
                        }
                    >
                        {/* Categories */}
                        <ListItemButton onClick={handleClickCategory}>
                            <ListItemIcon>
                                <AppsIcon />
                            </ListItemIcon>
                            <ListItemText primary='Danh mục' />
                            {openCategory ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openCategory} timeout='auto' unmountOnExit>
                            <List component='div' disablePadding>
                                <Link to={admin.listCategories}>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary='Danh sách' />
                                    </ListItemButton>
                                </Link>
                                <Link to={admin.newCategory}>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary='Thêm mới' />
                                    </ListItemButton>
                                </Link>
                            </List>
                        </Collapse>

                        {/* Product Categories */}
                        <ListItemButton onClick={handleClickProductCategory}>
                            <ListItemIcon>
                                <ListAltIcon />
                            </ListItemIcon>
                            <ListItemText primary='Danh mục sản phẩm' />
                            {openProductCategory ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openProductCategory} timeout='auto' unmountOnExit>
                            <List component='div' disablePadding>
                                <Link to={admin.listProductCategory}>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary='Danh sách' />
                                    </ListItemButton>
                                </Link>

                                <Link to={admin.newProductCategory}>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary='Thêm mới' />
                                    </ListItemButton>
                                </Link>
                            </List>
                        </Collapse>

                        {/* Products */}
                        <ListItemButton onClick={handleClickProduct}>
                            <ListItemIcon>
                                <InventoryOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary='Sản phẩm' />
                            {openProduct ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openProduct} timeout='auto' unmountOnExit>
                            <List component='div' disablePadding>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemText primary='Danh sách' />
                                </ListItemButton>
                                <Link to={admin.newProduct}>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary='Thêm mới' />
                                    </ListItemButton>
                                </Link>
                            </List>
                        </Collapse>
                    </List>
                </Box>
            </div>
        </div>
    )
}

export default Sidebar
