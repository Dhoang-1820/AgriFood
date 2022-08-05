import * as request from '~/untils/request'

export const getCategories = async () => {
    try {
        const res = await request.get('categories')
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const getCategoryById = async (id) => {
    try {
        const res = await request.get('category', {
            params: {
                id: id,
            },
        })
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const postCategory = async (data) => {
    try {
        const res = await request.post('category', data)
        return res
    } catch (error) {
        return false
    }
}

export const putCategory = async (data) => {
    try {
        const res = await request.put('category/edit', data)
        return res
    } catch (error) {
        return false
    }
}

export const deleteCategory = async (data) => {
    try {
        const res = await request.remove(`category/delete/${data}`)
        return res
    } catch (error) {
        return false
    }
}
