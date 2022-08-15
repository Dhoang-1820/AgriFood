import * as request from '~/untils/request'

export const getProductDetails = async () => {
    try {
        const res = await request.get('product-details')
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const postProductDetail = async (data) => {
    try {
        const res = await request.post('product-detail', data)
        return res
    } catch (error) {
        return false
    }
}

export const putProductDetail = async (data) => {
    try {
        const res = await request.put('product-detail/edit', data)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const deleteProductDetail = async (data) => {
    try {
        const res = await request.remove(`product-detail/delete/${data}`)
        return res
    } catch (error) {
        return false
    }
}
