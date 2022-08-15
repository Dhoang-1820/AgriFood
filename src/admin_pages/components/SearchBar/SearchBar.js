import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SearchIcon } from '~/components/Icons'

import classnames from 'classnames/bind'
import styles from './SearchBar.module.scss'
const cx = classnames.bind(styles)

function SearchBar({ handleSearch, handleClear, searchValue, loading }) {
    return (
        //Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context.
        <div>
            <div className={cx('search')}>
                <input
                    value={searchValue}
                    placeholder='Nhập tên, từ khoá cần tìm...'
                    onChange={(e) => handleSearch(e.target.value)}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}

                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                <button className={cx('btn-search')}>
                    <SearchIcon className={cx('icon-search')} />
                </button>
            </div>
        </div>
    )
}

export default SearchBar
