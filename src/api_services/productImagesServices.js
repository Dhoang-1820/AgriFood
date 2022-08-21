import * as request from '~/untils/request'

export const getProductImages = async () => {
    try {
        const res = await request.get('product-images')
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const getProductImagesByProductId = async (id) => {
    try {
        const res = await request.get(`product-images/productId/${id}`)
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const postProductImage = async (data) => {
    try {
        const res = await request.post('product-image', data)
        return res
    } catch (error) {
        return false
    }
}

export const putProductImage = async (data) => {
    try {
        const res = await request.put('product-image/edit', data)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const deleteProductImage = async (data) => {
    try {
        const res = await request.remove(`product-image/delete/${data}`)
        return res
    } catch (error) {
        return false
    }
}
