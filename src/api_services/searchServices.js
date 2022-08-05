import * as request from '~/untils/request'

export const search = async (p) => {
    try {
        const res = await request.get('products/search', {
            params: {
                p,
            },
        })
        return res.data
    } catch (err) {
        console.log(err)
    }
}
