import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react/headless'

import { useState, useEffect, useRef } from 'react'

import classnames from 'classnames/bind'
import { SearchIcon } from '~/components/Icons'
import styles from './Search.module.scss'
import ResultItem from '../ResultItem'

const cx = classnames.bind(styles)

function Search() {
    const [searchResults, setSearchResults] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)

    const inputRef = useRef()

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResults([])
            return
        }
        setLoading(true)
        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`)
            .then((response) => response.json())
            .then((res) => {
                setSearchResults(res.data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [searchValue])

    const handleClear = () => {
        setSearchValue('')
        setSearchResults([])
        inputRef.current.focus()
    }

    const handleHideResult = () => {
        setShowResult(true)
    }

    return (
        <Tippy
            offset={[0, 2]}
            placement='bottom'
            interactive
            visible={showResult && searchResults.length > 0}
            onClickOutside={() => setShowResult(false)}
            render={(attrs) => (
                <div className={cx('wrapper-results')} tabIndex='-1' {...attrs}>
                    <h4>Sản phẩm gợi ý</h4>
                    <div className={cx('result-list')}>
                        {searchResults.map((result) => (
                            <ResultItem key={result.id} data={result} />
                        ))}
                    </div>
                </div>
            )}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder='Nhập tên sản phẩm, mã sản phẩm, từ khoá cần tìm...'
                    onChange={(e) => {
                        setSearchValue(e.target.value)
                    }}
                    onFocus={handleHideResult}
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
        </Tippy>
    )
}

export default Search
