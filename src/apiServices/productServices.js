import * as request from '~/untils/request'

export const getProductDetails = async (code) => {
    try {
        const res = await request.get('productDetails', {
            params: {
                code,
            },
        })
        return res.data
    } catch (err) {
        console.log(err)
    }
}
