import { useEffect, useState } from 'react'
import * as categoryServices from '~/apiServices/categoryServices'

import Category from './Category'
import Slider from '~/components/Layout/DefaultLayout/Header/Slideder'

import classNames from 'classnames/bind'
import styles from './Home.module.scss'
const cx = classNames.bind(styles)

function Home() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fechAPI = async () => {
            const result = await categoryServices.getCategory()
            setCategories(result)
        }
        fechAPI()
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
