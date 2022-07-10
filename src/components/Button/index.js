import styles from './Button.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

function Button({
    children,
    to,
    href,
    primary = false,
    disable = false,
    outLine = false,
    onClick,
    className,
    ...passProps
}) {
    let Comp = 'button'

    const props = {
        onClick,
        to,
        href,
        ...passProps,
    }

    if (to) {
        props.to = to
        Comp = Link
    } else if (href) {
        props.href = href
        Comp = 'a'
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        disable,
        outLine,
    })

    return (
        <Comp className={classes} {...props}>
            <div className={cx('title')}>{children}</div>
        </Comp>
    )
}

export default Button
