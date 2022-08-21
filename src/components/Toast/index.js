import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import MuiAlert from '@mui/material/Alert'
import { Fragment, forwardRef } from 'react'

export default function Toast({ success = false, fail = false, handleClose, textSuccess, textFailure }) {
    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
    })

    const action = (
        <Fragment>
            <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
                <CloseIcon fontSize='small' />
            </IconButton>
        </Fragment>
    )

    return (
        <div>
            <Snackbar
                open={success}
                autoHideDuration={1000}
                onClose={handleClose}
                message='Note archived'
                action={action}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity='success' sx={{ width: '100%', fontSize: '1.3rem' }}>
                    {textSuccess}
                </Alert>
            </Snackbar>
            <Snackbar
                open={fail}
                autoHideDuration={2000}
                onClose={handleClose}
                message='Note archived'
                action={action}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity='error' sx={{ width: '100%', fontSize: '1.3rem' }}>
                    {textFailure}
                </Alert>
            </Snackbar>
        </div>
    )
}
