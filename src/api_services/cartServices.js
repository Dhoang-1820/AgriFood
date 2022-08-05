import * as request from '~/untils/request'

export const getCarts = async () => {
    try {
        const res = await request.get('carts')
        return res.data
    } catch (err) {
        console.log(err)
    }
}
