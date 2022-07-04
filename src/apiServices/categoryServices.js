import * as request from '~/untils/request'

export const getCategory = async () => {
    try {
        const res = await request.get('category')
        return res.data
    } catch (err) {
        console.log(err)
    }
}
