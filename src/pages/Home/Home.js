import { useEffect, useState } from 'react'
import * as categoryServices from '~/api_services/categoryServices'

import Category from './Category'
import Slider from '~/layouts/DefaultLayout/Slider'

import classNames from 'classnames/bind'
import styles from './Home.module.scss'
const cx = classNames.bind(styles)

function Home() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fechAPI = async () => {
            const result = await categoryServices.getCategories()
            setCategories(result)
        }
        // fechAPI()
    }, [])
    return (
        <>
            <Slider />
            {/* {categories.map((category, index) => (
                <Category key={index} category={category} />
            ))} */}
            <Category />
        </>
    )
}

export default Home
