import { useEffect, useState } from 'react'

import Category from './Category'
import Slider from '~/components/Layout/DefaultLayout/Header/Slideder'

import classNames from 'classnames/bind'
import styles from './Home.module.scss'
const cx = classNames.bind(styles)

function Home() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const categoryAPI = 'http://localhost:3000/category'
        fetch(categoryAPI)
            .then((response) => response.json())
            .then((categories) => {
                setCategories(categories)
            })
    }, [])
    return (
        <>
            <Slider />
            {categories.map((category, index) => (
                <Category key={index} category={category} />
            ))}
        </>
    )
}

export default Home
