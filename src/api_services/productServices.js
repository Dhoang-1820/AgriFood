import * as request from '~/untils/request'

export const getProducts = async () => {
    try {
        const res = await request.get('products')
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const postProduct = async (data) => {
    try {
        const res = await request.post('product', data)
        return res
    } catch (error) {
        return false
    }
}

export const putProduct = async (data) => {
    try {
        const res = await request.put('product/edit', data)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (data) => {
    try {
        const res = await request.remove(`product/delete/${data}`)
        console.log(res)
        return res
    } catch (error) {
        return false
    }
}
