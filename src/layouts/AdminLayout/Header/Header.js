import { styled, alpha } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'

import images from '~/assets/images'
import classNames from 'classnames/bind'
import styles from './Header.module.scss'
const cx = classNames.bind(styles)

function Header() {
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }))

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }))

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            color: 'white',
            fontSize: '1.6rem',
            [theme.breakpoints.up('sm')]: {
                width: '350px',
                '&:focus': {
                    width: '400px',
                },
            },
        },
    }))

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <Toolbar
                    sx={{
                        '& .MuiTypography-root': {
                            color: 'white',
                            fontSize: '1.8rem',
                            fontWeight: '500',
                        },
                        '& .MuiSvgIcon-root': {
                            color: 'white',
                            fontSize: '2.2rem',
                        },
                    }}
                >
                    <div className={cx('menu-img')}>
                        <img src={images.logo} alt='logo' />
                    </div>
                    <Typography variant='h5' noWrap component='div' sx={{ flexGrow: 1 }}>
                        Hello, HoangHuy
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder='Nhập để tìm kiếm' inputProps={{ 'aria-label': 'search' }} />
                    </Search>
                </Toolbar>
            </header>
        </div>
    )
}

export default Header
