import * as request from '~/untils/request'

export const getProductCategories = async () => {
    try {
        const res = await request.get('products-categories')
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const getProductCategoryById = async (id) => {
    try {
        const res = await request.get('products-category', {
            params: {
                id: id,
            },
        })
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const postProductCategory = async (data) => {
    try {
        const res = await request.post('products-category', data)
        return res
    } catch (error) {
        return false
    }
}

export const putProductCategory = async (data) => {
    try {
        const res = await request.put('products-category/edit', data)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const deleteProductCategory = async (data) => {
    try {
        const res = await request.remove(`product-category/delete/${data}`)
        return res
    } catch (error) {
        return false
    }
}
